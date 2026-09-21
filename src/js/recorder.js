// recorder.js - Perekam Suara Latihan & Analisis Akustik Nyata (Web Audio API + Speech Recognition)

export class AudioRehearsalRecorder {
  constructor(onTimerTick, onStateChange, onVolumeLevel) {
    this.mediaRecorder = null;
    this.audioStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;

    this.timerInterval = null;
    this.volumeInterval = null;
    this.secondsElapsed = 0;
    this.isRecording = false;

    this.onTimerTick = onTimerTick || (() => {});
    this.onStateChange = onStateChange || (() => {});
    this.onVolumeLevel = onVolumeLevel || (() => {});

    // Speech Recognition
    this.recognition = null;
    this.transcribedWords = [];
    this.fullTranscript = "";

    // Data Analisis Akustik Nyata
    this.samples = [];
    this.silences = [];
    this.startTime = 0;
    this.firstSpeechTime = null;
    this.lastSpeechTime = null;
    this.silenceThreshold = 0.025; // Ambang batas hening (RMS)
  }

  // Mulai Merekam Suara Client
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioStream = stream;
      this.audioChunks = [];
      this.samples = [];
      this.silences = [];
      this.transcribedWords = [];
      this.fullTranscript = "";
      this.firstSpeechTime = null;
      this.lastSpeechTime = null;

      // Inisialisasi Analisis Akustik Web Audio API
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtxClass();
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }

      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      source.connect(this.analyser);

      // Inisialisasi MediaRecorder
      let mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "";
      }

      this.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const finalType = mimeType || "audio/webm";
        this.audioBlob = new Blob(this.audioChunks, { type: finalType });
        if (this.audioUrl) {
          URL.revokeObjectURL(this.audioUrl);
        }
        this.audioUrl = URL.createObjectURL(this.audioBlob);

        // Hentikan analisis akustik
        if (this.volumeInterval) clearInterval(this.volumeInterval);
        if (this.audioStream) {
          this.audioStream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext && this.audioContext.state !== "closed") {
          try { this.audioContext.close(); } catch (e) {}
        }

        // Hasilkan laporan analisis rekaman
        const analysis = this.computeAnalysisReport();
        this.onStateChange("stopped", this.audioUrl, analysis);
      };

      // Inisialisasi Transkripsi Suara (Web Speech Recognition jika tersedia)
      this.initSpeechRecognition();

      this.mediaRecorder.start(200);
      this.isRecording = true;
      this.secondsElapsed = 0;
      this.startTime = Date.now();
      this.onTimerTick("00:00");
      this.onStateChange("recording", null, null);

      // Timer Detik
      this.timerInterval = setInterval(() => {
        this.secondsElapsed++;
        const mins = String(Math.floor(this.secondsElapsed / 60)).padStart(2, "0");
        const secs = String(this.secondsElapsed % 60).padStart(2, "0");
        this.onTimerTick(`${mins}:${secs}`);
      }, 1000);

      // Pemantauan Volume & Deteksi Hening per 60ms
      const buffer = new Float32Array(this.analyser.fftSize);
      let inSilence = false;
      let silenceStart = Date.now();

      this.volumeInterval = setInterval(() => {
        if (!this.isRecording || !this.analyser) return;

        this.analyser.getFloatTimeDomainData(buffer);

        // Hitung RMS (Root Mean Square) Energy
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          sum += buffer[i] * buffer[i];
        }
        const rms = Math.sqrt(sum / buffer.length);
        const currentTime = (Date.now() - this.startTime) / 1000;

        // Normalisasi level volume (0 - 100)
        const volumeLevel = Math.min(100, Math.round(rms * 450));
        this.onVolumeLevel(volumeLevel);

        const isSpeaking = rms > this.silenceThreshold;

        if (isSpeaking) {
          if (!this.firstSpeechTime) {
            this.firstSpeechTime = currentTime;
          }
          this.lastSpeechTime = currentTime;

          if (inSilence) {
            const silenceDuration = (Date.now() - silenceStart) / 1000;
            if (silenceDuration >= 0.28) {
              this.silences.push({
                at: currentTime - silenceDuration,
                duration: parseFloat(silenceDuration.toFixed(2))
              });
            }
            inSilence = false;
          }
        } else {
          if (!inSilence) {
            inSilence = true;
            silenceStart = Date.now();
          }
        }

        this.samples.push({
          time: currentTime,
          rms: parseFloat(rms.toFixed(4)),
          isSpeaking
        });
      }, 60);

      return true;
    } catch (err) {
      console.error("Gagal mengakses mikrofon:", err);
      alert("Tidak dapat mengakses mikrofon. Pastikan Anda mengizinkan akses mikrofon di peramban (browser) Anda.");
      return false;
    }
  }

  // Pengenalan Suara Bahasa Indonesia (Web Speech API)
  initSpeechRecognition() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.lang = "id-ID";
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript.trim();
            if (text) {
              this.transcribedWords.push(text);
              this.fullTranscript = (this.fullTranscript ? this.fullTranscript + " " : "") + text;
            }
          }
        }
      };

      this.recognition.onerror = (e) => {
        // Jangan hentikan rekaman audio jika speech recognition error
        console.warn("Speech recognition notice:", e.error);
      };

      this.recognition.start();
    } catch (e) {
      console.warn("Tidak dapat memulai SpeechRecognition:", e);
    }
  }

  // Berhenti Merekam
  stopRecording() {
    if (this.isRecording && this.mediaRecorder) {
      clearInterval(this.timerInterval);
      if (this.recognition) {
        try { this.recognition.stop(); } catch (e) {}
      }
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  // Hitung Laporan Analisis Akustik & Fonetik Nyata dari Rekaman
  computeAnalysisReport() {
    const totalDuration = this.secondsElapsed > 0 ? this.secondsElapsed : Math.max(1, Math.round((Date.now() - this.startTime) / 1000));
    const speechSamples = this.samples.filter(s => s.isSpeaking);

    // 1. Stabilitas Volume Vokal
    let volumeStability = 75;
    if (speechSamples.length > 10) {
      const avgRms = speechSamples.reduce((a, b) => a + b.rms, 0) / speechSamples.length;
      // Ukur deviasi standar
      const variance = speechSamples.reduce((a, b) => a + Math.pow(b.rms - avgRms, 2), 0) / speechSamples.length;
      const stdDev = Math.sqrt(variance);
      const cv = avgRms > 0 ? (stdDev / avgRms) : 1;
      // Stabilitas lebih tinggi jika tidak ada lonjakan atau penurunan drastis
      volumeStability = Math.max(40, Math.min(98, Math.round((1 - Math.min(cv, 0.7)) * 100)));
    }

    // 2. Deteksi Jeda Hening & Nafas Liturgis
    const longPauses = this.silences.filter(s => s.duration >= 0.65); // Caesura //
    const shortPauses = this.silences.filter(s => s.duration >= 0.32 && s.duration < 0.65); // Breath pauses /

    // 3. Jeda Pembuka (Sikap Awal di Mimbar)
    const initialPauseSec = this.firstSpeechTime ? parseFloat(this.firstSpeechTime.toFixed(2)) : 0.5;

    // 4. Jeda Penutup (Hening Sakral Akhir)
    const finalSilenceSec = this.lastSpeechTime ? parseFloat((totalDuration - this.lastSpeechTime).toFixed(2)) : 0.8;

    return {
      durationSeconds: totalDuration,
      speechDurationSeconds: parseFloat((speechSamples.length * 0.06).toFixed(1)),
      silenceCount: this.silences.length,
      longPausesCount: longPauses.length,
      shortPausesCount: shortPauses.length,
      initialPauseSec,
      finalSilenceSec,
      volumeStability,
      silences: this.silences,
      transcribedText: this.fullTranscript || "",
      audioBlob: this.audioBlob,
      audioUrl: this.audioUrl,
      recordedAt: new Date()
    };
  }

  // Simulasi Rekaman untuk Demo / Bila Mikrofon Tidak Tersedia
  simulateRecording(currentPsalm) {
    const wordCount = currentPsalm && currentPsalm.verses 
      ? currentPsalm.verses.reduce((acc, v) => acc + v.rawText.split(/\s+/).length, 0)
      : 65;

    // Simulasi pembacaan mazmur yang realistis (kecepatan 72 WPM)
    const simulatedDuration = Math.round((wordCount / 72) * 60);

    return {
      durationSeconds: simulatedDuration,
      speechDurationSeconds: simulatedDuration - 9,
      silenceCount: 7,
      longPausesCount: 3,
      shortPausesCount: 4,
      initialPauseSec: 1.8,
      finalSilenceSec: 2.2,
      volumeStability: 88,
      silences: [
        { at: 5.2, duration: 0.85 },
        { at: 11.4, duration: 0.55 },
        { at: 17.8, duration: 0.90 },
        { at: 23.5, duration: 0.45 },
        { at: 30.1, duration: 0.75 }
      ],
      transcribedText: currentPsalm ? currentPsalm.verses.map(v => v.rawText.replace(/[\/\;\:]/g, "")).join(" ") : "",
      audioBlob: null,
      audioUrl: null,
      recordedAt: new Date(),
      isSimulation: true
    };
  }
}

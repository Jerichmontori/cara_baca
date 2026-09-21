// audio.js - Web Audio API Synthesizer (Singing Bowl & Liturgical Chimes)

export class LiturgicalAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isAmbientPlaying = false;
    this.ambientGain = null;
    this.ambientOscillators = [];
  }

  // Inisialisasi AudioContext dengan interaksi pengguna
  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  // Bunyi Singing Bowl / Genta Meditasi Liturgis (Sintesis Harmonik Alami)
  playSingingBowl(baseFreq = 216, duration = 6.0) {
    this.initContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Master gain untuk suara mangkuk
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.4, now + 0.08); // attack cepat lembut
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // decay panjang bergaung
    masterGain.connect(ctx.destination);

    // Filter resonansi lembut
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.connect(masterGain);

    // Harmonik overtones khas Tibetan / Liturgical singing bowl
    const partials = [
      { ratio: 1.0, gainVal: 0.5 },
      { ratio: 2.76, gainVal: 0.25 },
      { ratio: 5.4, gainVal: 0.12 },
      { ratio: 8.9, gainVal: 0.05 }
    ];

    partials.forEach(p => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * p.ratio, now);

      // Subtle pitch vibrato (shimmering resonance)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(3.5, now);
      lfoGain.gain.setValueAtTime(1.2, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

      pGain.gain.setValueAtTime(p.gainVal, now);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(pGain);
      pGain.connect(filter);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  // Bunyi Bel Lembut (Soft Bell / Breath Transition Chime)
  playChime(freq = 528, duration = 2.0) {
    this.initContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Bunyi Klik Kayu Metronome (Breath & Reading Cadence)
  playWoodClick() {
    this.initContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Audio Demonstrasi Melodi Nada Liturgis Murni (Naik ↗, Turun ↘, Datar →)
  playPitchContour(type = "up", duration = 0.85) {
    this.initContext();
    const ctx = this.audioCtx;
    if (!ctx) return;
    const now = ctx.currentTime;

    // Dual-oscillator synthesizer: fundamental (sine) + octave overtone (triangle)
    // Menghasilkan warna suara genta flute / pipa organ gereja yang bening, sakral, dan terdengar jelas
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = "sine";
    osc2.type = "triangle";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.28, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const isUp = (type === "up" || type === "naik");
    const isDown = (type === "down" || type === "turun");

    if (isUp) {
      // ↗ NADA NAIK: Melodi mengangkat jelas dari nada dada A3 (220Hz) melambung ke F#4 (370Hz)
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(370, now + duration - 0.08);

      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(740, now + duration - 0.08);
    } else if (isDown) {
      // ↘ NADA TURUN: Melodi merendah mantap dan berat dari E4 (329.6Hz) turun tuntas ke F3 (174.6Hz)
      osc1.frequency.setValueAtTime(329.63, now);
      osc1.frequency.exponentialRampToValueAtTime(174.61, now + duration - 0.08);

      osc2.frequency.setValueAtTime(659.25, now);
      osc2.frequency.exponentialRampToValueAtTime(349.23, now + duration - 0.08);
    } else {
      // → NADA DATAR: Tenuto sakral khidmat stabil di C4 (261.63Hz)
      osc1.frequency.setValueAtTime(261.63, now);
      osc2.frequency.setValueAtTime(523.25, now);
    }

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Demonstrasi Suara Vokal Pembaca Nyata (Melodi Pemandu + Jeda Nafas + Vokal Berintonasi)
  speakLectorPhrase(text, pitchType = "naik", onStart = null, onEnd = null) {
    if (!('speechSynthesis' in window)) {
      this.playPitchContour(pitchType === "naik" ? "up" : (pitchType === "turun" ? "down" : "flat"));
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanPhrase = text.replace(/[\/\;]/g, "").trim();
    if (!cleanPhrase) return;

    if (onStart) onStart();

    // TAHAP 1: Bunyikan melodi nada pemandu (0.6s) agar telinga lektor menangkap frekuensi yang direferensikan
    this.playPitchContour(pitchType === "naik" ? "up" : (pitchType === "turun" ? "down" : "flat"), 0.65);

    // TAHAP 2: Berikan jeda hening sejenak (0.42s) sebelum suara lektor melafalkan kata-kata
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(cleanPhrase);
      utterance.lang = "id-ID";

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("id"));
      if (idVoice) utterance.voice = idVoice;

      const isHeavyWord = /busuk|jijik|bebal|bejat|menyeleweng|kejahatan/i.test(cleanPhrase);
      const isJoyfulWord = /bersorak|bersukacita|sorak|pujilah|haleluya/i.test(cleanPhrase);

      if (pitchType === "turun") {
        // Nada merendah, berat, dan sedikit ditekan (sesuai referensi Mazmur 14)
        utterance.pitch = isHeavyWord ? 0.68 : 0.74;
        utterance.rate = isHeavyWord ? 0.74 : 0.78;
      } else if (pitchType === "naik") {
        // Nada naik cerah, mengangkat, atau puji-pujian
        utterance.pitch = isJoyfulWord ? 1.35 : 1.28;
        utterance.rate = isJoyfulWord ? 0.90 : 0.85;
      } else {
        // Nada datar khidmat & pengantar formal
        utterance.pitch = 0.96;
        utterance.rate = 0.82;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    }, 450);
  }

  // Demonstrasi Membaca Satu Ayat Penuh dengan Harmonisasi Nada Pemandu & Jeda Nafas Nyata
  speakFullVerse(verseText, phrasingData = [], onStart = null, onEnd = null) {
    if (!('speechSynthesis' in window)) {
      alert("Peramban Anda tidak mendukung fitur sintesis vokal pembacaan.");
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    if (!phrasingData || phrasingData.length === 0) {
      const clean = verseText.replace(/<[^>]*>/g, "").replace(/[\/\;]/g, " ");
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = "id-ID";
      u.rate = 0.82;
      if (onStart) u.onstart = onStart;
      if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
      window.speechSynthesis.speak(u);
      return;
    }

    let phraseIndex = 0;
    let isCancelled = false;

    if (onStart) onStart();

    const playNextPhrase = () => {
      if (isCancelled || phraseIndex >= phrasingData.length) {
        if (onEnd) onEnd();
        return;
      }

      const p = phrasingData[phraseIndex];
      const cleanText = p.text.replace(/[\/\;]/g, "").trim();
      phraseIndex++;

      if (!cleanText) {
        playNextPhrase();
        return;
      }

      const isHeavy = /busuk|jijik|bebal|bejat|menyeleweng|kejahatan/i.test(cleanText);
      const isJoy = /bersorak|bersukacita|sorak|pujilah|haleluya/i.test(cleanText);

      // Mainkan nada pemandu harmonik lembut sebelum frasa
      this.playPitchContour(p.pitchType === "naik" ? "up" : (p.pitchType === "turun" ? "down" : "flat"), 0.42);

      setTimeout(() => {
        if (isCancelled) return;
        const u = new SpeechSynthesisUtterance(cleanText);
        u.lang = "id-ID";
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("id"));
        if (idVoice) u.voice = idVoice;

        if (p.pitchType === "turun") {
          u.pitch = isHeavy ? 0.68 : 0.74;
          u.rate = isHeavy ? 0.74 : 0.78;
        } else if (p.pitchType === "naik") {
          u.pitch = isJoy ? 1.35 : 1.28;
          u.rate = isJoy ? 0.90 : 0.85;
        } else {
          u.pitch = 0.96;
          u.rate = 0.82;
        }

        u.onend = () => {
          let pauseDuration = 380;
          if (p.delimiter && p.delimiter.includes("//")) pauseDuration = 750; // Jeda hening panjang (Caesura)
          else if (p.delimiter && (p.delimiter.includes("/") || p.delimiter.includes(","))) pauseDuration = 420; // Jeda pendek
          else if (cleanText.includes("Orang bebal")) pauseDuration = 550; // Jeda sebelum 'Tidak ada Allah'

          setTimeout(playNextPhrase, pauseDuration);
        };

        u.onerror = () => {
          if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(u);
      }, 260);
    };

    playNextPhrase();

    return () => {
      isCancelled = true;
      window.speechSynthesis.cancel();
    };
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Ambient Drone Hening Batin (Kontemplasi Berkelanjutan)
  toggleAmbientDrone(enable = null) {
    this.initContext();
    const targetState = enable !== null ? enable : !this.isAmbientPlaying;

    if (targetState) {
      if (this.isAmbientPlaying) return true;
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.12, now + 2.0);
      this.ambientGain.connect(ctx.destination);

      const dronePitches = [108, 162, 216]; // Chord damai A2 - E3 - A3
      this.ambientOscillators = dronePitches.map(pitch => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(pitch, now);
        osc.connect(this.ambientGain);
        osc.start(now);
        return osc;
      });

      this.isAmbientPlaying = true;
      return true;
    } else {
      if (!this.isAmbientPlaying) return false;
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      }
      setTimeout(() => {
        this.ambientOscillators.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
      }, 1600);

      return false;
    }
  }
}

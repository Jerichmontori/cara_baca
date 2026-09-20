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

  // Audio Demonstrasi Nada Naik (↗), Nada Turun (↘), dan Nada Datar (→)
  playPitchContour(type = "up", duration = 0.9) {
    this.initContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    if (type === "up" || type === "naik") {
      // Nada naik dari A3 (220Hz) ke F4 (349Hz)
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(349, now + duration - 0.1);
    } else if (type === "down" || type === "turun") {
      // Nada turun dari E4 (330Hz) ke G3 (196Hz) - kadens tuntas
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(196, now + duration - 0.1);
    } else {
      // Nada datar khidmat di C4 (261.6Hz)
      osc.frequency.setValueAtTime(261.63, now);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Demonstrasi Suara Vokal Pembaca Nyata (Web Speech Synthesis API + Pitch Modulator)
  speakLectorPhrase(text, pitchType = "naik", onStart = null, onEnd = null) {
    if (!('speechSynthesis' in window)) {
      // Fallback ke simulasi nada sintetis jika peramban tidak mendukung TTS
      this.playPitchContour(pitchType === "naik" ? "up" : (pitchType === "turun" ? "down" : "flat"));
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanPhrase = text.replace(/[\/\;]/g, "").trim();
    if (!cleanPhrase) return;

    // Mainkan frekuensi nada harmonik lembut sebagai pemandu telinga
    this.playPitchContour(pitchType === "naik" ? "up" : (pitchType === "turun" ? "down" : "flat"), 0.45);

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(cleanPhrase);
      utterance.lang = "id-ID";

      // Pilih suara bahasa Indonesia jika tersedia di sistem
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("id"));
      if (idVoice) utterance.voice = idVoice;

      // Pengaturan tempo khidmat liturgis (tidak terburu-buru)
      utterance.rate = 0.84;

      // Pengaturan kontur intonasi nada naik / turun / datar
      if (pitchType === "naik") {
        utterance.pitch = 1.25; // Nada mengangkat di awal kalimat atau sebelum jeda
      } else if (pitchType === "turun") {
        utterance.pitch = 0.85; // Kadens merendah mantap di akhir kalimat
      } else {
        utterance.pitch = 1.0;  // Datar khidmat
      }

      if (onStart) utterance.onstart = onStart;
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      window.speechSynthesis.speak(utterance);
    }, 180);
  }

  // Demonstrasi Membaca Satu Ayat Penuh dengan Seluruh Jeda Nafas & Kontur Nada
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
      u.rate = 0.84;
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

      const u = new SpeechSynthesisUtterance(cleanText);
      u.lang = "id-ID";
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("id"));
      if (idVoice) u.voice = idVoice;

      u.rate = 0.84;
      if (p.pitchType === "naik") u.pitch = 1.25;
      else if (p.pitchType === "turun") u.pitch = 0.85;
      else u.pitch = 1.0;

      u.onend = () => {
        let pauseDuration = 300;
        if (p.delimiter && p.delimiter.includes("//")) pauseDuration = 700; // Jeda hening panjang
        else if (p.delimiter && (p.delimiter.includes("/") || p.delimiter.includes(","))) pauseDuration = 400; // Jeda pendek

        setTimeout(playNextPhrase, pauseDuration);
      };

      u.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(u);
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

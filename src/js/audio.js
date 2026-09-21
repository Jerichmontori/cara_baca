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

  // Notasi Melodi Liturgis Bertangga (Tonus Psalmorum / Cantus Liturgis Murni)
  playLiturgicalNotes(notes = []) {
    this.initContext();
    const ctx = this.audioCtx;
    if (!ctx || !notes || notes.length === 0) return;
    const startTime = ctx.currentTime;
    let offset = 0;

    notes.forEach((note) => {
      const noteStart = startTime + offset;
      const noteDur = note.dur || 0.28;
      const targetFreq = note.freq || 261.63;
      const noteGainVal = note.gain || 0.26;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warna suara organ pipa liturgis / genta flute bening
      osc1.type = "sine";
      osc2.type = "triangle";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1500, noteStart);

      osc1.frequency.setValueAtTime(targetFreq, noteStart);
      osc2.frequency.setValueAtTime(targetFreq * 2, noteStart);

      // Amplop ADSR halus khas genta gereja
      gNode.gain.setValueAtTime(0.0001, noteStart);
      gNode.gain.linearRampToValueAtTime(noteGainVal, noteStart + 0.03);
      gNode.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDur);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gNode);
      gNode.connect(ctx.destination);

      osc1.start(noteStart);
      osc2.start(noteStart);
      osc1.stop(noteStart + noteDur);
      osc2.stop(noteStart + noteDur);

      offset += noteDur * 0.88; // Transisi legato bersambung
    });
  }

  // Audio Demonstrasi Melodi Nada Liturgis Murni Sesuai Karakter & Intonasi Referensi
  playPitchContour(type = "naik", duration = 0.85) {
    this.initContext();
    const cleanType = (type || "").toLowerCase().trim();

    // 1. NADA DATAR-FORMAL (Pengantar Judul / Tenuto Khidmat) -> Tenor Liturgis C4 (Do) Mantap
    if (cleanType.includes("datar") || cleanType.includes("flat") || cleanType.includes("formal")) {
      this.playLiturgicalNotes([
        { freq: 261.63, dur: 0.35, gain: 0.28 },
        { freq: 261.63, dur: 0.55, gain: 0.24 }
      ]);
    }
    // 2. NADA MERENDAH BERAT & TERTAHAN (Keprihatinan Moral / Teguran - Mazmur 14) -> Minor Dada F3 - D3 - C3 - A2
    else if (
      cleanType.includes("turun-berat") || 
      cleanType.includes("berat") || 
      cleanType.includes("prihatin") ||
      cleanType.includes("kemuakan")
    ) {
      this.playLiturgicalNotes([
        { freq: 174.61, dur: 0.28, gain: 0.30 }, // F3
        { freq: 146.83, dur: 0.28, gain: 0.28 }, // D3
        { freq: 130.81, dur: 0.30, gain: 0.26 }, // C3
        { freq: 110.00, dur: 0.45, gain: 0.24 }  // A2 (register dada rendah berwibawa)
      ]);
    }
    // 3. NADA DINGIN & HAMPA (Penyangkalan Rohani / 'Tidak ada Allah') -> Interval Hampa E3 - C3 - A2
    else if (cleanType.includes("turun-dingin") || cleanType.includes("dingin") || cleanType.includes("hampa")) {
      this.playLiturgicalNotes([
        { freq: 164.81, dur: 0.32, gain: 0.22 }, // E3
        { freq: 130.81, dur: 0.32, gain: 0.22 }, // C3
        { freq: 110.00, dur: 0.50, gain: 0.20 }  // A2
      ]);
    }
    // 4. NADA FINAL TUNTAS (Kadens Tegas di Akhir Kalimat / 'tidak ada yang berbuat baik') -> Kadens Tuntas D3 - C3 - G2
    else if (cleanType.includes("turun-tuntas") || cleanType.includes("tuntas") || cleanType.includes("final")) {
      this.playLiturgicalNotes([
        { freq: 174.61, dur: 0.26, gain: 0.28 }, // F3
        { freq: 146.83, dur: 0.28, gain: 0.28 }, // D3
        { freq: 130.81, dur: 0.30, gain: 0.26 }, // C3
        { freq: 98.00,  dur: 0.52, gain: 0.25 }  // G2 (fondasi tuntas mantap)
      ]);
    }
    // 5. NADA TURUN STANDAR (Kadens Menurun / Terminatio) -> Fa - Re - Do (F4 - D4 - C4)
    else if (cleanType.includes("turun") || cleanType.includes("down")) {
      this.playLiturgicalNotes([
        { freq: 349.23, dur: 0.26, gain: 0.28 }, // F4
        { freq: 293.66, dur: 0.26, gain: 0.26 }, // D4
        { freq: 261.63, dur: 0.42, gain: 0.25 }  // C4
      ]);
    }
    // 6. NADA SORAK-SORAI SUKACITA KEMENANGAN (Mazmur 14 Ayat 7 / Pujian) -> Arpeggio Do - Mi - Sol - Do5
    else if (cleanType.includes("naik-sorak") || cleanType.includes("sorak") || cleanType.includes("sukacita")) {
      this.playLiturgicalNotes([
        { freq: 261.63, dur: 0.20, gain: 0.25 }, // C4
        { freq: 329.63, dur: 0.20, gain: 0.26 }, // E4
        { freq: 392.00, dur: 0.22, gain: 0.28 }, // G4
        { freq: 523.25, dur: 0.45, gain: 0.30 }  // C5 (melambung cerah berkemenangan)
      ]);
    }
    // 7. NADA PERTANYAAN REFLEKTIF (Gugatan / Intonasi Naik Menggugat) -> C4 - D4 - F4 - G4
    else if (cleanType.includes("tanya") || cleanType.includes("gugat")) {
      this.playLiturgicalNotes([
        { freq: 261.63, dur: 0.22, gain: 0.26 }, // C4
        { freq: 293.66, dur: 0.22, gain: 0.26 }, // D4
        { freq: 349.23, dur: 0.24, gain: 0.28 }, // F4
        { freq: 392.00, dur: 0.42, gain: 0.30 }  // G4 (menggantung reflektif)
      ]);
    }
    // 8. NADA NAIK STANDAR (Antiseden Menggantung / Mengangkat Perhatian) -> Do - Re - Fa (C4 - D4 - F4)
    else {
      this.playLiturgicalNotes([
        { freq: 261.63, dur: 0.25, gain: 0.26 }, // C4
        { freq: 293.66, dur: 0.25, gain: 0.26 }, // D4
        { freq: 349.23, dur: 0.42, gain: 0.28 }  // F4
      ]);
    }
  }

  // Cari suara Bahasa Indonesia terbaik pada peramban
  getIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;

    // Prioritas 1: Kode bahasa persis id-ID
    const exactId = voices.find(v => v.lang === "id-ID" || v.lang === "id_ID");
    if (exactId) return exactId;

    // Prioritas 2: Awalan id
    const prefixId = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("id"));
    if (prefixId) return prefixId;

    // Prioritas 3: Nama mengandung kata kunci Indonesia / Gadis / Andika
    const nameId = voices.find(v => /indonesia|gadis|andika/i.test(v.name));
    if (nameId) return nameId;

    return null;
  }

  // Demonstrasi Suara Vokal Pembaca Nyata (Melodi Pemandu + Jeda Nafas + Vokal Berintonasi)
  speakLectorPhrase(text, pitchType = "naik", onStart = null, onEnd = null) {
    const cleanPhrase = (text || "").replace(/[\/\;]/g, "").trim();
    if (!cleanPhrase) {
      if (onEnd) onEnd();
      return;
    }

    if (!('speechSynthesis' in window)) {
      this.playPitchContour(pitchType);
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 1200);
      return;
    }

    window.speechSynthesis.cancel();
    if (onStart) onStart();

    // TAHAP 1: Bunyikan notasi tangga nada liturgis pemandu agar telinga lektor menangkap frekuensi akurat
    this.playPitchContour(pitchType);

    // TAHAP 2: Berikan jeda hening sejenak (0.50s) sebelum suara lektor melafalkan kata-kata
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(cleanPhrase);
      utterance.lang = "id-ID";

      const idVoice = this.getIndonesianVoice();
      if (idVoice) utterance.voice = idVoice;

      const cleanType = (pitchType || "").toLowerCase();
      const isHeavyWord = /busuk|jijik|bebal|bejat|menyeleweng|kejahatan/i.test(cleanPhrase);
      const isHollowWord = /tidak ada allah|tiada allah/i.test(cleanPhrase);
      const isConclusiveWord = /tidak ada yang berbuat baik|seorang pun tidak/i.test(cleanPhrase);
      const isJoyfulWord = /bersorak|bersukacita|sorak|pujilah|haleluya/i.test(cleanPhrase);
      const isFormalHeading = /untuk pemimpin|dari daud|mazmur/i.test(cleanPhrase);

      // Kalibrasi Modulasi Suara Vokal Berdasarkan Referensi Intonasi Liturgis
      if (cleanType.includes("turun-berat") || isHeavyWord) {
        // Nada merendah, berat, dan sedikit ditekan (keprihatinan moral mendalam)
        utterance.pitch = 0.70;
        utterance.rate = 0.74;
      } else if (cleanType.includes("turun-dingin") || isHollowWord) {
        // Nada dingin dan hampa (mencerminkan kekosongan rohani orang fasik)
        utterance.pitch = 0.68;
        utterance.rate = 0.70;
      } else if (cleanType.includes("turun-tuntas") || isConclusiveWord) {
        // Nada final merendah, berat, dan tegas (kadens penutup tuntas)
        utterance.pitch = 0.66;
        utterance.rate = 0.72;
      } else if (cleanType.includes("turun")) {
        // Nada merendah khusyuk standar
        utterance.pitch = 0.74;
        utterance.rate = 0.78;
      } else if (cleanType.includes("naik-sorak") || isJoyfulWord) {
        // Melodi melambung cerah, tempo mengalir anggun melepaskan sukacita
        utterance.pitch = 1.35;
        utterance.rate = 0.90;
      } else if (cleanType.includes("naik") || cleanType.includes("tanya")) {
        // Nada naik menggugah / mengangkat perhatian
        utterance.pitch = 1.26;
        utterance.rate = 0.85;
      } else if (cleanType.includes("datar") || isFormalHeading) {
        // Nada formal, wajar, tenang, tidak terburu-buru
        utterance.pitch = 0.96;
        utterance.rate = 0.82;
      } else {
        utterance.pitch = 1.0;
        utterance.rate = 0.82;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    }, 500);
  }

  // Demonstrasi Membaca Satu Ayat Penuh dengan Sinkronisasi Nada Pemandu & Jeda Nafas Nyata
  speakFullVerse(verseText, phrasingData = [], onStart = null, onEnd = null, onPhraseChange = null) {
    if (!('speechSynthesis' in window)) {
      alert("Peramban Anda tidak mendukung fitur sintesis vokal pembacaan.");
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    if (!phrasingData || phrasingData.length === 0) {
      const clean = (verseText || "").replace(/<[^>]*>/g, "").replace(/[\/\;]/g, " ");
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = "id-ID";
      u.rate = 0.80;
      const idVoice = this.getIndonesianVoice();
      if (idVoice) u.voice = idVoice;
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
      const currentIdx = phraseIndex;
      const cleanText = (p.text || "").replace(/[\/\;]/g, "").trim();
      phraseIndex++;

      if (!cleanText) {
        playNextPhrase();
        return;
      }

      // Notifikasi callback agar UI menyorot baris frasa yang aktif secara real-time
      if (onPhraseChange) onPhraseChange(currentIdx, p);

      // Mainkan nada liturgis pemandu lembut sebelum frasa
      this.playPitchContour(p.pitchType || "naik", 0.45);

      setTimeout(() => {
        if (isCancelled) return;
        const u = new SpeechSynthesisUtterance(cleanText);
        u.lang = "id-ID";
        const idVoice = this.getIndonesianVoice();
        if (idVoice) u.voice = idVoice;

        const cleanType = (p.pitchType || "").toLowerCase();
        const isHeavy = /busuk|jijik|bebal|bejat|menyeleweng|kejahatan/i.test(cleanText);
        const isHollow = /tidak ada allah|tiada allah/i.test(cleanText);
        const isConclusive = /tidak ada yang berbuat baik|seorang pun tidak/i.test(cleanText);
        const isJoy = /bersorak|bersukacita|sorak|pujilah|haleluya/i.test(cleanText);
        const isFormal = /untuk pemimpin|dari daud|mazmur/i.test(cleanText);

        if (cleanType.includes("turun-berat") || isHeavy) {
          u.pitch = 0.70;
          u.rate = 0.74;
        } else if (cleanType.includes("turun-dingin") || isHollow) {
          u.pitch = 0.68;
          u.rate = 0.70;
        } else if (cleanType.includes("turun-tuntas") || isConclusive) {
          u.pitch = 0.66;
          u.rate = 0.72;
        } else if (cleanType.includes("turun")) {
          u.pitch = 0.74;
          u.rate = 0.78;
        } else if (cleanType.includes("naik-sorak") || isJoy) {
          u.pitch = 1.35;
          u.rate = 0.90;
        } else if (cleanType.includes("naik") || cleanType.includes("tanya")) {
          u.pitch = 1.26;
          u.rate = 0.85;
        } else if (cleanType.includes("datar") || isFormal) {
          u.pitch = 0.96;
          u.rate = 0.82;
        } else {
          u.pitch = 1.0;
          u.rate = 0.82;
        }

        u.onend = () => {
          if (isCancelled) return;
          // Penentuan durasi jeda nafas liturgis yang presisi sesuai referensi
          let pauseDuration = 420;
          if (p.delimiter && p.delimiter.includes("//")) {
            // Jeda panjang (//) sebelum masuk ke inti teks firman (sesuai referensi Mazmur 14)
            pauseDuration = 850;
          } else if (cleanText.includes("Orang bebal berkata")) {
            // Berikan sedikit jeda sebelum mengucapkan kutipan berikutnya (sesuai referensi)
            pauseDuration = 650;
          } else if (cleanText.includes("Tidak ada Allah")) {
            // Jeda hening setelah penyangkalan
            pauseDuration = 700;
          } else if (p.delimiter && (p.delimiter.includes("/") || p.delimiter.includes(","))) {
            pauseDuration = 480;
          }

          setTimeout(playNextPhrase, pauseDuration);
        };

        u.onerror = () => {
          if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(u);
      }, 350);
    };

    playNextPhrase();

    return () => {
      isCancelled = true;
      window.speechSynthesis.cancel();
    };
  }

  // Demonstrasi Alur Melodi Tangga Nada Seluruh Ayat (Murni Liturgis Tanpa Vokal)
  playFullVerseMelody(phrasingData = [], onStart = null, onEnd = null, onPhraseChange = null) {
    if (!phrasingData || phrasingData.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    let phraseIndex = 0;
    let isCancelled = false;

    if (onStart) onStart();

    const playNext = () => {
      if (isCancelled || phraseIndex >= phrasingData.length) {
        if (onEnd) onEnd();
        return;
      }

      const p = phrasingData[phraseIndex];
      const currentIdx = phraseIndex;
      phraseIndex++;

      if (onPhraseChange) onPhraseChange(currentIdx, p);
      this.playPitchContour(p.pitchType || "naik");

      // Hitung jeda antar motif melodi
      let delayMs = 1100;
      if (p.delimiter && p.delimiter.includes("//")) delayMs = 1400;

      setTimeout(playNext, delayMs);
    };

    playNext();

    return () => {
      isCancelled = true;
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

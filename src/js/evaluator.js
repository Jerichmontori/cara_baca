// evaluator.js - Rubrik Evaluasi Mandiri, Diagnosis Kesalahan Membaca, dan Panduan Nilai Sempurna (VAIEPP)

export class VAIEPPEvaluator {
  constructor() {
    this.criteria = [
      {
        id: "vokal",
        label: "Vokal (Proyeksi & Resonansi)",
        icon: "🎙️",
        pillarName: "Vokal",
        desc: "Stabilitas nafas diafragma, keterbukaan rongga resonansi dada/kepala, dan konsistensi volume tanpa tercekik.",
        commonErrors: [
          "Nafas diambil dangkal dari dada atas (clavicular), menyebabkan suara tersengal dan habis sebelum kalimat selesai.",
          "Suara tercekat atau serak di tenggorokan (throat tension) karena pita suara dipaksa bekerja tanpa tumpuan diafragma.",
          "Volume vokal tidak stabil: terlalu berbisik di awal sehingga tidak terdengar jemaat, atau tiba-tiba memekik keras."
        ],
        perfectionGuide: {
          instruction: "Lakukan pernapasan diafragma dalam: kembangkan rongga perut bawah dan punggung bawah, bahu tetap rileks turun. Tempatkan suara pada resonansi 'topeng wajah' (masque) dan rongga dada bawah (chest voice).",
          practicalExercise: "Senam humming 'Hmmmm' selama 5 detik sebelum membaca, rasakan getaran hangat di tulang dada.",
          perfectionCriteria: "Suara bulat berwibawa, bervolume mantap dan stabil dari kata pertama hingga kata penutup, terdengar jelas hingga bangku belakang gereja tanpa perlu berteriak."
        }
      },
      {
        id: "artikulasi",
        label: "Artikulasi (Kejelasan Diksi & Suku Kata)",
        icon: "🗣️",
        pillarName: "Artikulasi",
        desc: "Ketajaman pengucapan suku kata, pembentukan vokal sakral bundar (A-I-U-E-O), dan kejelasan konsonan akhir (k, t, p, s, r).",
        commonErrors: [
          "Menelan suku kata akhir (misal: 'kekurangan' dibaca 'kekurangn', 'TUHANlah' dibaca 'TUHANa').",
          "Konsonan penutup (k, t, p, s) mati atau tidak berbunyi, membuat kata-kata penting kabur bagi pendengar.",
          "Bibir dan rahang terlalu rapat/kaku sehingga vokal sakral terdengar sengau atau mendengung tidak jelas."
        ],
        perfectionGuide: {
          instruction: "Buka rongga mulut secara vertikal selebar dua jari untuk vokal A dan O. Gigit setiap konsonan awal dan letupkan konsonan akhir dengan tajam dan bersih.",
          practicalExercise: "Lakukan 'lip trill' (brrrr-prrrr) dan lafalkan teks dengan melebih-lebihkan gerakan bibir/lidah secara lambat sebelum tampil.",
          perfectionCriteria: "Setiap suku kata terpenggal jernih, konsonan akhir meletup mantap, tidak ada kata sakral yang tertelan atau terburu-buru."
        }
      },
      {
        id: "intonasi",
        label: "Intonasi (Kontur Nada & Jeda Nafas)",
        icon: "🎵",
        pillarName: "Intonasi",
        desc: "Dinamika melodi bicara (nada naik ↗, turun ↘, datar →) dan kepatuhan pada jeda nafas (/) serta jeda hening sakral (//).",
        commonErrors: [
          "Membaca dengan nada datar monoton seperti membaca berita koran atau laporan kantor.",
          "Salah menaikkan nada di akhir ayat (seperti bertanya), padahal ayat deklaratif menuntut kadens turun tuntas.",
          "Mengabaikan tanda jeda nafas (/), membaca tergesa-gesa tanpa memberi waktu hening bagi umat untuk meresapi sabda."
        ],
        perfectionGuide: {
          instruction: "Terapkan kontur melodis: naikkan nada sedikit di awal klausa (↗ Nada Naik Antiseden), tahan nada datar pada sebutan nama kudus (→ Tenuto), dan turunkan nada secara mantap pada akhir kalimat (↘ Kadens Tuntas).",
          practicalExercise: "Gunakan tombol 'Dengar Nada' pada modul peta melodi untuk mendengarkan frekuensi naik/turun sebelum mencoba menirukannya.",
          perfectionCriteria: "Melodi bicara mengalun dinamis dan luwes, jeda nafas pendek (/) tepat di sendi kalimat, dan jeda hening (//) memberi ruang kekudusan yang khidmat."
        }
      },
      {
        id: "ekspresi",
        label: "Ekspresi (Raut Wajah & Tatapan Mata)",
        icon: "👁️",
        pillarName: "Ekspresi",
        desc: "Kesesuaian mikro-ekspresi wajah dengan suasana batin mazmur dan jalinan kontak mata hangat dengan jemaat.",
        commonErrors: [
          "Wajah kaku tanpa ekspresi bagai topeng, atau dahi terus berkerut tegang karena grogi.",
          "Mata terus terkunci ke naskah leksionari tanpa pernah menjalin kontak mata dengan jemaat.",
          "Ekspresi tidak selaras dengan teks: membaca mazmur ratapan dengan senyuman santai, atau membaca mazmur sukacita dengan muka muram."
        ],
        perfectionGuide: {
          instruction: "Biarkan otot dahi dan rahang rileks. Tatap barisan umat selama 1–2 detik di awal ayat, lalu pandang teks, dan angkat pandangan kembali ke jemaat pada akhir klausa penting.",
          practicalExercise: "Berlatihlah di depan cermin: selaraskan senyum teduh untuk tema kepercayaan, tatapan mendalam untuk tema ratapan, dan mata berbinar untuk pujian.",
          perfectionCriteria: "Raut wajah memancarkan jiwa teks secara otentik, tatapan mata hangat merengkuh umat, tanpa kesan sandiwara yang berlebihan."
        }
      },
      {
        id: "penghayatan",
        label: "Penghayatan (Koneksi Jiwa & Kedalaman Rasa)",
        icon: "🕊️",
        pillarName: "Penghayatan",
        desc: "Penghayatan batiniah yang mengalirkan firman dari lubuk sanubari terdalam, bukan sekadar pelafalan mekanis.",
        commonErrors: [
          "Membaca sebatas kemampuan bibir/otak, tanpa menginternalisasi pergulatan batin pemazmur di dalam dada.",
          "Kehilangan 'rasa' di tengah pembacaan akibat terlalu fokus pada teknis membaca.",
          "Kurang memiliki jeda batiniah sebelum mengucapkan kata-kata puncak (klimaks emosi)."
        ],
        perfectionGuide: {
          instruction: "Sebelum melangkah ke ambon, ambil waktu 30 detik untuk hening batin. Tempatkan diri Anda sebagai juru bicara jiwa-jiwa yang sedang berdoa di hadapan Sang Khalik.",
          practicalExercise: "Visualisasikan dalam batin Anda apa yang dikatakan teks: rasakan dinginnya lembah kekelaman atau hangatnya minyak urapan sebelum bersuara.",
          perfectionCriteria: "Setiap kata berbobot getaran rasa yang murni; umat dapat merasakan bahwa pembaca sendiri telah disentuh oleh firman yang dibawakannya."
        }
      },
      {
        id: "penampilan",
        label: "Penampilan (Postur & Wibawa Mimbar)",
        icon: "🏛️",
        pillarName: "Penampilan",
        desc: "Sikap tubuh tegak berwibawa di ambon, ketenangan fisik tanpa gerakan gelisah, dan tata krama liturgis sakral.",
        commonErrors: [
          "Berdiri tidak seimbang: bertumpu pada satu kaki sehingga tubuh miring ke samping.",
          "Tangan mencengkeram ambon dengan tegang atau bergerak-gerak gelisah membetulkan baju/kacamata.",
          "Terburu-buru: langsung berucap sebelum berdiri tegak, dan langsung melangkah pergi begitu kata terakhir selesai."
        ],
        perfectionGuide: {
          instruction: "Pijakkan kedua telapak kaki selebar bahu secara kokoh (grounded stance). Letakkan kedua tangan dengan tenang di atas bibir ambon/leksionari tanpa mencengkeram.",
          practicalExercise: "Latihlah keheningan '3 detik sakral': berdiri tegak 2 detik sebelum mulai membaca, dan hening 3 detik setelah kata terakhir sebelum membungkuk hormat.",
          perfectionCriteria: "Sikap tubuh anggun, tenang, berwibawa, memancarkan kesakralan mimbar sabda Tuhan."
        }
      }
    ];

    this.scores = {
      vokal: 4,
      artikulasi: 4,
      intonasi: 3,
      ekspresi: 4,
      penghayatan: 4,
      penampilan: 5
    };

    // Menyimpan data laporan rekaman nyata terakhir dari client
    this.lastRecordingReport = null;
    this.recordedFindings = {};
  }

  // Evaluasi Otomatis Berdasarkan Rekaman Suara Nyata Client
  evaluateFromRecording(analysisReport, currentPsalm) {
    if (!analysisReport || !currentPsalm) return;

    this.lastRecordingReport = analysisReport;

    const verses = currentPsalm.verses || [];
    const allPsalmText = verses.map(v => v.rawText).join(" ");
    const cleanPsalmWords = allPsalmText.replace(/[\/\;\:\.\,\?\!\'\"]/g, " ").toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const totalPsalmWords = cleanPsalmWords.length || 60;

    // 1. Hitung Tempo Membaca Nyata (WPM)
    const durationMinutes = Math.max(0.15, analysisReport.durationSeconds / 60);
    const wpm = Math.round(totalPsalmWords / durationMinutes);

    // 2. Analisis Transkripsi Kata & Artikulasi Nyata (Web Speech API)
    const spokenWords = (analysisReport.transcribedText || "")
      .toLowerCase()
      .replace(/[\.\,\?\!\'\"]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 0);

    let matchCount = 0;
    const keySacredWords = ["tuhan", "tuhanlah", "bebal", "menilik", "gemetar", "allah", "busuk", "jijik", "bejat", "keselamatan", "bersorak-sorak", "bersukacita", "kasihanilah", "gembalaku", "kekurangan", "perbuatan", "menyeleweng"];
    const matchedKeyWords = [];
    const missedKeyWords = [];

    cleanPsalmWords.forEach(pw => {
      if (spokenWords.includes(pw)) {
        matchCount++;
        if (keySacredWords.includes(pw) && !matchedKeyWords.includes(pw)) {
          matchedKeyWords.push(pw);
        }
      } else {
        if (keySacredWords.includes(pw) && !missedKeyWords.includes(pw)) {
          missedKeyWords.push(pw);
        }
      }
    });

    // Jika Speech Recognition tidak didukung/kosong, perkirakan dari durasi dan stabilitas
    let wordAccuracyPct = 85;
    if (spokenWords.length > 0) {
      wordAccuracyPct = Math.min(100, Math.round((matchCount / totalPsalmWords) * 100));
    } else {
      wordAccuracyPct = Math.min(95, Math.max(65, analysisReport.volumeStability));
    }

    // 3. Kalkulasi Skor Nyata 6 Pilar VAIEPP dari Rekaman

    // A. VOKAL (Berdasarkan stabilitas nafas & dinamika volume RMS)
    let vokalScore = 4;
    const stability = analysisReport.volumeStability || 75;
    if (stability >= 86) vokalScore = 5;
    else if (stability >= 76) vokalScore = 4;
    else if (stability >= 64) vokalScore = 3;
    else vokalScore = 2;

    // B. ARTIKULASI (Berdasarkan akurasi pelafalan kata TB2)
    let artikulasiScore = 4;
    if (wordAccuracyPct >= 90) artikulasiScore = 5;
    else if (wordAccuracyPct >= 80) artikulasiScore = 4;
    else if (wordAccuracyPct >= 68) artikulasiScore = 3;
    else artikulasiScore = 2;

    // C. INTONASI (Berdasarkan tempo WPM & keteraturan jeda nafas)
    let intonasiScore = 4;
    if (wpm >= 64 && wpm <= 86 && analysisReport.longPausesCount >= 2) {
      intonasiScore = 5; // Tempo liturgis sempurna & jeda hening sakral ditaati
    } else if (wpm >= 55 && wpm <= 96) {
      intonasiScore = 4;
    } else if (wpm > 105) {
      intonasiScore = 2; // Terlalu terburu-buru
    } else if (wpm < 50) {
      intonasiScore = 3; // Terlalu lambat
    } else {
      intonasiScore = 3;
    }

    // D. EKSPRESI (Berdasarkan variasi dinamika vokal)
    let ekspresiScore = 4;
    if (intonasiScore >= 4 && vokalScore >= 4 && analysisReport.silenceCount >= 4) {
      ekspresiScore = 5;
    } else if (intonasiScore <= 2) {
      ekspresiScore = 3;
    }

    // E. PENGHAYATAN (Berdasarkan kedalaman jeda kontemplatif pada klimaks)
    let penghayatanScore = 4;
    if (analysisReport.longPausesCount >= 2 && analysisReport.durationSeconds >= (totalPsalmWords / 90) * 60) {
      penghayatanScore = 5;
    } else if (wpm > 100) {
      penghayatanScore = 2; // Membaca cepat tanpa penghayatan rasa
    }

    // F. PENAMPILAN & WIBAWA MIMBAR (Berdasarkan hening awal 2 detik & hening akhir)
    let penampilanScore = 4;
    if (analysisReport.initialPauseSec >= 1.2 && analysisReport.finalSilenceSec >= 1.2) {
      penampilanScore = 5; // Mengambil sikap hening agung sebelum dan sesudah membaca
    } else if (analysisReport.initialPauseSec < 0.5) {
      penampilanScore = 3; // Langsung berucap tergesa-gesa tanpa jeda persiapan
    }

    // Simpan skor baru hasil rekaman
    this.scores = {
      vokal: vokalScore,
      artikulasi: artikulasiScore,
      intonasi: intonasiScore,
      ekspresi: ekspresiScore,
      penghayatan: penghayatanScore,
      penampilan: penampilanScore
    };

    // Simpan temuan spesifik rekaman
    this.recordedFindings = {
      wpm,
      wordAccuracyPct,
      stability,
      matchedKeyWords,
      missedKeyWords,
      durationSeconds: analysisReport.durationSeconds,
      silenceCount: analysisReport.silenceCount,
      longPausesCount: analysisReport.longPausesCount,
      shortPausesCount: analysisReport.shortPausesCount || 0,
      initialPauseSec: analysisReport.initialPauseSec,
      finalSilenceSec: analysisReport.finalSilenceSec,
      audioUrl: analysisReport.audioUrl,
      isSimulation: analysisReport.isSimulation || false,
      recordedAt: analysisReport.recordedAt || new Date()
    };

    return this.calculateTotal();
  }

  setScore(id, value) {
    if (this.scores[id] !== undefined) {
      this.scores[id] = Math.max(1, Math.min(5, parseInt(value, 10)));
    }
  }

  setAllScores(value = 5) {
    const val = Math.max(1, Math.min(5, parseInt(value, 10)));
    for (const key of Object.keys(this.scores)) {
      this.scores[key] = val;
    }
  }

  calculateTotal() {
    const totalScore = Object.values(this.scores).reduce((a, b) => a + b, 0);
    const maxScore = this.criteria.length * 5; // 30
    const percentage = Math.round((totalScore / maxScore) * 100);

    let rank = "";
    let badgeClass = "";
    let summaryText = "";

    if (percentage >= 95) {
      rank = "Pemazmur / Lektor Paripurna (Tingkat Sempurna 100%)";
      badgeClass = "badge-gold";
      summaryText = "Sempurna! Seluruh 6 pilar VAIEPP Anda berada pada level kematangan rohani dan teknis tertinggi. Pembacaan Anda sungguh menjadi sarana hadirat sabda hidup bagi jemaat.";
    } else if (percentage >= 80) {
      rank = "Lektor Berwibawa & Berjiwa";
      badgeClass = "badge-trust";
      summaryText = "Sangat baik! Fondasi vokal dan penghayatan Anda sudah sangat menyentuh. Lakukan pembenahan pada titik-teks kritis yang tertera di bawah untuk meraih nilai sempurna 100%.";
    } else if (percentage >= 60) {
      rank = "Lektor Terampil Berkembang";
      badgeClass = "badge-solemn";
      summaryText = "Cukup baik. Teknik dasar Anda sudah tampak, namun masih ada kelemahan teknis pada artikulasi diksi dan kontur intonasi yang perlu diasah agar tidak terdengar kaku.";
    } else {
      rank = "Langkah Awal Penempaan Diri";
      badgeClass = "badge-lament";
      summaryText = "Jangan berkecil hati. Manfaatkan resep pembenahan ayat demi ayat di bawah ini dan latih pernapasan serta penggalan kata beberapa kali lagi di Mode Mimbar.";
    }

    return {
      percentage,
      totalScore,
      maxScore,
      rank,
      badgeClass,
      summaryText,
      hasRecordedData: !!this.lastRecordingReport,
      recordedFindings: this.recordedFindings
    };
  }

  // Diagnosis Mendalam yang Menghubungkan Kesalahan dengan Data Rekaman & Teks Mazmur Aktif
  getDeepDiagnostics(currentPsalm) {
    if (!currentPsalm || !currentPsalm.verses) return [];

    const verses = currentPsalm.verses;
    const totalVerses = verses.length;
    const rf = this.recordedFindings;
    const hasRec = !!this.lastRecordingReport;

    return this.criteria.map(c => {
      const score = this.scores[c.id];
      const isPerfect = score === 5;

      // Temukan titik kritis spesifik pada mazmur yang sedang aktif
      let targetVerseNum = 1;
      let targetPhrase = "";
      let criticalReason = "";

      switch (c.id) {
        case "vokal":
          const longestVerse = verses.reduce((max, v) => (v.rawText.length > max.rawText.length ? v : max), verses[0]);
          targetVerseNum = longestVerse.number;
          targetPhrase = longestVerse.rawText.split(/[//,;.]/)[0].trim() || longestVerse.rawText.slice(0, 45);
          criticalReason = hasRec
            ? `Pada rekaman Anda (${rf.durationSeconds}s), stabilitas nafas tercatat ${rf.stability}%. Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), kalimat yang panjang berisiko membuat nafas diafragma habis di paruh kedua sehingga suara melemah.`
            : `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), kalimat yang panjang sering menyebabkan lektor kehabisan nafas di paruh kedua sehingga nada suara melemah atau tercekat.`;
          break;

        case "artikulasi":
          const artVerse = verses.find(v => /takkan|kekurangan|tahirkanlah|bersorak|memperhitungkan|sembelihan|bebal|menilik|gemetar/i.test(v.rawText)) || verses[0];
          targetVerseNum = artVerse.number;
          const matchWord = artVerse.rawText.match(/\b(TUHANlah|takkan|kekurangan|tahirkanlah|bersorak-sorailah|memperhitungkan|kurban|sembelihan|perisai|bebal|menilik|gemetar)\b/i);
          const wordStr = matchWord ? matchWord[0] : "kata-kata sakral";
          targetPhrase = `Kata '${wordStr}' pada Ayat ${targetVerseNum}`;
          criticalReason = hasRec
            ? `Akurasi diksi TB2 rekaman Anda: ${rf.wordAccuracyPct}%. ${rf.missedKeyWords && rf.missedKeyWords.length > 0 ? `Kata '${rf.missedKeyWords[0]}' terdengar tertelan.` : `Pada '${wordStr}', letupkan konsonan letup lebih tajam agar tembus ke bangku gereja belakang.`}`
            : `Pada Ayat ${targetVerseNum} khususnya kata '${wordStr}', pembaca sering menelan suku kata akhir atau merapatkan bibir terlalu cepat sehingga artikulasi tidak terdengar jelas di baris belakang.`;
          break;

        case "intonasi":
          const intVerse = verses.find(v => v.rawText.includes("//") || v.rawText.includes("?")) || verses[1] || verses[0];
          targetVerseNum = intVerse.number;
          targetPhrase = intVerse.rawText.split("//")[0].trim() || intVerse.rawText.slice(0, 45);
          criticalReason = hasRec
            ? `Tempo membaca rekaman Anda: ${rf.wpm} kata/menit dengan ${rf.silenceCount} jeda hening. ${rf.wpm > 95 ? 'Kurangi kecepatan agar tidak terkesan membaca berita koran.' : (rf.wpm < 55 ? 'Tingkatkan sedikit aliran nafas agar tidak tersendat.' : 'Pertahankan tempo khidmat ini.')}`
            : `Pada Ayat ${targetVerseNum} di sekitar jeda sakral, lektor sering menaikkan nada secara keliru (gaya bertanya) atau mengabaikan jeda nafas, sehingga alur melodi menjadi datar dan terburu-buru.`;
          break;

        case "ekspresi":
          const expVerse = verses.find(v => /kekelaman|musuh|kasihanilah|sukacita|fajar|sayap/i.test(v.rawText)) || verses[Math.floor(totalVerses / 2)] || verses[0];
          targetVerseNum = expVerse.number;
          targetPhrase = expVerse.rawText.slice(0, 50);
          criticalReason = hasRec
            ? `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), rekaman suara Anda menunjukkan peralihan rasa batin. Pastikan mikro-ekspresi wajah Anda selaras saat transisi dari nada teguran ke sukacita.`
            : `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), raut wajah sering kali tidak berubah (terlalu datar), padahal teks menuntut peralihan mikro-ekspresi dari kegentaran menuju keteduhan iman.`;
          break;

        case "penghayatan":
          const climaxVerse = totalVerses > 2 ? verses[totalVerses - 2] : verses[totalVerses - 1];
          targetVerseNum = climaxVerse.number;
          targetPhrase = climaxVerse.rawText.slice(0, 50);
          criticalReason = hasRec
            ? `Terdeteksi ${rf.longPausesCount} kali jeda hening panjang (//) dalam rekaman Anda. Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), pastikan keharuan sabda dihayati mendalam sebelum mengucapkannya.`
            : `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), pembaca sering terjebak melafalkan teks secara mekanis tanpa mengizinkan rasa syukur dan keharuan batin bergetar di dalam dada.`;
          break;

        case "penampilan":
        default:
          const firstVerse = verses[0];
          const lastVerse = verses[totalVerses - 1];
          targetVerseNum = firstVerse.number;
          targetPhrase = `Pembukaan Ayat 1 dan Penutupan Ayat ${lastVerse.number}`;
          criticalReason = hasRec
            ? `Ketenangan awal Anda sebelum bersuara tercatat ${rf.initialPauseSec} detik (${rf.initialPauseSec >= 1.5 ? 'sangat matang & agung' : 'perlu dilatih agar tidak langsung berucap sebelum tenang'}). Hening penutup tercatat ${rf.finalSilenceSec} detik.`
            : `Pada detik awal melangkah ke mimbar (Ayat 1) dan saat mengakhiri ayat terakhir (Ayat ${lastVerse.number}), pembaca sering langsung berucap tanpa jeda hening 2 detik, atau terburu-buru berbalik badan sebelum sabda meresap di hati umat.`;
          break;
      }

      return {
        id: c.id,
        label: c.label,
        icon: c.icon,
        pillarName: c.pillarName,
        score,
        isPerfect,
        commonErrors: c.commonErrors,
        targetVerseNum,
        targetPhrase,
        criticalReason,
        perfectionGuide: c.perfectionGuide
      };
    });
  }
}

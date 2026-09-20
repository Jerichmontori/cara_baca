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
      summaryText
    };
  }

  // Diagnosis Mendalam yang Menghubungkan Kesalahan dengan Teks Mazmur Aktif
  getDeepDiagnostics(currentPsalm) {
    if (!currentPsalm || !currentPsalm.verses) return [];

    const verses = currentPsalm.verses;
    const totalVerses = verses.length;

    return this.criteria.map(c => {
      const score = this.scores[c.id];
      const isPerfect = score === 5;

      // Temukan titik kritis spesifik pada mazmur yang sedang aktif
      let targetVerseNum = 1;
      let targetPhrase = "";
      let criticalReason = "";

      switch (c.id) {
        case "vokal":
          // Cari ayat terpanjang atau ayat dengan dinamika forte/piano ekstrem
          const longestVerse = verses.reduce((max, v) => (v.rawText.length > max.rawText.length ? v : max), verses[0]);
          targetVerseNum = longestVerse.number;
          targetPhrase = longestVerse.rawText.split(/[//,;.]/)[0].trim() || longestVerse.rawText.slice(0, 45);
          criticalReason = `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), kalimat yang panjang sering menyebabkan lektor kehabisan nafas di paruh kedua sehingga nada suara melemah atau tercekat.`;
          break;

        case "artikulasi":
          // Cari ayat dengan konsonan padat atau kata sakral penting
          const artVerse = verses.find(v => /takkan|kekurangan|tahirkanlah|bersorak|memperhitungkan|sembelihan/i.test(v.rawText)) || verses[0];
          targetVerseNum = artVerse.number;
          const matchWord = artVerse.rawText.match(/\b(TUHANlah|takkan|kekurangan|tahirkanlah|bersorak-sorailah|memperhitungkan|kurban|sembelihan|perisai)\b/i);
          const wordStr = matchWord ? matchWord[0] : "kata-kata penting";
          targetPhrase = `Kata '${wordStr}' pada Ayat ${targetVerseNum}`;
          criticalReason = `Pada Ayat ${targetVerseNum} khususnya kata '${wordStr}', pembaca sering menelan suku kata akhir atau merapatkan bibir terlalu cepat sehingga artikulasi tidak terdengar jelas di baris belakang.`;
          break;

        case "intonasi":
          // Cari ayat yang memiliki jeda hening // atau tanda tanya
          const intVerse = verses.find(v => v.rawText.includes("//") || v.rawText.includes("?")) || verses[1] || verses[0];
          targetVerseNum = intVerse.number;
          targetPhrase = intVerse.rawText.split("//")[0].trim() || intVerse.rawText.slice(0, 45);
          criticalReason = `Pada Ayat ${targetVerseNum} di sekitar jeda sakral, lektor sering menaikkan nada secara keliru (gaya bertanya) atau mengabaikan jeda nafas, sehingga alur melodi menjadi datar dan terburu-buru.`;
          break;

        case "ekspresi":
          // Cari ayat dengan pergolakan emosi (misal ada kata kekelaman, musuh, atau syukur)
          const expVerse = verses.find(v => /kekelaman|musuh|kasihanilah|sukacita|fajar|sayap/i.test(v.rawText)) || verses[Math.floor(totalVerses / 2)] || verses[0];
          targetVerseNum = expVerse.number;
          targetPhrase = expVerse.rawText.slice(0, 50);
          criticalReason = `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), raut wajah sering kali tidak berubah (terlalu datar), padahal teks menuntut peralihan mikro-ekspresi dari kegentaran menuju keteduhan iman.`;
          break;

        case "penghayatan":
          // Cari ayat klimaks mazmur (biasanya ayat kedua terakhir atau terakhir)
          const climaxVerse = totalVerses > 2 ? verses[totalVerses - 2] : verses[totalVerses - 1];
          targetVerseNum = climaxVerse.number;
          targetPhrase = climaxVerse.rawText.slice(0, 50);
          criticalReason = `Pada Ayat ${targetVerseNum} ("${targetPhrase}..."), pembaca sering terjebak melafalkan teks secara mekanis tanpa mengizinkan rasa syukur dan keharuan batin bergetar di dalam dada.`;
          break;

        case "penampilan":
        default:
          // Pembukaan ayat 1 dan penutup ayat terakhir
          const firstVerse = verses[0];
          const lastVerse = verses[totalVerses - 1];
          targetVerseNum = firstVerse.number;
          targetPhrase = `Pembukaan Ayat 1 dan Penutupan Ayat ${lastVerse.number}`;
          criticalReason = `Pada detik awal melangkah ke mimbar (Ayat 1) dan saat mengakhiri ayat terakhir (Ayat ${lastVerse.number}), pembaca sering langsung berucap tanpa jeda hening 2 detik, atau terburu-buru berbalik badan sebelum sabda meresap di hati umat.`;
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

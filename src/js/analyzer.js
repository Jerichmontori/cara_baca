// analyzer.js - Mesin Analisis Semantik & Psikologi Teks Mazmur Bahasa Indonesia
import { analyzePhrasingAndPitch, syllabifyWord } from "./phrasing.js";

export class PsalmAnalyzer {
  constructor() {
    // Kamus kata kunci tematis & psikologis
    this.lexicon = {
      lament: [
        "jurang", "meratap", "menangis", "air mata", "maut", "celaka", "musuh", 
        "tertindas", "sakit", "kelam", "gelap", "takut", "gemetar", "tolong", 
        "lepaskan", "sesak", "kehancuran", "binasa", "berkabung", "tertekan",
        "mengapa", "berapa lama", "putus asa", "patah"
      ],
      repentance: [
        "dosa", "salah", "pelanggaran", "kasihanilah", "tahirkanlah", "bersihkanlah", 
        "ampun", "remuk", "hancur", "najis", "tahir", "hapuskanlah", "belas kasihan",
        "bertobat", "noda"
      ],
      praise: [
        "bersorak", "puji", "pujilah", "nyanyian", "megah", "mulia", "haleluya", 
        "sukacita", "sorak-sorai", "agung", "raja", "kebesaran", "kemuliaan",
        "berkemenangan", "gembira", "bersukaria", "dahsyat", "tinggikanlah"
      ],
      trust: [
        "gembala", "benteng", "kubu", "pertahanan", "naungan", "sayap", "perisai",
        "batu karang", "tidak takut", "tenang", "damai", "percaya", "berlindung",
        "menudungi", "menjaga", "terpelihara", "teguh", "aman", "tongkat"
      ],
      longing: [
        "haus", "rindu", "merindukan", "jiwaku", "fajar", "pagi", "air hidup",
        "mencari", "mendambakan", "bilakah", "berharap", "menanti", "menanti-nantikan"
      ],
      thanksgiving: [
        "kebajikan", "kemurahan", "bersyukur", "baik", "kasih setia", "berkat",
        "melimpah", "kebaikan", "hidangan", "minyak", "piala", "turun-temurun",
        "selama-lamanya"
      ]
    };
  }

  // Helper konversi angka Romawi (I, II, III, IV, V, dst)
  romanToInt(roman) {
    if (!roman) return 0;
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let num = 0;
    const str = roman.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      const curr = map[str[i]] || 0;
      const next = map[str[i + 1]] || 0;
      if (curr < next) {
        num += (next - curr);
        i++;
      } else {
        num += curr;
      }
    }
    return num > 0 ? num : 1;
  }

  // Parsing teks mentah dari input pengguna menjadi struktur ayat-ayat secara akurat & utuh
  parseRawText(rawText, customTitle = "") {
    if (!rawText || !rawText.trim()) {
      throw new Error("Teks mazmur tidak boleh kosong.");
    }

    const rawLines = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    let title = customTitle.trim();
    let refren = "";
    let contentStartIndex = 0;

    // 1. Scan baris-baris awal untuk Judul dan Refren
    for (let i = 0; i < rawLines.length; i++) {
      const l = rawLines[i].trim();
      if (!l) {
        if (contentStartIndex === i) contentStartIndex++;
        continue;
      }

      // Cek apakah baris ini adalah Judul Mazmur di awal
      const isTitleHeader = /^(?:mazmur\s+tanggapan|bacaan\s+mazmur|mazmur|psalm|mzm\.?)\b.*$/i.test(l);
      if (isTitleHeader && i < 3 && l.length < 80) {
        if (!title) {
          title = l;
        }
        contentStartIndex = i + 1;
        continue;
      }

      // Cek apakah baris ini Refren / Ulangan / Antifon
      const refMatch = l.match(/^(?:refren|ulangan|antifon|refrain)\s*(?:\([^\)]*\))?\s*[:\-]?\s*(.*)$/i);
      if (refMatch) {
        if (refMatch[1] && refMatch[1].trim()) {
          refren = refMatch[1].trim();
        } else if (i + 1 < rawLines.length) {
          refren = rawLines[i + 1].trim();
          i++;
        }
        contentStartIndex = i + 1;
        continue;
      }

      // Cek apakah baris ini header struktural seperti "Bait:", "Mazmur:", "Solois:"
      if (/^(?:mazmur|bait|ayat-ayat|bacaan|solois|umat|lektor)\s*[:\-]?$/i.test(l)) {
        contentStartIndex = i + 1;
        continue;
      }

      // Jika sudah menemukan baris ayat / teks biasa, hentikan pencarian header
      break;
    }

    const contentLines = rawLines.slice(contentStartIndex);

    // Helper untuk membersihkan baris dari refren yang diulang di tengah teks leksionari
    const isRepeatedRefren = (l) => {
      const trimmed = l.trim();
      if (/^(?:refren|ulangan|antifon|refrain)\s*(?:\([^\)]*\))?\s*[:\-]?/i.test(trimmed)) return true;
      if (refren && trimmed.toLowerCase() === refren.toLowerCase()) return true;
      return false;
    };

    // Helper untuk mendeteksi header penanda struktural non-ayat
    const isStructuralHeader = (l) => {
      const trimmed = l.trim();
      return /^(?:mazmur|bait|ayat-ayat|bacaan|solois|umat|lektor)\s*[:\-]?$/i.test(trimmed);
    };

    // Cek apakah teks memiliki nomor ayat eksplisit (1., Ayat 1:, Bait 1:, [1], dll)
    const hasExplicitVerseMarkers = contentLines.some(l => {
      const trimmed = l.trim();
      return /^(?:(?:ayat|bait|stanza)\s*(\d+|[ivxlcdm]+)[:\.]?|(\d+)[\.\:\)\/\]\-]\s+|\[\d+\]|\(\d+\))/i.test(trimmed);
    });

    let verseItems = [];

    if (hasExplicitVerseMarkers) {
      let currentVerseNum = 1;
      let currentVerseLines = [];

      for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];
        const trimmed = line.trim();

        if (!trimmed) {
          continue;
        }

        if (isRepeatedRefren(trimmed) || isStructuralHeader(trimmed)) {
          continue;
        }

        const markerMatch = trimmed.match(/^(?:(?:ayat|bait|stanza)\s*(\d+|[ivxlcdm]+)[:\.]?\s*(.*)|(\d+)[\.\:\)\/\]\-]\s+(.*)|\[(\d+)\]\s*(.*)|\((\d+)\)\s*(.*)|(\d+)$)/i);

        if (markerMatch) {
          if (currentVerseLines.length > 0) {
            verseItems.push({
              number: currentVerseNum,
              text: currentVerseLines.join("\n").trim()
            });
            currentVerseLines = [];
          }

          let numStr = markerMatch[1] || markerMatch[3] || markerMatch[5] || markerMatch[7] || markerMatch[9] || "1";
          let parsedNum = parseInt(numStr, 10);
          if (isNaN(parsedNum)) {
            parsedNum = this.romanToInt(numStr) || (verseItems.length + 1);
          }
          currentVerseNum = parsedNum;

          const inlineText = markerMatch[2] || markerMatch[4] || markerMatch[6] || markerMatch[8] || "";
          if (inlineText.trim()) {
            currentVerseLines.push(inlineText.trim());
          }
        } else {
          // Pertahankan baris baru puisi di dalam ayat secara utuh
          currentVerseLines.push(trimmed);
        }
      }

      if (currentVerseLines.length > 0) {
        verseItems.push({
          number: currentVerseNum,
          text: currentVerseLines.join("\n").trim()
        });
      }
    } else {
      // Tidak ada nomor ayat eksplisit: bagi berdasarkan baris kosong (strophe/bait)
      let currentBlockLines = [];
      let verseIndex = 1;

      for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];
        const trimmed = line.trim();

        if (isRepeatedRefren(trimmed) || isStructuralHeader(trimmed)) {
          continue;
        }

        if (!trimmed) {
          if (currentBlockLines.length > 0) {
            verseItems.push({
              number: verseIndex++,
              text: currentBlockLines.join("\n").trim()
            });
            currentBlockLines = [];
          }
        } else {
          currentBlockLines.push(trimmed);
        }
      }

      if (currentBlockLines.length > 0) {
        verseItems.push({
          number: verseIndex++,
          text: currentBlockLines.join("\n").trim()
        });
      }
    }

    if (verseItems.length === 0) {
      const cleanLines = contentLines.map(l => l.trim()).filter(l => l.length > 0);
      if (cleanLines.length > 0) {
        verseItems.push({
          number: 1,
          text: cleanLines.join("\n")
        });
      }
    }

    return {
      title: title || "Bacaan Mazmur",
      refren: refren || "",
      verses: verseItems
    };
  }

  // Hitung skor kategori emosi teks
  scoreTextCategories(text) {
    const lower = text.toLowerCase();
    const scores = {
      lament: 0,
      repentance: 0,
      praise: 0,
      trust: 0,
      longing: 0,
      thanksgiving: 0
    };

    for (const [cat, words] of Object.entries(this.lexicon)) {
      for (const w of words) {
        // regex match word boundary
        const regex = new RegExp(`\\b${w}`, "gi");
        const matches = lower.match(regex);
        if (matches) {
          scores[cat] += matches.length;
        }
      }
    }

    return scores;
  }

  // Tentukan kategori dominan
  getDominantCategory(scores) {
    let maxCat = "trust";
    let maxScore = -1;

    for (const [cat, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxCat = cat;
      }
    }

    return maxScore > 0 ? maxCat : "trust";
  }

  // Hasilkan anotasi visual (jeda nafas & penekanan kata) tanpa merusak spasi tanda baca asli
  generateAnnotatedHtml(verseText) {
    if (!verseText) return "";

    let textWithCues = verseText;

    // Jika belum ada tanda jeda '/' atau '//', bantu tempatkan jeda liturgis cerdas
    const hasUserPauses = textWithCues.includes("/") || textWithCues.includes("//");

    if (!hasUserPauses) {
      // Sisipkan jeda nafas liturgis TANPA merusak spasi tanda baca asli
      textWithCues = textWithCues
        .replace(/([;:])(\s+)/g, '$1 // $2')
        .replace(/([,])(\s+)/g, '$1 / $2');
    }

    // Gunakan token non-tumpang tindih untuk mencegah bug nested tags
    const LONG_PAUSE_TOKEN = "___LONG_PAUSE___";
    const SHORT_PAUSE_TOKEN = "___SHORT_PAUSE___";

    let safeText = textWithCues
      .replace(/\/\//g, LONG_PAUSE_TOKEN)
      .replace(/(?<![a-zA-Z0-9])\/(?![a-zA-Z0-9])/g, SHORT_PAUSE_TOKEN);

    // Aksentuasi kata sakral TB2
    const highlightWords = [
      "tuhanlah", "tuhan", "allah", "kasih", "setia", "jiwaku", "gembala", "gembalaku", 
      "rahmat", "benteng", "damai", "sukacita", "puji", "pujilah", "sorak", "kebenaran",
      "kekelaman", "fajar", "pengampunan", "selamat", "selama-lamanya", "kudus", 
      "kurban", "tahir", "demi", "penolongku", "bebal", "menilik", "gemetar"
    ];

    for (const word of highlightWords) {
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      safeText = safeText.replace(regex, '<span class="stress-word">$1</span>');
    }

    // Gantikan token jeda dengan HTML bersih
    safeText = safeText
      .replace(new RegExp(LONG_PAUSE_TOKEN, "g"), '<span class="breath-long" title="Jeda hening panjang (Caesura)">//</span>')
      .replace(new RegExp(SHORT_PAUSE_TOKEN, "g"), '<span class="breath-short" title="Jeda nafas pendek">/</span>');

    // Konversi baris baru menjadi <br> agar bait puisi tetap rapi sesuai input asli
    safeText = safeText.replace(/\n/g, '<br>\n');

    return safeText;
  }

  // Analisis keseluruhan (Macro Analysis)
  analyzePsalm(rawText, customTitle = "") {
    const parsed = this.parseRawText(rawText, customTitle);
    const fullText = parsed.verses.map(v => v.text).join(" ");
    const globalScores = this.scoreTextCategories(fullText);
    const dominantCategory = this.getDominantCategory(globalScores);

    // Profil Makro berdasarkan kategori dominan
    const macroProfiles = {
      lament: {
        genre: "Mazmur Ratapan & Permohonan Pertolongan (Lament & Cry for Help)",
        psikologiGlobal: "Keadaan jiwa yang sedang bergumul hebat di tengah himpitan derita, musuh, atau bayang-bayang keputusasaan. Jeritan batin yang jujur di hadapan Tuhan, yang mencari sauh pengharapan di tengah gelombang kehidupan.",
        suasanaBatin: "Sesak, sunyi, tertekan, namun memegang erat tali iman bahwa Tuhan tidak akan membiarkan orang benar jatuh tergeletak.",
        nadaBatinPembaca: "Bernada rendah (deep chest resonance), berbisik pilu namun bertenaga, tidak mendayu-dayu cengeng melainkan berseru dengan martabat doa yang tulus.",
        emotionalArc: "Dari keluhan yang menekan di dada -> seruan permohonan yang menggetarkan -> keyakinan bahwa doa didengar oleh Yang Mahatinggi.",
        fokusUtamaVAIEPP: "Pengendalian nafas diafragma agar tidak terengah-engah, pemberian jeda hening panjang (caesura) sebelum memohon, dan tatapan mata yang mendalam.",
        contemplation: "Heningkan batin Anda. Rasakan getaran setiap manusia yang sedang menderita, sakit, atau berbeban berat. Anda hadir di mimbar mewakili mereka semua yang kehabisan kata-kata untuk berseru kepada Tuhan."
      },
      repentance: {
        genre: "Mazmur Pertobatan & Remuk Hati (Penitential & Contrition)",
        psikologiGlobal: "Kesadaran mendalam akan kerapuhan dan noda dosa di hadapan kekudusan Allah yang tak terhampiri. Kehancuran ego manusiawi yang mencari pengampunan dan pembaharuan batin sejati.",
        suasanaBatin: "Remuk redam, penuh penyesalan murni, kerendahan hati yang total, rindu akan basuhan anugerah ilahi.",
        nadaBatinPembaca: "Lirih, khusyuk, rendah hati, tidak menghakimi siapa pun, menempatkan diri sebagai pendosa yang paling membutuhkan belas kasih.",
        emotionalArc: "Dari pengakuan dosa yang pedih -> permohonan hati yang tahir -> kelegaan anugerah pengampunan Tuhan.",
        fokusUtamaVAIEPP: "Artikulasi vokal yang bersih tanpa kepura-puraan, tempo adagio (lambat dan khidmat), serta postur tubuh yang tunduk takzim.",
        contemplation: "Tanggalkan seluruh kebanggaan diri Anda. Bayangkan Anda bersujud di hadapan salib Kristus dengan tangan hampa, memohon setetes embun kasih setia-Nya menyucikan hati Anda."
      },
      praise: {
        genre: "Himne Pujian & Sukacita Agung (Praise & Thanksgiving)",
        psikologiGlobal: "Ledakan sukacita dan kekaguman tanpa batas atas keagungan karya penciptaan, keadilan, dan kemuliaan Tuhan semesta alam.",
        suasanaBatin: "Terang benderang, gempita, bersemangat, meluap-luap oleh rasa syukur dan sukacita yang menular.",
        nadaBatinPembaca: "Terbuka, berwibawa, cerah, bervolume mantap (forte), artikulasi energik yang membangkitkan iman seluruh umat.",
        emotionalArc: "Seruan pembuka yang memanggil umat -> pemaparan perbuatan-perbuatan besar Allah -> penegasan kemuliaan-Nya yang kekal.",
        fokusUtamaVAIEPP: "Proyeksi vokal diafragma yang kokoh, senyum hangat yang tulus di bibir dan mata, serta intonasi yang menanjak dinamis.",
        contemplation: "Tersenyumlah dari kedalaman jiwa. Rasakan limpahan anugerah hidup, nafas, dan pemeliharaan Tuhan. Anda adalah bentara yang membawa kabar sukacita kemenangan bagi umat-Nya!"
      },
      trust: {
        genre: "Mazmur Kepercayaan & Perlindungan Ilahi (Trust & Security)",
        psikologiGlobal: "Ketenangan batin yang telah berakar kuat dalam naungan Tuhan. Tidak ada kecemasan atau kepanikan, karena menyadari Sang Pencipta adalah perisai dan kubu pertahanan yang tak terkalahkan.",
        suasanaBatin: "Kedamaian air yang tenang, keteguhan gunung batu karang, rasa aman dalam dekapan kasih ilahi.",
        nadaBatinPembaca: "Hangat, teduh, mantap, bersuara bulat (round tone), menentramkan jiwa yang mendengarkan.",
        emotionalArc: "Deklarasi perlindungan yang kokoh -> pemaparan janji kesetiaan Tuhan -> kepastian damai sejahtera sepanjang masa.",
        fokusUtamaVAIEPP: "Intonasi mengalun tenang (legato), artikulasi yang mantap pada kata-kata perlindungan, dan tatapan mata yang memancarkan keteduhan iman.",
        contemplation: "Rasakan bumi dan kaki Anda berpijak kokoh. Sadarilah Anda berada di bawah naungan kepak sayap Yang Mahatinggi. Jadilah pembawa rasa damai bagi jemaat yang sedang gelisah."
      },
      longing: {
        genre: "Mazmur Kerinduan Spiritual & Kehausan Jiwa (Spiritual Longing)",
        psikologiGlobal: "Dahaga mistik jiwa manusia yang merindukan perjumpaan intim dengan Allah yang hidup di tengah padang gurun duniawi.",
        suasanaBatin: "Rindu yang membakar, syahdu, penuh pengharapan akan fajar hadirat Allah.",
        nadaBatinPembaca: "Lembut, intim, melayang dari sanubari, sarat rasa rindu yang kudus.",
        emotionalArc: "Dari jeritan dahaga jiwa -> dialog menenangkan batin sendiri -> kepastian akan memuji Allah kembali.",
        fokusUtamaVAIEPP: "Desah nafas terkontrol (aspirated soft tone), tempo mengalun lambat, tatapan mata yang menatap hadirat altar dengan penuh kerinduan.",
        contemplation: "Bayangkan rusa yang letih mencari sumber air di gurun. Sadari bahwa hanya Allah yang sanggup memuaskan dahaga batin terdalam Anda. Bacalah dengan seluruh kerinduan kalbu."
      },
      thanksgiving: {
        genre: "Mazmur Syukur atas Kebaikan Tuhan (Thanksgiving & Testimony)",
        psikologiGlobal: "Kesaksian hidup yang penuh ucapan syukur atas pertolongan konkret Tuhan yang telah melepaskan jiwa dari marabahaya.",
        suasanaBatin: "Lega, penuh syukur, hangat, berseri-seri penuh kepuasan spiritual.",
        nadaBatinPembaca: "Bersaksi dengan ketulusan hati yang gembira, ramah, meyakinkan.",
        emotionalArc: "Mengingat pertolongan masa lalu -> ucapan syukur masa kini -> pujian komunal bersama jemaat.",
        fokusUtamaVAIEPP: "Artikulasi yang ramah dan bersahabat, penekanan kata pada berkat dan kasih setia, serta kontak mata yang hangat ke umat.",
        contemplation: "Hitunglah satu per satu kebaikan Tuhan dalam hidup Anda hari ini. Biarkan rasa syukur itu memenuhi rongga dada Anda sebelum Anda membuka mulut di mimbar."
      }
    };

    const macro = macroProfiles[dominantCategory] || macroProfiles.trust;

    // Analisis Ayat demi Ayat
    const analyzedVerses = parsed.verses.map((v, idx) => {
      const verseScores = this.scoreTextCategories(v.text);
      const verseCat = this.getDominantCategory(verseScores);
      return this.analyzeSingleVerse(v.number, v.text, verseCat, idx, parsed.verses.length);
    });

    return {
      id: "custom-" + Date.now(),
      title: parsed.title,
      version: "TB2",
      subtitle: parsed.refren ? `Refren: ${parsed.refren}` : "Panduan Penghayatan & Latihan Lektor (TB2)",
      refren: parsed.refren || "TUHANlah perlindunganku dan keselamatanku.",
      genre: macro.genre,
      category: dominantCategory,
      macroAnalysis: {
        psikologiGlobal: macro.psikologiGlobal,
        suasanaBatin: macro.suasanaBatin,
        nadaBatinPembaca: macro.nadaBatinPembaca,
        emotionalArc: macro.emotionalArc,
        fokusUtamaVAIEPP: macro.fokusUtamaVAIEPP
      },
      contemplationGuide: macro.contemplation,
      verses: analyzedVerses
    };
  }

  // Analisis spesifik untuk satu ayat
  analyzeSingleVerse(verseNum, text, category, index, totalVerses) {
    const annotated = this.generateAnnotatedHtml(text);

    // Variasi panduan berdasarkan kategori dan posisi ayat dalam mazmur
    const isBeginning = index === 0;
    const isEnding = index === totalVerses - 1;

    let psikologiAyat = "";
    let nadaBatin = "";
    let vokal = "";
    let artikulasi = "";
    let intonasi = "";
    let ekspresi = "";
    let penghayatan = "";
    let penampilan = "";

    switch (category) {
      case "lament":
        psikologiAyat = "Gejolak batin yang menghadapi kepedihan atau ancaman; kesadaran akan kerapuhan insani yang berseru meminta intervensi Ilahi.";
        nadaBatin = "Sarat rasa prihatin, mendalam, berbobot, menahan getaran kepedihan tanpa kehilangan harapan.";
        vokal = "Mezzo-piano di rongga dada bawah, tempo lambat (adagio), nafas diafragma dalam.";
        artikulasi = "Tegaskan kata kunci permohonan. Ucapkan konsonan penutup dengan tegas agar tidak tertelan.";
        intonasi = "Kadens menurun (lamenting falling inflection), berikan jeda hening sejenak pada tanda '//'.";
        ekspresi = "Raut wajah khidmat mendalam, dahi sedikit terfokus, tatapan mata penuh permohonan ke arah altar/salib.";
        penghayatan = "Hadirkan perasaan seseorang yang sedang berada di titik tergelap hidupnya, namun percaya ada telinga Tuhan yang mendengar.";
        penampilan = "Berdiri kokoh dengan tumpuan seimbang, kepala tidak menunduk lemas, menjaga wibawa mimbar sabda.";
        break;

      case "repentance":
        psikologiAyat = "Kesadaran nurani yang murni akan kesalahan; jiwa yang menanggalkan topeng kepura-puraan di hadapan terang Allah.";
        nadaBatin = "Rendah hati, tulus, tanpa pembelaan diri, sarat kerinduan akan kesucian batin.";
        vokal = "Pianissimo hingga mezzo-piano, lembut berbisik jelas (clear intimate projection).";
        artikulasi = "Artikulasi bersih dan lembut, hindari gaya membaca yang terburu-buru atau kaku.";
        intonasi = "Intonasi merendah khusyuk, biarkan getaran kata meresap ke dalam keheningan gereja.";
        ekspresi = "Kelopak mata melembut merunduk takzim, raut wajah mencerminkan kejujuran batin seorang anak yang pulang.";
        penghayatan = "Rasakan beban kesalahan Anda diangkat oleh anugerah belas kasih Allah yang tak bertepi.";
        penampilan = "Kedua tangan bertumpu tenang di mimbar, pundak rileks, menjaga sikap tubuh yang sangat bersahaja.";
        break;

      case "praise":
        psikologiAyat = "Kegembiraan kosmis yang meluap; perayaan kemenangan dan kekaguman akan kebaikan serta keagungan Tuhan.";
        nadaBatin = "Penuh semangat kemenangan, cerah, optimis, memancarkan api sukacita kepada seluruh jemaat.";
        vokal = "Forte agung (penuh resonansi dada dan kepala), vokal bulat dan kaya overtone.";
        artikulasi = "Aksentuasi energik pada kata-kata puji-pujian, letupan konsonan tajam dan jelas.";
        intonasi = "Kadens menanjak dinamis (triumphant upward inflection), tempo allegro moderato yang bertenaga.";
        ekspresi = "Wajah berseri-seri penuh anugerah, mata berbinar menyapu jemaat dari kiri ke kanan dengan hangat.";
        penghayatan = "Rasakan diri Anda menjadi terompet hidup yang memberitakan keselamatan dan kebaikan Tuhan bagi dunia.";
        penampilan = "Dada membusung percaya diri, kepala tegak bermartabat, postur kokoh menyambut hadirat Raja Semesta.";
        break;

      case "trust":
      default:
        psikologiAyat = "Ketenangan batin yang bersandar mutlak pada perlindungan Ilahi; tiada badai yang sanggup menggoyahkan sauh iman.";
        nadaBatin = "Teduh, berakar (grounded), merengkuh, menenangkan hati setiap orang yang mendengarkan.";
        vokal = "Mezzo-piano ke mezzo-forte hangat, aliran nafas legato berkesinambungan tanpa jeda tersengal.";
        artikulasi = "Kejelasan diksi pada kata janji keselamatan, vokal sakral diucapkan bulat dan tidak sengau.";
        intonasi = "Alunan melodi bicara yang mengayun menenangkan bagai aliran air tenang di padang hijau.";
        ekspresi = "Senyum teduh alami di sudut bibir, tatapan mata hangat dan menguatkan hati jemaat.";
        penghayatan = "Rasakan kedamaian yang melampaui segala akal memenuhi rongga dada Anda saat kalimat ini mengalir.";
        penampilan = "Sikap berdiri tenang sempurna, tidak bergoyang, memancarkan damai sejahtera seorang lektor yang terberkati.";
        break;
    }

    // Penyesuaian khusus jika ayat awal atau ayat akhir
    if (isBeginning) {
      intonasi += " (Sebagai ayat pembuka: gunakan nada perkenalan yang menggugah perhatian batin umat).";
      ekspresi += " Lakukan kontak mata awal 2 detik dengan umat sebelum kata pertama diucapkan.";
    } else if (isEnding) {
      intonasi += " (Sebagai ayat penutup: perlambat tempo di frasa terakhir, gunakan kadens penutup tuntas yang berwibawa).";
      penampilan += " Pertahankan keheningan mimbar selama 2-3 detik setelah kata terakhir selesai diucapkan sebelum membungkuk hormat.";
    }

    // Analisis Penggalan Suku Kata dan Arah Nada (Naik / Turun / Datar)
    const phrasingData = analyzePhrasingAndPitch(text, index, totalVerses, category);
    const textLines = text.split(/\r?\n/);
    const syllableText = textLines.map(line => {
      const words = line.split(/\s+/).filter(w => w.length > 0);
      return words.map(w => syllabifyWord(w)).join(" ");
    }).join("\n");

    return {
      number: verseNum,
      rawText: text,
      annotatedHtml: annotated,
      syllableText,
      phrasingData,
      psikologiAyat,
      nadaBatin,
      vokal,
      artikulasi,
      intonasi,
      ekspresi,
      penghayatan,
      penampilan
    };
  }
}

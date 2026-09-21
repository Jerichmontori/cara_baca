// phrasing.js - Modul Penggalan Kata (Suku Kata) & Penanda Kontur Melodi Nada (↗ ↘ →)

// Kamus suku kata kata-kata sakral & umum Mazmur TB2
export const sacredSyllableDict = {
  "tuhan": "TU-HAN",
  "tuhanlah": "TU-HAN-lah",
  "gembala": "gem-ba-la",
  "gembalaku": "gem-ba-la-ku",
  "takkan": "tak-kan",
  "kekurangan": "ke-ku-rang-an",
  "aku": "a-ku",
  "ia": "I-a",
  "membaringkan": "mem-ba-ring-kan",
  "di": "di",
  "padang": "pa-dang",
  "yang": "yang",
  "berumput": "ber-um-put",
  "hijau": "hi-jau",
  "membimbing": "mem-bim-bing",
  "ke": "ke",
  "air": "a-ir",
  "tenang": "te-nang",
  "menyegarkan": "me-nye-gar-kan",
  "jiwaku": "ji-wa-ku",
  "menuntun": "me-nun-tun",
  "jalan": "ja-lan",
  "benar": "be-nar",
  "demi": "de-mi",
  "namanya": "na-ma-Nya",
  "sekalipun": "se-ka-li-pun",
  "berjalan": "ber-ja-lan",
  "dalam": "da-lam",
  "lembah": "lem-bah",
  "kekelaman": "ke-ke-lam-an",
  "tidak": "ti-dak",
  "takut": "ta-kut",
  "bahaya": "ba-ha-ya",
  "sebab": "se-bab",
  "engkau": "Eng-kau",
  "besertaku": "be-ser-ta-ku",
  "gadamu": "ga-da-Mu",
  "dan": "dan",
  "tongkatmu": "tong-kat-Mu",
  "itulah": "i-tu-lah",
  "menghibur": "meng-hi-bur",
  "menyediakan": "me-nye-di-a-kan",
  "hidangan": "hi-dang-an",
  "bagiku": "ba-gi-ku",
  "hadapan": "ha-dap-an",
  "lawanku": "la-wan-ku",
  "lawanlawanku": "la-wan-la-wan-ku",
  "mengurapi": "meng-u-ra-pi",
  "kepalaku": "ke-pa-la-ku",
  "dengan": "de-ngan",
  "minyak": "mi-nyak",
  "pialaku": "pi-a-la-ku",
  "cawanku": "ca-wan-ku",
  "penuh": "pe-nuh",
  "melimpah": "me-lim-pah",
  "kebajikan": "ke-ba-jik-an",
  "kemurahan": "ke-mu-rah-an",
  "belaka": "be-la-ka",
  "akan": "a-kan",
  "mengikuti": "meng-i-ku-ti",
  "seumur": "se-u-mur",
  "hidupku": "hi-dup-ku",
  "diam": "di-am",
  "rumah": "ru-mah",
  "sepanjang": "se-pan-jang",
  "masa": "ma-sa",
  // Mazmur 51
  "kasihanilah": "ka-si-han-i-lah",
  "allah": "Al-lah",
  "allahku": "Al-lah-ku",
  "menurut": "me-nu-rut",
  "kasih": "ka-sih",
  "setiamu": "se-ti-a-Mu",
  "hapuskanlah": "ha-pus-kan-lah",
  "pelanggaranku": "pe-lang-gar-an-ku",
  "rahmatmu": "rah-mat-Mu",
  "besar": "be-sar",
  "bersihkanlah": "ber-sih-kan-lah",
  "seluruhnya": "se-lu-ruh-nya",
  "dari": "da-ri",
  "kesalahanku": "ke-sa-lah-an-ku",
  "tahirkanlah": "ta-hir-kan-lah",
  "dosaku": "do-sa-ku",
  "menyadari": "me-nya-da-ri",
  "senantiasa": "se-nan-ti-a-sa",
  "ada": "a-da",
  "hadapanku": "ha-dap-an-ku",
  "jadikanlah": "ja-di-kan-lah",
  "hatiku": "ha-ti-ku",
  "tahir": "ta-hir",
  "perbaharuilah": "per-ba-ha-ru-i-lah",
  "batinku": "ba-tin-ku",
  "roh": "roh",
  "teguh": "te-guh",
  "janganlah": "ja-ngan-lah",
  "membuang": "mem-bu-ang",
  "hadapanmu": "ha-dap-an-Mu",
  "mengambil": "meng-am-bil",
  "rohmu": "Roh-Mu",
  "kudus": "ku-dus",
  "padaku": "pa-da-ku",
  "kembalikanlah": "kem-ba-li-kan-lah",
  "kepadaku": "ke-pa-da-ku",
  "kegirangan": "ke-gi-rang-an",
  "karena": "ka-re-na",
  "keselamatanmu": "ke-se-la-mat-an-Mu",
  "topanglah": "to-pang-lah",
  "rela": "re-la",
  "kurban": "kur-ban",
  "sembelihan": "sem-be-lih-an",
  "kepada": "ke-pa-da",
  "ialah": "i-a-lah",
  "jiwa": "ji-wa",
  "hancur": "han-cur",
  "hati": "ha-ti",
  "patah": "pa-tah",
  "remuk": "re-muk",
  "kaupandang": "Kau-pan-dang",
  "hina": "hi-na",
  // Mazmur 100
  "bersorak": "ber-so-rak",
  "bersoraksorailah": "ber-so-rak-so-rai-lah",
  "hai": "hai",
  "seluruh": "se-lu-ruh",
  "bumi": "bu-mi",
  "beribadahlah": "ber-i-ba-dah-lah",
  "sukacita": "su-ka-ci-ta",
  "datanglah": "da-tang-lah",
  "soraksorai": "so-rak-so-rai",
  "ketahuilah": "ke-ta-hu-i-lah",
  "bahwa": "bah-wa",
  "dialah": "Di-a-lah",
  "menjadikan": "men-ja-di-kan",
  "kita": "ki-ta",
  "punya": "pu-nya",
  "umatnya": "u-mat-Nya",
  "kawanan": "ka-wan-an",
  "domba": "dom-ba",
  "gembalaannya": "gem-ba-la-an-Nya",
  "masuklah": "ma-suk-lah",
  "melalui": "me-la-lu-i",
  "gerbangnya": "ger-bang-Nya",
  "nyanyian": "nya-nyi-an",
  "syukur": "syu-kur",
  "pelatarannya": "pe-la-tar-an-Nya",
  "pujipujian": "pu-ji-pu-ji-an",
  "bersyukurlah": "ber-syu-kur-lah",
  "pujilah": "pu-ji-lah",
  "nama": "na-ma",
  "namanya": "na-ma-Nya",
  "baik": "ba-ik",
  "selamalamanya": "se-la-ma-la-ma-nya",
  "kesetiaannya": "ke-se-ti-a-an-Nya",
  "turuntemurun": "tu-run-te-mu-run",
  // Mazmur 130
  "jurang": "ju-rang",
  "berseru": "ber-se-ru",
  "dengarkanlah": "de-ngar-kan-lah",
  "suaraku": "su-a-ra-ku",
  "biarlah": "bi-ar-lah",
  "telingamu": "te-li-nga-Mu",
  "menaruh": "me-na-ruh",
  "perhatian": "per-ha-ti-an",
  "pada": "pa-da",
  "suara": "su-a-ra",
  "permohonanku": "per-mo-hon-an-ku",
  "jika": "ji-ka",
  "memperhitungkan": "mem-per-hi-tung-kan",
  "kesalahankesalahan": "ke-sa-lah-an-ke-sa-lah-an",
  "siapakah": "si-a-pa-kah",
  "dapat": "da-pat",
  "bertahan": "ber-ta-han",
  "namun": "na-mun",
  "pengampunan": "peng-am-pun-an",
  "supaya": "su-pa-ya",
  "ditakuti": "di-ta-kut-i",
  "orang": "o-rang",
  "menantinantikan": "me-nan-ti-nan-ti-kan",
  "menantinanti": "me-nan-ti-nan-ti",
  "berharap": "ber-ha-rap",
  "firman": "fir-man",
  "firmannya": "fir-man-Nya",
  "mengharapkan": "meng-ha-rap-kan",
  "pengawal": "peng-a-wal",
  "fajar": "fa-jar",
  "pagi": "pa-gi",
  "ya": "ya",
  // Mazmur 91 & 42
  "duduk": "du-duk",
  "lindungan": "lin-dung-an",
  "mahatinggi": "Ma-ha-ting-gi",
  "bermalam": "ber-ma-lam",
  "naungan": "na-ung-an",
  "mahakuasa": "Ma-ha-ku-a-sa",
  "berkata": "ber-ka-ta",
  "tempat": "tem-pat",
  "perlindunganku": "per-lin-dung-an-ku",
  "benteng": "ben-teng",
  "pertahananku": "per-ta-han-an-ku",
  "kupercayai": "ku-per-ca-ya-i",
  "kepaknya": "ke-pak-Nya",
  "menudungi": "me-nu-dungi",
  "engkau": "eng-kau",
  "bawah": "ba-wah",
  "sayapnya": "say-ap-Nya",
  "berlindung": "ber-lin-dung",
  "perisai": "pe-ri-sai",
  "pagar": "pa-gar",
  "tembok": "tem-bok",
  "usah": "u-sah",
  "kedahsyatan": "ke-dah-syat-an",
  "malam": "ma-lam",
  "terhadap": "ter-ha-dap",
  "panah": "pa-nah",
  "terbang": "ter-bang",
  "waktu": "wak-tu",
  "siang": "si-ang",
  "seperti": "se-per-ti",
  "rusa": "ru-sa",
  "merindukan": "me-rin-du-kan",
  "sungai": "sung-ai",
  "berair": "ber-air",
  "demikianlah": "de-mi-ki-an-lah",
  "haus": "ha-us",
  "hidup": "hi-dup",
  "bilakah": "bi-la-kah",
  "boleh": "bo-leh",
  "datang": "da-tang",
  "memandang": "me-man-dang",
  "melihat": "me-li-hat",
  "wajah": "wa-jah",
  "mengapa": "meng-a-pa",
  "tertekan": "ter-te-kan",
  "gelisah": "ge-li-sah",
  "diriku": "di-ri-ku",
  "berharaplah": "ber-ha-rap-lah",
  // Mazmur 14
  "pemimpin": "pe-mim-pin",
  "biduan": "bi-du-an",
  "daud": "Da-ud",
  "bebal": "be-bal",
  "hatinya": "ha-ti-nya",
  "busuk": "bu-suk",
  "jijik": "ji-jik",
  "perbuatan": "per-bu-at-an",
  "berbuat": "ber-bu-at",
  "surga": "sur-ga",
  "manusia": "ma-nu-si-a",
  "berakal": "ber-a-kal",
  "budi": "bu-di",
  "menyeleweng": "me-nye-le-weng",
  "bejat": "be-jat",
  "seorang": "se-o-rang",
  "sadarkah": "sa-dar-kah",
  "kejahatan": "ke-ja-hat-an",
  "memakan": "me-ma-kan",
  "umatku": "u-mat-Ku",
  "roti": "ro-ti",
  "sanalah": "sa-na-lah",
  "terkejut": "ter-ke-jut",
  "gemetar": "ge-me-tar",
  "menyertai": "me-nyer-ta-i",
  "angkatan": "ang-kat-an",
  "benar": "be-nar",
  "mempermalukan": "mem-per-ma-lu-kan",
  "rancangan": "ran-cang-an",
  "tertindas": "ter-tin-das",
  "perlindungannya": "per-lin-dung-an-nya",
  "sion": "Si-on",
  "israel": "Is-ra-el",
  "keselamatan": "ke-se-la-mat-an",
  "memulihkan": "me-mu-lih-kan",
  "keadaan": "ke-a-da-an",
  "yakub": "Ya-kub",
  "bersoraksorak": "ber-so-rak-so-rak",
  "bersukacita": "ber-su-ka-ci-ta",
  "lagi": "la-gi",
  "penolongku": "pe-no-long-ku"
};

// Pemenggal kata otomatis berdasarkan fonologi bahasa Indonesia
export function syllabifyWord(rawWord) {
  if (!rawWord) return "";
  
  // Pisahkan tanda baca depan & belakang
  const match = rawWord.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9\-_]+)([^a-zA-Z0-9]*)$/);
  if (!match) return rawWord;

  const prefixPunct = match[1] || "";
  const coreWord = match[2] || "";
  const suffixPunct = match[3] || "";

  // Jika kata berulang dengan tanda hubung (misal: "menanti-nanti", "bersorak-sorai")
  if (coreWord.includes("-")) {
    const parts = coreWord.split("-");
    const sylParts = parts.map(p => syllabifyWord(p));
    return prefixPunct + sylParts.join(" - ") + suffixPunct;
  }

  // Cek kamus sakral
  const cleanKey = coreWord.toLowerCase();
  if (sacredSyllableDict[cleanKey]) {
    const sylTemplate = sacredSyllableDict[cleanKey];
    // Sesuaikan kapitalisasi asli jika kata diawali huruf besar
    if (coreWord[0] === coreWord[0].toUpperCase()) {
      return prefixPunct + sylTemplate.split("-").map((s, idx) => idx === 0 ? s[0].toUpperCase() + s.slice(1) : s).join("-") + suffixPunct;
    }
    return prefixPunct + sylTemplate + suffixPunct;
  }

  // Pemenggalan algoritmik jika kata tidak ada di kamus
  const syllabified = algorithmicSyllabify(coreWord);
  return prefixPunct + syllabified + suffixPunct;
}

// Algoritma pemisahan suku kata V, VK, KV, KVK bahasa Indonesia
function algorithmicSyllabify(word) {
  if (word.length <= 3) return word;

  const vowels = "aiueoAIUEO";
  const isV = (char) => vowels.includes(char);
  const isC = (char) => !isV(char) && /[a-zA-Z]/.test(char);

  // Normalisasi konsonan rangkap (digraf) seperti ng, ny, sy, kh
  let w = word;
  let result = [];
  let i = 0;

  while (i < w.length) {
    result.push(w[i]);
    if (i < w.length - 1) {
      const c1 = w[i];
      const c2 = w[i + 1];
      const c3 = i + 2 < w.length ? w[i + 2] : "";
      const c4 = i + 3 < w.length ? w[i + 3] : "";

      // V - V (misal: a-ir, di-am, su-a-ra)
      if (isV(c1) && isV(c2) && !isDiphthong(c1, c2)) {
        result.push("-");
      }
      // V - C - V (misal: tu-han, pa-da, ma-ka)
      else if (isV(c1) && isC(c2) && isV(c3)) {
        result.push("-");
      }
      // V - C1 - C2 - V (misal: lem-bah, tong-kat, tak-kan)
      else if (isV(c1) && isC(c2) && isC(c3) && isV(c4)) {
        // Cek digraf (ng, ny, sy, kh tidak boleh dipisah)
        const digraf = (c2 + c3).toLowerCase();
        if (["ng", "ny", "sy", "kh"].includes(digraf)) {
          // potong sebelum digraf: V - digraf - V (misal: pe-ngawal, de-ngan)
          result.push("-");
        } else {
          // potong di antara konsonan: lem-bah
          result.push(c2);
          result.push("-");
          i++;
        }
      }
    }
    i++;
  }

  return result.join("");
}

function isDiphthong(c1, c2) {
  const pair = (c1 + c2).toLowerCase();
  return ["ai", "au", "oi", "ei"].includes(pair);
}

// Analisis Frasa dan Penentuan Kontur Nada (↗ ↘ →)
export function analyzePhrasingAndPitch(verseText, verseIndex, totalVerses, psalmCategory = "trust") {
  // Bersihkan tag html jika ada
  const cleanText = verseText.replace(/<[^>]*>/g, "");

  // Pisahkan frasa berdasarkan pembatas liturgis: //, /, ;, :, koma, titik, tanda tanya
  // Kita jaga urutan pembatas agar tahu konteks intonasi
  const rawPhrases = cleanText
    .split(/(\/\/|\/|;|\?|\.|\!|,)/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  let mergedPhrases = [];
  let currentBuffer = "";

  for (let i = 0; i < rawPhrases.length; i++) {
    const chunk = rawPhrases[i];
    if (["//", "/", ";", "?", ".", "!", ","].includes(chunk)) {
      if (currentBuffer.trim()) {
        mergedPhrases.push({
          text: currentBuffer.trim(),
          delimiter: chunk
        });
        currentBuffer = "";
      } else if (mergedPhrases.length > 0) {
        // Tambahkan delimiter ke frasa sebelumnya jika ada
        mergedPhrases[mergedPhrases.length - 1].delimiter += " " + chunk;
      }
    } else {
      currentBuffer += (currentBuffer ? " " : "") + chunk;
    }
  }

  if (currentBuffer.trim()) {
    mergedPhrases.push({
      text: currentBuffer.trim(),
      delimiter: "."
    });
  }

  // Evaluasi Kontur Nada per Frasa
  return mergedPhrases.map((item, idx) => {
    const isFirstPhrase = idx === 0;
    const isLastPhrase = idx === mergedPhrases.length - 1;
    const delim = item.delimiter;
    const lowerText = item.text.toLowerCase();

    // Suku kata per kata
    const words = item.text.split(/\s+/);
    const syllabifiedWords = words.map(w => syllabifyWord(w));
    const syllabifiedText = syllabifiedWords.join(" ");

    let pitchType = "naik";
    let pitchIcon = "↗";
    let pitchLabel = "Nada Naik";
    let reason = "";

    // 1. Pengantar Formal & Judul Mazmur -> Nada Datar-Tegas
    if (
      lowerText.startsWith("untuk pemimpin") || 
      lowerText.startsWith("dari daud") || 
      lowerText.startsWith("mazmur daud") || 
      lowerText.startsWith("nyanyian ziarah")
    ) {
      pitchType = "datar";
      pitchIcon = "→";
      pitchLabel = "Nada Datar-Tegas (Pengantar Formal)";
      reason = "Buka dengan nada formal dan tegas pada pengantar judul mazmur.";
    }
    // 2. Teguran Berat & Keprihatinan Moral (misal: Mazmur 14) -> Nada Merendah Berat / Ditekan
    else if (
      lowerText.includes("orang bebal") || 
      lowerText.includes("tidak ada allah") || 
      lowerText.includes("busuk") || 
      lowerText.includes("jijik") || 
      lowerText.includes("bejat") || 
      lowerText.includes("menyeleweng") ||
      lowerText.includes("kejahatan") ||
      lowerText.includes("tidak ada yang berbuat baik")
    ) {
      pitchType = "turun";
      pitchIcon = "↘";
      pitchLabel = "Nada Merendah Berat (Teguran Prihatin)";
      reason = "Masuk ke isi firman: turunkan nada menjadi lebih rendah, berat, dan sedikit ditekan mencerminkan keprihatinan mendalam.";
    }
    // 3. Tanda tanya (?) atau gugatan reflektif -> Nada Naik
    else if (
      delim.includes("?") || 
      lowerText.startsWith("mengapa") || 
      lowerText.startsWith("bilakah") || 
      lowerText.startsWith("siapakah") ||
      lowerText.startsWith("tidak sadarkah")
    ) {
      pitchType = "naik";
      pitchIcon = "↗";
      pitchLabel = "Nada Naik (Pertanyaan / Gugatan Reflektif)";
      reason = "Infleksi nada meninggi pada suku kata akhir untuk menggugah nurani dan permenungan batin umat.";
    }
    // 4. Frasa puji-pujian, sorak-sorai, atau sukacita kemenangan -> Nada Naik Bertenaga
    else if (
      lowerText.includes("bersorak") || 
      lowerText.includes("bersukacita") || 
      lowerText.includes("pujilah") || 
      lowerText.includes("beribadahlah") ||
      lowerText.includes("haleluya") ||
      lowerText.includes("sorak-sorai")
    ) {
      pitchType = "naik";
      pitchIcon = "↗";
      pitchLabel = "Nada Naik (Sorak Sukacita Kemenangan)";
      reason = "Melodi melambung cerah dan bersemangat melepaskan sukacita perayaan keselamatan iman.";
    }
    // 5. Frasa permohonan / ratapan / remuk hati / lembah maut -> Nada Turun / Merendah Khusyuk
    else if (
      lowerText.includes("kasihanilah") || 
      lowerText.includes("jurang yang dalam") || 
      lowerText.includes("hapuskanlah") || 
      lowerText.includes("jiwa yang hancur") ||
      lowerText.includes("lembah kekelaman") ||
      lowerText.includes("remuk")
    ) {
      pitchType = "turun";
      pitchIcon = "↘";
      pitchLabel = "Nada Merendah Khusyuk (Permohonan Batin)";
      reason = "Merendahkan pitch suara ke register dada bawah untuk memancarkan kerendahan hati dan kepedihan doa yang tulus.";
    }
    // 6. Frasa terakhir ayat atau diakhiri titik (.) -> Nada Turun (Kadens Tuntas)
    else if (isLastPhrase || delim.includes(".")) {
      pitchType = "turun";
      pitchIcon = "↘";
      pitchLabel = "Nada Turun (Kadens Tuntas)";
      reason = "Kadens suara merendah dengan mantap dan berwibawa, menandakan kepastian dan penutupan pernyataan firman.";
    }
    // 7. Frasa gelar ilahi atau meditatif di tengah -> Nada Datar Khidmat
    else if (
      lowerText === "ya allah" || 
      lowerText === "ya tuhan" || 
      lowerText.includes("allahku") ||
      (delim.includes("//") && lowerText.length < 25)
    ) {
      pitchType = "datar";
      pitchIcon = "→";
      pitchLabel = "Nada Datar Khidmat (Tenuto Sakral)";
      reason = "Nada stabil tanpa ayunan berlebih memberi nuansa hening, agung, dan takzim di hadapan kekudusan Allah.";
    }
    // 8. Frasa pembuka kalimat deklaratif -> Nada Naik Mengangkat Perhatian
    else if (isFirstPhrase) {
      pitchType = "naik";
      pitchIcon = "↗";
      pitchLabel = "Nada Naik (Mengangkat Perhatian)";
      reason = "Mengangkat nada bicara pada awal kalimat untuk membangunkan konsentrasi jemaat dan memancarkan wibawa firman.";
    }
    // 9. Default jeda koma atau jeda nafas pendek (/) -> Nada Naik Menggantung
    else {
      pitchType = "naik";
      pitchIcon = "↗";
      pitchLabel = "Nada Naik Sedikit (Antiseden Menggantung)";
      reason = "Nada sedikit menggantung di akhir kata sebelum jeda nafas, menandakan bahwa gagasan kalimat masih berlanjut.";
    }

    return {
      text: item.text,
      delimiter: item.delimiter,
      syllabified: syllabifiedText,
      pitchType,
      pitchIcon,
      pitchLabel,
      reason
    };
  });
}

// presets.js - Pustaka Mazmur Masterclass Berdasarkan Terjemahan Baru 2 (TB2) - Lembaga Alkitab Indonesia (LAI)
import { analyzePhrasingAndPitch, syllabifyWord } from "./phrasing.js";

export const psalmPresets = [
  {
    id: "mzm-23",
    title: "Mazmur 23 (TB2)",
    version: "TB2",
    subtitle: "TUHAN, gembalaku yang baik • Terjemahan Baru Edisi 2 (LAI)",
    refren: "TUHANlah gembalaku, takkan kekurangan aku.",
    genre: "Mazmur Kepercayaan & Damai Sejahtera (Trust & Serenity)",
    category: "trust",
    macroAnalysis: {
      psikologiGlobal: "Keadaan jiwa yang telah melampaui kepanikan duniawi dan berlabuh pada rasa aman mutlak dalam pemeliharaan Sang Gembala Agung. Dalam TB2 ditegaskan 'TUHANlah gembalaku', memberikan aksen kepemilikan dan keterikatan mutlak tanpa keraguan batin.",
      suasanaBatin: "Ketenangan air hening (menuchot), keheningan yang teduh, kehangatan perlindungan ilahi, dan kepastian masa depan kekal.",
      nadaBatinPembaca: "Hangat, merengkuh, berakar (grounded), bernada dada lembut (chest resonance), tidak terburu-buru, bagai gembala yang menenangkan kawanan dombanya.",
      emotionalArc: "Mulai dari ketenangan padang hijau -> masuk ke bayang-bayang lembah kekelaman (nada merendah & mantap tanpa panik) -> naik ke sukacita jamuan perjamuan dan kediaman abadi.",
      fokusUtamaVAIEPP: "Intonasi mengayun lembut (legato), artikulasi kata 'TUHANlah gembalaku' yang mantap berwibawa, dan tatapan mata yang memancarkan damai ke seluruh umat."
    },
    contemplationGuide: "Tutup mata Anda sejenak. Rasakan hembusan nafas Anda. Bayangkan padang rumput hijau yang sejuk dan gemercik air yang tenang. Lepaskan semua beban, kepanikan, dan ketegangan bahu Anda. Hayati penegasan TB2: 'TUHANlah gembalaku, takkan kekurangan aku.'",
    verses: [
      {
        number: 1,
        rawText: "TUHANlah gembalaku, / takkan kekurangan aku.",
        annotatedHtml: "<span class=\"stress-word\">TUHANlah</span> gembalaku, <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> <span class=\"stress-word\">takkan kekurangan</span> aku.",
        psikologiAyat: "Deklarasi iman TB2 dengan partikel '-lah' yang mempertegas bahwa hanya TUHAN satu-satunya tumpuan jiwa; kepastian eksistensial mutlak.",
        nadaBatin: "Teduh, mantap, penuh kehangatan rasa syukur yang mengalir dari lubuk hati terdalam.",
        vokal: "Mezzo-piano (lembut namun berbobot), resonansi dada (chest voice), tempo sedang-lambat (adagio).",
        artikulasi: "Jelaskan partikel penegas '-lah' pada 'TUHANlah' dan letupan 'k' pada 'takkan kekurangan'.",
        intonasi: "Infleksi nada naik perlahan berwibawa pada 'TUHANlah', turun tenang pada akhir frasa 'kekurangan aku'.",
        ekspresi: "Wajah relaks, dahi terbuka tanpa kerutan cemas, senyum teduh tipis di sudut bibir, tatapan mata hangat menyapu umat.",
        penghayatan: "Rasakan pelukan pemeliharaan Ilahi; biarkan dada terasa lapang dan damai saat mengucapkannya.",
        penampilan: "Berdiri tegak santai, kedua bahu turun rileks, tangan memegang ambon/teks dengan mantap tanpa mencengkeram."
      },
      {
        number: 2,
        rawText: "Ia membaringkan aku di padang yang berumput hijau, // Ia membimbing aku ke air yang tenang;",
        annotatedHtml: "Ia membaringkan aku / di padang yang berumput <span class=\"stress-word\">hijau</span>, <span class=\"breath-long\" title=\"Jeda hening panjang\">//</span> Ia membimbing aku / ke <span class=\"stress-word\">air yang tenang</span>;",
        psikologiAyat: "Kelegaan fisik dan rohani; sensasi tubuh yang dilepaskan dari keletihan perjalanan panjang padang gurun.",
        nadaBatin: "Mengalir bagai aliran air pegunungan; sangat syahdu, penuh kelemahlembutan.",
        vokal: "Piano (halus membisik namun berproyeksi sampai bangku gereja paling belakang), aliran nafas lembut berkesinambungan (legato).",
        artikulasi: "Lembutkan vokal 'i-a-u' pada 'berumput hijau' dan 'air yang tenang'. Jangan tergesa-gesa pada kata 'membaringkan'.",
        intonasi: "Garis nada melandai bagai riak air tenang; jeda hening (//) di tengah memberi ruang bagi umat untuk membayangkan suasana damai.",
        ekspresi: "Mata sedikit melembut, alis terbuka lapang, pandangan melayang tenang ke arah tengah gereja.",
        penghayatan: "Hadirkan dalam imajinasi Anda aroma rumput basah berembun dan sejuknya air bening yang menyegarkan dahaga.",
        penampilan: "Pertahankan ketenangan tubuh; jangan ada goyangan kaki atau kepala yang memecah konsentrasi meditatif."
      },
      {
        number: 3,
        rawText: "Ia menyegarkan jiwaku. // Ia menuntun aku di jalan yang benar / demi nama-Nya.",
        annotatedHtml: "Ia menyegarkan <span class=\"stress-word\">jiwaku</span>. <span class=\"breath-long\" title=\"Jeda hening panjang\">//</span> Ia menuntun aku di jalan yang <span class=\"stress-word\">benar</span> <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> <span class=\"stress-word\">demi nama-Nya</span>.",
        psikologiAyat: "Pemulihan kekuatan batin (restoration of soul); penegasan TB2 'demi nama-Nya' menegaskan kemuliaan dan kesetiaan Allah yang menjadi garansi hidup.",
        nadaBatin: "Bertenaga baru, penuh rasa hormat dan syukur atas bimbingan yang tak pernah salah arah.",
        vokal: "Mezzo-forte (volume meningkat sedikit dari ayat sebelumnya), vokal lebih bervolume pada kata 'jiwaku'.",
        artikulasi: "Tegaskan kata TB2 'demi nama-Nya' dengan artikulasi bersih dan khidmat.",
        intonasi: "Kadens mengangkat pada 'menyegarkan jiwaku', lalu menurun dengan bobot sakral pada 'demi nama-Nya'.",
        ekspresi: "Tatapan mata berbinar dengan harapan hidup baru; dagu sejajar lantai, memancarkan ketegasan yang damai.",
        penghayatan: "Rasakan seolah-olah beban berat di pundak Anda baru saja diangkat dan nafas kehidupan baru ditiupkan ke dalam dada.",
        penampilan: "Dada sedikit membusung anggun (sikap tubuh tegak bersyukur), nafas diafragma terisi penuh."
      },
      {
        number: 4,
        rawText: "Sekalipun aku berjalan dalam lembah kekelaman, / aku tidak takut bahaya, // sebab Engkau besertaku; // gada-Mu dan tongkat-Mu, / itulah yang menghibur aku.",
        annotatedHtml: "Sekalipun aku berjalan dalam <span class=\"stress-word\">lembah kekelaman</span>, <span class=\"breath-short\">/</span> aku <span class=\"stress-word\">tidak takut</span> bahaya, <span class=\"breath-long\">//</span> sebab <span class=\"stress-word\">Engkau besertaku</span>; <span class=\"breath-long\">//</span> gada-Mu dan tongkat-Mu, <span class=\"breath-short\">/</span> itulah yang <span class=\"stress-word\">menghibur</span> aku.",
        psikologiAyat: "Puncak drama eksistensial: konfrontasi dengan bayang-bayang maut dan penderitaan, yang ditaklukkan oleh kehadiran intim Sang Gembala ('sebab Engkau besertaku').",
        nadaBatin: "Serius dan gelap di awal, lalu melonjak menjadi keberanian kudus dan kehangatan perlindungan pribadi.",
        vokal: "Mulai dari mezzo-piano bergetar di 'lembah kekelaman' -> Mezzo-forte tegas dan mantap di 'tidak takut bahaya' -> Melembut intim di 'sebab Engkau besertaku'.",
        artikulasi: "Tekan kuat kata 'lembah kekelaman' dengan resonansi dada dalam. Kata 'Engkau' diucapkan dengan intonasi hubungan personal yang sangat dekat.",
        intonasi: "Perlambat tempo di paruh pertama; berikan jeda hening sakral (//) sebelum menyebut 'sebab Engkau besertaku'.",
        ekspresi: "Raut wajah berubah khidmat mendalam saat menyebut lembah, lalu sorot mata menjadi sangat mantap dan penuh keyakinan saat menyebut 'Engkau besertaku'.",
        penghayatan: "Ingat momen tersulit dalam hidup Anda saat Anda merasa sendirian di kegelapan, lalu rasakan tangan kokoh Tuhan yang menggenggam pundak Anda.",
        penampilan: "Kaki berpijak kokoh di lantai altar (grounded stance), kepala tidak menunduk kalah."
      },
      {
        number: 5,
        rawText: "Engkau menyediakan hidangan bagiku, / di hadapan lawanku; // Engkau mengurapi kepalaku dengan minyak; / pialaku penuh melimpah.",
        annotatedHtml: "Engkau menyediakan <span class=\"stress-word\">hidangan bagiku</span>, <span class=\"breath-short\">/</span> di hadapan <span class=\"stress-word\">lawanku</span>; <span class=\"breath-long\">//</span> Engkau mengurapi kepalaku dengan minyak; <span class=\"breath-short\">/</span> pialaku <span class=\"stress-word\">penuh melimpah</span>.",
        psikologiAyat: "Kemenangan martabat dan kelimpahan berkat di hadapan mereka yang meremehkan; rasa dihargai secara agung oleh Raja Semesta.",
        nadaBatin: "Bangga kudus, penuh suka cita terharu, penuh getaran anugerah melimpah ruah.",
        vokal: "Forte moderato (penuh, terbuka, sonorous), vokal bundar dan kaya overtone.",
        artikulasi: "Aksentuasi jelas pada 'penuh melimpah' dengan vokal 'ah' terbuka lebar.",
        intonasi: "Garis melodi naik dengan dinamika kemenangan elegan, tidak berteriak namun megah.",
        ekspresi: "Wajah berseri-seri penuh anugerah, mata memandang luas ke seisi gereja dengan tatapan sukacita kemenangan.",
        penghayatan: "Rasakan keharuman minyak urapan suci di kepala dan cawan anggur berkat yang meluap di tangan Anda.",
        penampilan: "Postur sangat berwibawa, tangan terbuka sedikit mengisyaratkan penyambutan hidangan agung."
      },
      {
        number: 6,
        rawText: "Kebajikan dan kemurahan belaka akan mengikuti aku, / seumur hidupku; // dan aku akan diam dalam rumah TUHAN / sepanjang masa.",
        annotatedHtml: "Kebajikan dan kemurahan belaka akan mengikuti aku, <span class=\"breath-short\">/</span> <span class=\"stress-word\">seumur hidupku</span>; <span class=\"breath-long\">//</span> dan aku akan diam dalam <span class=\"stress-word\">rumah TUHAN</span> <span class=\"breath-short\">/</span> <span class=\"stress-word\">sepanjang masa</span>.",
        psikologiAyat: "Kepastian eskatologis: kediaman abadi dalam hadirat Allah yang tak berkesudahan; kepulangan ke rumah Bapa.",
        nadaBatin: "Damai abadi, keheningan kudus yang tuntas, rasa rindu rumah yang terpenuhi sempurna.",
        vokal: "Kembali ke mezzo-piano lembut namun bergema panjang, diakhiri dengan desah nafas kepuasan batin.",
        artikulasi: "Pengucapan 'sepanjang masa' dibuat lambat dan khidmat, biarkan bunyi konsonan 's' berdesis lembut dan tuntas.",
        intonasi: "Kadens penutup sempurna (final cadence); nada perlahan turun dengan khidmat menandakan kepastian yang tak tergoyahkan.",
        ekspresi: "Wajah memancarkan damai surgawi; tatapan mata terangkat sedikit ke arah salib/altar sebelum mengangguk hormat.",
        penghayatan: "Rasakan jiwa Anda telah tiba di rumah yang aman selamanya, tiada air mata, tiada ketakutan lagi.",
        penampilan: "Tetap hening di posisi tegak selama 2-3 detik setelah kata terakhir selesai, jangan terburu-buru melangkah pergi."
      }
    ]
  },
  {
    id: "mzm-14",
    title: "Mazmur 14 (TB2)",
    version: "TB2",
    subtitle: "Kebodohan orang fasik & sukacita pengharapan • Terjemahan Baru Edisi 2 (LAI)",
    refren: "TUHAN adalah tempat perlindungan bagi orang yang tertindas.",
    genre: "Mazmur Pengajaran & Peneguran Moral (Prophetic Wisdom & Hope)",
    category: "solemn",
    macroAnalysis: {
      psikologiGlobal: "Membaca Mazmur 14 membutuhkan transisi emosi yang jelas, bergerak dari nada teguran yang berat dan prihatin di awal menuju keyakinan serta sukacita pengharapan di akhir.",
      suasanaBatin: "Berat, prihatin, dan terhenyak oleh kebebalan moral di awal, lalu beralih menuju keyakinan kokoh bahwa Allah menyertai angkatan yang benar dan memuncak pada sorak-sorai sukacita keselamatan.",
      nadaBatinPembaca: "Tegas, penuh wibawa profetik, bernada dada rendah dan prihatin di awal, lalu berangsur hangat, mantap, dan akhirnya meledak dalam sukacita penuh harapan.",
      emotionalArc: "Ayat 1-3: Teguran berat & keprihatinan mendalam atas penyangkalan terhadap Tuhan -> Ayat 4: Gugatan retoris bertenaga -> Ayat 5-6: Kengerian orang fasik vs perlindungan TUHAN -> Ayat 7: Sukacita pengharapan dan sorak-sorai pemulihan umat.",
      fokusUtamaVAIEPP: "Vokal: Gunakan pernapasan diafragma agar suara bulat, stabil, dan beresonansi dari rongga dada, bukan suara tenggorokan yang tipis. Artikulasi: Buka mulut selebar minimal dua jari untuk vokal terbuka (a, o), serta pertegas konsonan letup (t, k, p, d, b) agar kata-kata seperti bebal, menilik, dan gemetar terdengar tajam sampai baris belakang. Penampilan: Berdiri tegak dengan tumpuan seimbang pada kedua kaki, pundak rileks, dan pegang teks setinggi dada agar pandangan tidak terus menunduk. Jaga kontak mata berkala dengan audiens pada setiap jeda kalimat."
    },
    contemplationGuide: "Tarik nafas diafragma dalam. Rasakan beratnya keprihatinan batin pemazmur atas dunia yang melupakan Allah. Hayati bahwa tugas lektor bukan memarahi umat, melainkan mewartakan kebenaran dengan wibawa kasih ilahi. Bersiaplah mengalirkan transisi emosi dari duka teguran menuju sukacita keselamatan Sion.",
    verses: [
      {
        number: 1,
        rawText: "Untuk pemimpin biduan. Dari Daud. // Orang bebal berkata dalam hatinya: / 'Tidak ada Allah.' // Busuk dan jijik perbuatan mereka, / tidak ada yang berbuat baik.",
        annotatedHtml: "Untuk pemimpin biduan. Dari Daud. <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> Orang <span class=\"stress-word\">bebal</span> berkata dalam hatinya: <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> '<span class=\"stress-word\">Tidak ada Allah</span>.' <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> <span class=\"stress-word\">Busuk</span> dan <span class=\"stress-word\">jijik</span> perbuatan mereka, <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> <span class=\"stress-word\">tidak ada</span> yang berbuat baik.",
        psikologiAyat: "Membaca Mazmur 14 membutuhkan transisi emosi yang jelas, bergerak dari nada teguran yang berat dan prihatin di awal menuju keyakinan serta sukacita pengharapan di akhir. Membuka realitas penyangkalan terhadap Tuhan yang membusukkan nurani dan perbuatan moral manusia.",
        nadaBatin: "Buka dengan nada formal dan tegas pada pengantar ('Untuk pemimpin biduan. Dari Daud.'). Masuk ke isi firman, turunkan nada menjadi lebih rendah, berat, dan sedikit ditekan.",
        vokal: "Gunakan pernapasan diafragma agar suara bulat, stabil, dan beresonansi dari rongga dada, bukan suara tenggorokan yang tipis.",
        artikulasi: "Buka mulut selebar minimal dua jari untuk vokal terbuka (a, o), serta pertegas konsonan letup (t, k, p, d, b) agar kata-kata seperti bebal, menilik, dan gemetar terdengar tajam sampai baris belakang.",
        intonasi: "Buka dengan nada formal dan tegas pada pengantar. Masuk ke isi firman, turunkan nada menjadi lebih rendah, berat, dan sedikit ditekan. Beri jeda sepersekian detik sebelum frasa 'Tidak ada Allah'. Tekan kata Busuk, jijik, dan tidak ada.",
        ekspresi: "Tatapan tajam, alis sedikit bertaut, mencerminkan rasa keprihatinan yang mendalam atas penyangkalan terhadap Tuhan.",
        penghayatan: "Mencerminkan rasa keprihatinan yang mendalam atas penyangkalan terhadap Tuhan. Rasakan kepedihan batin atas kebobrokan ketika manusia hidup tanpa takut akan Allah.",
        penampilan: "Berdiri tegak dengan tumpuan seimbang pada kedua kaki, pundak rileks, dan pegang teks setinggi dada agar pandangan tidak terus menunduk. Jaga kontak mata berkala dengan audiens pada setiap jeda kalimat.",
        phrasingData: [
          {
            text: "Untuk pemimpin biduan. Dari Daud.",
            delimiter: "//",
            syllabified: "Un-tuk pe-mim-pin bi-du-an. Da-ri Da-ud.",
            pitchType: "datar",
            pitchIcon: "→",
            pitchLabel: "Nada Datar-Formal (Pengantar Judul)",
            reason: "Bagian 1: Baca dengan nada formal, wajar, tidak terburu-buru, lalu beri jeda panjang (//) sebelum masuk ke inti teks mazmur."
          },
          {
            text: "Orang bebal berkata dalam hatinya:",
            delimiter: "/",
            syllabified: "O-rang be-bal ber-ka-ta da-lam ha-ti-nya:",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Merendah Berat & Tertahan",
            reason: "Bagian 2: Turunkan nada batin, gunakan vokal yang agak berat dan tertahan untuk menggambarkan keprihatinan. Jangan teriak. Berikan sedikit jeda sebelum mengucapkan kutipan berikutnya."
          },
          {
            text: "'Tidak ada Allah.'",
            delimiter: "//",
            syllabified: "'Ti-dak a-da Al-lah.'",
            pitchType: "turun-dingin",
            pitchIcon: "↘",
            pitchLabel: "Nada Dingin & Hampa (Penyangkalan)",
            reason: "Bagian 3: Tekankan kata 'Tidak ada' dengan nada dingin dan hampa, mencerminkan kekosongan rohani orang fasik."
          },
          {
            text: "Busuk dan jijik perbuatan mereka,",
            delimiter: "/",
            syllabified: "Bu-suk dan ji-jik per-bu-at-an me-re-ka,",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Menurun & Mantap (Kemuakan Moral)",
            reason: "Bagian 4: Gunakan artikulasi tajam pada konsonan /b/, /k/, /j/. Nada suara semakin menurun dan mantap, memperlihatkan kemuakan moral yang tenang tanpa emosi meledak-ledak."
          },
          {
            text: "tidak ada yang berbuat baik.",
            delimiter: ".",
            syllabified: "ti-dak a-da yang ber-bu-at ba-ik.",
            pitchType: "turun-tuntas",
            pitchIcon: "↘",
            pitchLabel: "Nada Final Merendah & Tegas",
            reason: "Bagian 5: Tutup dengan nada final yang merendah, berat, dan tegas. Jangan biarkan nada menggantung di akhir kalimat."
          }
        ]
      },
      {
        number: 2,
        rawText: "TUHAN memandang ke bawah dari surga kepada anak-anak manusia / untuk melihat apakah ada yang berakal budi / dan yang mencari Allah.",
        annotatedHtml: "<span class=\"stress-word\">TUHAN memandang</span> ke bawah dari surga kepada anak-anak manusia <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> untuk melihat apakah ada yang <span class=\"stress-word\">berakal budi</span> <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> dan yang <span class=\"stress-word\">mencari Allah</span>.",
        psikologiAyat: "Tatapan ilahi yang menyelidiki bumi; kesunyian kosmis penelusuran Allah yang mencari manusia beriman dan berakal budi.",
        nadaBatin: "Agung, meditatif, sarat keprihatinan tenang yang menyelidik hati sanubari pendengar.",
        vokal: "Mezzo-piano beresonansi dada, suara jernih bagai gema dari ketinggian surga.",
        artikulasi: "Buka vokal bundar pada 'surga', pertegas konsonan 'm' dan 'k' pada 'memandang' dan 'berakal budi'.",
        intonasi: "Nada naik melandai khidmat pada 'TUHAN memandang ke bawah dari surga', lalu menurun tenang meditatif pada 'dan yang mencari Allah'.",
        ekspresi: "Tatapan mata menatap lurus meluas ke depan seakan-akan merefleksikan pandangan Allah yang menilik umat.",
        penghayatan: "Biarkan hadirin merasakan tatapan suci Tuhan yang memeriksa sudut-sudut batin mereka.",
        penampilan: "Postur tegap berwibawa, tangan tenang memegang teks setinggi dada tanpa bergoyang.",
        phrasingData: [
          {
            text: "TUHAN memandang ke bawah dari surga kepada anak-anak manusia",
            delimiter: "/",
            syllabified: "TU-HAN me-man-dang ke ba-wah da-ri sur-ga ke-pa-da a-nak-a-nak ma-nu-si-a",
            pitchType: "naik",
            pitchIcon: "↗",
            pitchLabel: "Nada Naik Melandai Khidmat",
            reason: "Tatapan ilahi yang meluas dari ketinggian surga menilik seluruh anak-anak manusia."
          },
          {
            text: "untuk melihat apakah ada yang berakal budi",
            delimiter: "/",
            syllabified: "un-tuk me-li-hat a-pa-kah a-da yang ber-a-kal bu-di",
            pitchType: "datar",
            pitchIcon: "→",
            pitchLabel: "Nada Datar Menyelidik",
            reason: "Penelusuran tenang nan kudus, memeriksa hikmat dan kesadaran batin umat."
          },
          {
            text: "dan yang mencari Allah.",
            delimiter: ".",
            syllabified: "dan yang men-ca-ri Al-lah.",
            pitchType: "turun-tuntas",
            pitchIcon: "↘",
            pitchLabel: "Nada Merendah Khidmat Tuntas",
            reason: "Pencarian jiwa yang rindu akan Allah, ditutup dengan keheningan meditatif."
          }
        ]
      },
      {
        number: 3,
        rawText: "Mereka semua telah menyeleweng, // semuanya telah bejat; // tidak ada yang berbuat baik, / seorang pun tidak.",
        annotatedHtml: "Mereka semua telah <span class=\"stress-word\">menyeleweng</span>, <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> semuanya telah <span class=\"stress-word\">bejat</span>; <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> <span class=\"stress-word\">tidak ada</span> yang berbuat baik, <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> <span class=\"stress-word\">seorang pun tidak</span>.",
        psikologiAyat: "Puncak keprihatinan profetik atas kebobrokan universal; tiada satu pun manusia yang dapat memegahkan kesucian dirinya di hadapan Allah.",
        nadaBatin: "Sangat berat, penuh aksentuasi keprihatinan yang tuntas tanpa kompromi.",
        vokal: "Forte-piano terkontrol; volume suara dalam dan tebal bertumpu kuat pada diafragma bawah.",
        artikulasi: "Letupkan konsonan 't' pada 'bejat', serta artikulasikan bersih suku kata 'se-o-rang pun ti-dak'.",
        intonasi: "Turunkan nada lebih dalam pada 'semuanya telah bejat', dan kunci dengan kadens tuntas berwibawa pada 'seorang pun tidak'.",
        ekspresi: "Alis bertaut khidmat, tatapan lurus menyadarkan audiens akan realitas kerapuhan manusia.",
        penghayatan: "Hayati duka seorang hamba Tuhan yang menyaksikan kerapuhan moral dan perlunya rahmat ilahi.",
        penampilan: "Tetap berdiri tenang dan khusyuk tanpa gestur menuding; biarkan sabda firman yang berkuasa meresap.",
        phrasingData: [
          {
            text: "Mereka semua telah menyeleweng,",
            delimiter: "//",
            syllabified: "Me-re-ka se-mu-a te-lah me-nye-le-weng,",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Merendah Berat (Duka Profetik)",
            reason: "Keprihatinan mendalam atas kerapuhan moral manusia; aksen penekanan pada kata 'menyeleweng'."
          },
          {
            text: "semuanya telah bejat;",
            delimiter: "//",
            syllabified: "se-mu-a-nya te-lah be-jat;",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Ditekan Tajam (/b/, /j/, /t/)",
            reason: "Turunkan nada lebih dalam; artikulasikan konsonan letup 't' pada 'bejat' dengan tajam."
          },
          {
            text: "tidak ada yang berbuat baik,",
            delimiter: "/",
            syllabified: "ti-dak a-da yang ber-bu-at ba-ik,",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Berat Tertahan",
            reason: "Penegasan kesadaran diri; tiada yang dapat memegahkan kesucian dirinya di hadapan Allah."
          },
          {
            text: "seorang pun tidak.",
            delimiter: ".",
            syllabified: "se-o-rang pun ti-dak.",
            pitchType: "turun-tuntas",
            pitchIcon: "↘",
            pitchLabel: "Kadens Tuntas Tanpa Kompromi",
            reason: "Kunci dengan kadens tuntas berwibawa di akhir kalimat."
          }
        ]
      },
      {
        number: 4,
        rawText: "Tidak sadarkah semua orang yang melakukan kejahatan, / yang memakan habis umat-Ku seperti memakan roti, // dan yang tidak berseru kepada TUHAN?",
        annotatedHtml: "<span class=\"stress-word\">Tidak sadarkah</span> semua orang yang melakukan kejahatan, <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> yang memakan habis umat-Ku seperti <span class=\"stress-word\">memakan roti</span>, <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> dan yang <span class=\"stress-word\">tidak berseru</span> kepada TUHAN?",
        psikologiAyat: "Gugatan keadilan Allah; pembelaan tegas terhadap kaum lemah dan tertindas dari keserakahan orang jahat.",
        nadaBatin: "Menggugat, bertenaga profetik, membangkitkan nurani yang tertidur lelap.",
        vokal: "Crescendo bertenaga, proyeksi suara tegas terarah menembus ruang ibadah.",
        artikulasi: "Pertegas konsonan letup 't-d-k' pada 'tidak sadarkah' dan 'm-m-k-n' pada 'memakan roti'.",
        intonasi: "Nada tanya reflektif yang meninggi di akhir frasa (↗ Nada Naik), menggugah permenungan jemaat.",
        ekspresi: "Mata terbuka tegas, sorot pandang menembus sekeliling ruang mimbar dengan keberanian kebenaran.",
        penghayatan: "Rasakan api keadilan Tuhan yang bangkit membela kaum papa dan tertindas.",
        penampilan: "Dada terangkat mantap, tubuh condong sedikit ke depan memancarkan wibawa pembawa warta.",
        phrasingData: [
          {
            text: "Tidak sadarkah semua orang yang melakukan kejahatan,",
            delimiter: "/",
            syllabified: "Ti-dak sa-dar-kah se-mu-a o-rang yang me-la-ku-kan ke-ja-ha-tan,",
            pitchType: "pertanyaan",
            pitchIcon: "↗",
            pitchLabel: "Nada Tanya Menggugat Nurani",
            reason: "Gugatan profetik keadilan Allah; intonasi meninggi pada suku kata akhir untuk membangunkan nurani."
          },
          {
            text: "yang memakan habis umat-Ku seperti memakan roti,",
            delimiter: "//",
            syllabified: "yang me-ma-kan ha-bis u-mat-Ku se-per-ti me-ma-kan ro-ti,",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Menekan Tegas (Pembelaan Kaum Lemah)",
            reason: "Kecaman tajam terhadap penindasan kaum lemah; jeda hening // sebelum gugatan terakhir."
          },
          {
            text: "dan yang tidak berseru kepada TUHAN?",
            delimiter: "?",
            syllabified: "dan yang ti-dak ber-se-ru ke-pa-da TU-HAN?",
            pitchType: "pertanyaan",
            pitchIcon: "↗",
            pitchLabel: "Infleksi Tanya Reflektif Mengangkat",
            reason: "Infleksi nada meninggi menggantung di akhir ayat untuk menggugah permenungan jemaat."
          }
        ]
      },
      {
        number: 5,
        rawText: "Di sanalah mereka sangat terkejut gemetar, // karena Allah menyertai angkatan yang benar.",
        annotatedHtml: "Di sanalah mereka <span class=\"stress-word\">sangat terkejut gemetar</span>, <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> karena <span class=\"stress-word\">Allah menyertai</span> angkatan yang benar.",
        psikologiAyat: "Titik balik emosional: kengerian orang fasik ketika menyadari bahwa Allah yang hidup hadir membela orang beriman.",
        nadaBatin: "Penuh getaran kengerian di paruh awal, berganti ketenteraman agung dan perlindungan di paruh kedua.",
        vokal: "Vokal intens pada 'terkejut gemetar', lalu melembut penuh wibawa pada 'Allah menyertai'.",
        artikulasi: "Gigit tajam konsonan letup 'g' dan 't' pada kata 'ge-me-tar', lalu haluskan pada 'me-nyer-ta-i'.",
        intonasi: "Kontras melodi: ayunan tinggi pada 'terkejut', lalu turun hangat dan kokoh pada 'Allah menyertai angkatan yang benar'.",
        ekspresi: "Peralihan ekspresi wajah dari tegang kaget menuju teduh beriman penuh keyakinan.",
        penghayatan: "Rasakan bagaimana kepalsuan duniawi runtuh seketika saat hadirat kekudusan Allah dinyatakan.",
        penampilan: "Jeda hening 1-2 detik di tengah tanda // dengan pandangan mata tenang kepada audiens.",
        phrasingData: [
          {
            text: "Di sanalah mereka sangat terkejut gemetar,",
            delimiter: "//",
            syllabified: "Di sa-na-lah me-re-ka sa-ngat ter-ke-jut ge-me-tar,",
            pitchType: "naik",
            pitchIcon: "↗",
            pitchLabel: "Nada Mengayun Keterkejutan (Gemetar)",
            reason: "Getaran keterkejutan orang fasik yang menyadari bahwa kepalsuan duniawi runtuh seketika."
          },
          {
            text: "karena Allah menyertai angkatan yang benar.",
            delimiter: ".",
            syllabified: "ka-re-na Al-lah me-nyer-ta-i ang-ka-tan yang be-nar.",
            pitchType: "turun",
            pitchIcon: "↘",
            pitchLabel: "Nada Hangat & Perlindungan Kokoh",
            reason: "Titik balik emosional: ketenteraman agung dan perlindungan kokoh Allah bagi kaum beriman."
          }
        ]
      },
      {
        number: 6,
        rawText: "Kamu hendak mempermalukan rancangan orang yang tertindas, // tetapi TUHAN adalah tempat perlindungannya.",
        annotatedHtml: "Kamu hendak <span class=\"stress-word\">mempermalukan rancangan</span> orang yang tertindas, <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> tetapi <span class=\"stress-word\">TUHAN adalah tempat perlindungannya</span>.",
        psikologiAyat: "Kepastian kemenangan iman; kontras tajam antara niat jahat dunia dengan benteng perlindungan TUHAN yang kokoh.",
        nadaBatin: "Tegas menepis cemoohan, lalu penuh kebanggaan kudus atas perlindungan Allah.",
        vokal: "Transisi vokal dari nada minor peneguran menuju resonansi nada mayor kemenangan iman.",
        artikulasi: "Ucapkan 'per-lin-dung-an-nya' dengan ketukan ritmis artikulatif yang berbobot.",
        intonasi: "Kadens mengangkat pada 'tetapi TUHAN', lalu melandai mantap tuntas pada 'tempat perlindungannya'.",
        ekspresi: "Dahi terbuka lapang, senyum kemenangan iman yang tenang merekah di bibir.",
        penghayatan: "Hayati bahwa orang lemah yang bersandar pada Tuhan memiliki perlindungan terkuat di alam semesta.",
        penampilan: "Punggung lurus kokoh bagai benteng pertahanan yang tak tergoyahkan.",
        phrasingData: [
          {
            text: "Kamu hendak mempermalukan rancangan orang yang tertindas,",
            delimiter: "//",
            syllabified: "Ka-mu hen-dak mem-per-ma-lu-kan ran-cang-an o-rang yang ter-tin-das,",
            pitchType: "turun-berat",
            pitchIcon: "↘",
            pitchLabel: "Nada Tegas Menepis Cemoohan",
            reason: "Menepis cemoohan duniawi dengan wibawa kebenaran sabda."
          },
          {
            text: "tetapi TUHAN adalah tempat perlindungannya.",
            delimiter: ".",
            syllabified: "te-ta-pi TU-HAN a-da-lah tem-pat per-lin-dung-an-nya.",
            pitchType: "turun-tuntas",
            pitchIcon: "↘",
            pitchLabel: "Kadens Kemenangan Iman Kokoh",
            reason: "Ditutup dengan keyakinan kokoh bahwa TUHAN adalah benteng pertahanan yang tak terkalahkan."
          }
        ]
      },
      {
        number: 7,
        rawText: "Ya, kiranya dari Sion datang keselamatan bagi Israel! // Apabila TUHAN memulihkan keadaan umat-Nya, / Yakub akan bersorak-sorak, / Israel akan bersukacita.",
        annotatedHtml: "Ya, kiranya dari Sion datang <span class=\"stress-word\">keselamatan bagi Israel</span>! <span class=\"breath-long\" title=\"Jeda hening panjang (Caesura)\">//</span> Apabila <span class=\"stress-word\">TUHAN memulihkan</span> keadaan umat-Nya, <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> Yakub akan <span class=\"stress-word\">bersorak-sorak</span>, <span class=\"breath-short\" title=\"Jeda nafas pendek\">/</span> Israel akan <span class=\"stress-word\">bersukacita</span>.",
        psikologiAyat: "Transisi paripurna menuju puncak sukacita pengharapan; pemulihan keadaan umat dan perayaan keselamatan abadi.",
        nadaBatin: "Penuh kerinduan mesianik yang meledak menjadi sorak-sorai sukacita kemenangan keselamatan yang melimpah.",
        vokal: "Forte hangat, penuh warna suara cemerlang (sonorous & uplifting), nafas diafragma terisi penuh dengan sukacita.",
        artikulasi: "Lepaskan kata 'bersorak-sorak' dan 'bersukacita' dengan vokal terbuka cerah dan senyum bibir yang merekah.",
        intonasi: "Melodi melambung cerah ke nada atas (↗ Nada Naik Sorak Kemenangan), tempo mengalir anggun dan bersemangat.",
        ekspresi: "Wajah berseri-seri penuh sukacita iman, tatapan mata berbinar memancarkan pengharapan bagi seluruh hadirin.",
        penghayatan: "Lepaskan seluruh duka dan teguran di ayat 1; hayati betapa agungnya keselamatan ketika Tuhan memulihkan umat-Nya.",
        penampilan: "Berdiri tegak mulia, tahan keheningan penuh senyum damai selama 2-3 detik setelah kata terakhir sebelum membungkuk hormat ke arah altar.",
        phrasingData: [
          {
            text: "Ya, kiranya dari Sion datang keselamatan bagi Israel!",
            delimiter: "//",
            syllabified: "Ya, ki-ra-nya da-ri Si-on da-tang ke-se-la-mat-an ba-gi Is-ra-el!",
            pitchType: "naik-sorak",
            pitchIcon: "↗",
            pitchLabel: "Melambung Kerinduan Mesianik",
            reason: "Kerinduan mendalam yang memancar menuju kedatangan fajar keselamatan Allah."
          },
          {
            text: "Apabila TUHAN memulihkan keadaan umat-Nya,",
            delimiter: "/",
            syllabified: "A-pa-bi-la TU-HAN me-mu-lih-kan ke-a-da-an u-mat-Nya,",
            pitchType: "naik",
            pitchIcon: "↗",
            pitchLabel: "Nada Naik Pengharapan Fajar",
            reason: "Kepastian janji pemulihan keadaan umat yang telah dinanti-nantikan."
          },
          {
            text: "Yakub akan bersorak-sorak,",
            delimiter: "/",
            syllabified: "Ya-kub a-kan ber-so-rak-so-rak,",
            pitchType: "naik-sorak",
            pitchIcon: "↗",
            pitchLabel: "Melambung Tinggi Sorak Kemenangan",
            reason: "Vokal terbuka cerah (a, o) melepaskan sukacita perayaan kemenangan keselamatan iman."
          },
          {
            text: "Israel akan bersukacita.",
            delimiter: ".",
            syllabified: "Is-ra-el a-kan ber-su-ka-ci-ta.",
            pitchType: "turun-tuntas",
            pitchIcon: "↘",
            pitchLabel: "Kadens Sukacita Sempurna Tuntas",
            reason: "Puncak emosi: tutup dengan senyum damai kemenangan iman dan keselamatan abadi."
          }
        ]
      }
    ]
  },
  {
    id: "mzm-51",
    title: "Mazmur 51 (TB2)",
    version: "TB2",
    subtitle: "Miserere Mei - Pengakuan Dosa & Hati Remuk • Terjemahan Baru Edisi 2 (LAI)",
    refren: "Kasihanilah aku, ya Allah, menurut kasih setia-Mu.",
    genre: "Mazmur Pertobatan & Remuk Hati (Penitential & Contrition)",
    category: "repentance",
    macroAnalysis: {
      psikologiGlobal: "Kehancuran ego total di hadapan kekudusan Allah. Teks TB2 menekankan kesadaran diri yang jujur ('Sebab aku menyadari pelanggaranku, dan dosaku senantiasa ada di hadapanku'). Jiwa memohon pembaharuan roh yang teguh dan kegirangan keselamatan sejati.",
      suasanaBatin: "Getaran duka mendalam, penyesalan suci, keheningan kamar pengakuan, kerinduan akan pengampunan ilahi.",
      nadaBatinPembaca: "Berbisik pilu, rendah, rendah hati, tidak menghakimi, menempatkan diri sebagai pendosa yang paling memohon belas kasih.",
      emotionalArc: "Dari jeritan minta ampun di jurang dosa -> pengakuan ketidakberdayaan diri -> permohonan hati yang tahir -> pemulihan sukacita keselamatan.",
      fokusUtamaVAIEPP: "Vokal bernada rendah (low register), nafas hembusan lebih panjang, ekspresi wajah tunduk remuk hati, dan jeda hening yang sarat air mata batin."
    },
    contemplationGuide: "Tarik nafas perlahan... saat menghembuskannya, bayangkan Anda menanggalkan segala kebanggaan, topeng kesalehan, dan kepalsuan diri. Rasakan kerapuhan manusiawi Anda. Di hadapan Tuhan yang Mahakudus, kita hanya membawa hati yang hancur dan remuk, yang takkan pernah ditolak-Nya.",
    verses: [
      {
        number: 3,
        rawText: "Kasihanilah aku, ya Allah, / menurut kasih setia-Mu, // hapuskanlah pelanggaranku / menurut rahmat-Mu yang besar!",
        annotatedHtml: "<span class=\"stress-word\">Kasihanilah aku</span>, ya Allah, <span class=\"breath-short\">/</span> menurut <span class=\"stress-word\">kasih setia-Mu</span>, <span class=\"breath-long\">//</span> hapuskanlah pelanggaranku <span class=\"breath-short\">/</span> menurut <span class=\"stress-word\">rahmat-Mu yang besar</span>!",
        psikologiAyat: "Penomoran TB2 ayat 3: Jeritan jiwa yang tertikam rasa bersalah; satu-satunya pegangan adalah kasih setia (chesed) Allah.",
        nadaBatin: "Memohon dengan lutut jiwa yang berlutut, suara bergetar tertahan dari rongga dada bawah.",
        vokal: "Mezzo-piano bertekstur nafas (breathy), volume rendah namun berfokus tajam.",
        artikulasi: "Pengucapan 'Kasihanilah' diawali konsonan 'K' lembut, vokal 'a-u' terbuka dengan getaran permohonan.",
        intonasi: "Infleksi meratap ke bawah (falling lamenting contour), jeda hening (//) diisi hembusan nafas yang terdengar samar.",
        ekspresi: "Dahi sedikit berkerut duka, kelopak mata agak merunduk, tatapan memohon ke arah lantai atau salib.",
        penghayatan: "Rasakan diri Anda berdiri di hadapan terang ilahi, menyadari betapa perlunya Anda akan pengampunan.",
        penampilan: "Kepala sedikit merunduk takzim, pundak santai tanpa kesombongan, berdiri dengan kerendahan hati murni."
      },
      {
        number: 4,
        rawText: "Bersihkanlah aku seluruhnya dari kesalahanku, / dan tahirkanlah aku dari dosaku! // Sebab aku menyadari pelanggaranku, / dan dosaku senantiasa ada di hadapanku.",
        annotatedHtml: "<span class=\"stress-word\">Bersihkanlah aku seluruhnya</span> dari kesalahanku, <span class=\"breath-short\">/</span> dan <span class=\"stress-word\">tahirkanlah aku</span> dari dosaku! <span class=\"breath-long\">//</span> Sebab aku <span class=\"stress-word\">menyadari pelanggaranku</span>, <span class=\"breath-short\">/</span> dan dosaku senantiasa ada di hadapanku.",
        psikologiAyat: "Formulasi TB2: 'Sebab aku menyadari pelanggaranku'. Kejujuran batin tanpa dalih; mengakui borok batin yang tak dapat disembunyikan lagi dari nurani.",
        nadaBatin: "Pedih, tulus, tanpa pembelaan diri.",
        vokal: "Pianissimo ke mezzo-piano, tempo lambat terukur.",
        artikulasi: "Tegaskan kata 'tahirkanlah' (artikulasi konsonan t-h-r yang bersih menandakan kerinduan akan kesucian).",
        intonasi: "Tekanan permohonan yang ditekan ke dalam (inward intensity), nada datar menunduk pada 'senantiasa ada di hadapanku'.",
        ekspresi: "Mata redup penuh perenungan batin, bibir tidak tegang namun khusyuk.",
        penghayatan: "Rasakan kotornya noda egoisme Anda yang memohon basuhan air suci pengampunan ilahi.",
        penampilan: "Tangan bertumpu stabil di ambon, tidak bergerak gelisah."
      },
      {
        number: 12,
        rawText: "Jadikanlah hatiku tahir, ya Allah, / dan perbaharuilah batinku dengan roh yang teguh! // Janganlah membuang aku dari hadapan-Mu, / dan janganlah mengambil Roh-Mu yang kudus dari padaku!",
        annotatedHtml: "Jadikanlah <span class=\"stress-word\">hatiku tahir</span>, ya Allah, <span class=\"breath-short\">/</span> dan perbaharuilah batinku dengan <span class=\"stress-word\">roh yang teguh</span>! <span class=\"breath-long\">//</span> <span class=\"stress-word\">Janganlah membuang aku</span> dari hadapan-Mu, <span class=\"breath-short\">/</span> dan janganlah mengambil Roh-Mu yang kudus dari padaku!",
        psikologiAyat: "Penomoran TB2 ayat 12: Ketakutan terbesar jiwa orang beriman: terbuang dari hadirat Tuhan dan kehilangan Roh Kudus.",
        nadaBatin: "Mendesak dengan cinta yang pilu; permohonan hidup-mati spiritual.",
        vokal: "Volume meningkat ke mezzo-forte bergetar, intensitas emosi memuncak pada frasa 'Janganlah membuang aku'.",
        artikulasi: "Serukan kata 'hatiku tahir' dengan vokal bersih. Letupkan konsonan 'J' pada 'Janganlah'.",
        intonasi: "Kadens permohonan meninggi di tengah lalu menurun haru di akhir kalimat.",
        ekspresi: "Pandangan mata terangkat langsung memandang salib Kristus dengan tatapan kerinduan mendalam.",
        penghayatan: "Rasakan betapa hancurnya hidup jika terpisah dari kasih Allah, peluk hadirat-Nya dengan segenap tenaga batin.",
        penampilan: "Tubuh condong sedikit ke depan (postur mendekat memohon), nafas dalam dan terkontrol."
      },
      {
        number: 14,
        rawText: "Kembalikanlah kepadaku kegirangan karena keselamatan-Mu, / dan topanglah aku dengan roh yang rela! // Kurban sembelihan kepada Allah ialah jiwa yang hancur; / hati yang patah dan remuk tidak akan Kaupandang hina, ya Allah.",
        annotatedHtml: "<span class=\"stress-word\">Kembalikanlah kepadaku</span> kegirangan karena keselamatan-Mu, <span class=\"breath-short\">/</span> dan <span class=\"stress-word\">topanglah aku</span> dengan roh yang rela! <span class=\"breath-long\">//</span> Kurban sembelihan kepada Allah ialah <span class=\"stress-word\">jiwa yang hancur</span>; <span class=\"breath-short\">/</span> <span class=\"stress-word\">hati yang patah dan remuk</span> tidak akan Kaupandang hina, ya Allah.",
        psikologiAyat: "Formulasi TB2: 'Kembalikanlah kepadaku kegirangan karena keselamatan-Mu, dan topanglah aku'. Menemukan damai dalam hati yang remuk yang disambut oleh belas kasih Allah.",
        nadaBatin: "Lega, penuh pengharapan fajar, keharuan kudus yang menyembuhkan luka batin.",
        vokal: "Mezzo-piano hangat, resonansi dada bercampur kepala, tempo tenang meneduhkan.",
        artikulasi: "Pengucapan lambat dan penuh bobot pada kata 'hati yang patah dan remuk'.",
        intonasi: "Turun dengan kelembutan kasih pada frasa 'tidak akan Kaupandang hina, ya Allah'.",
        ekspresi: "Sorot mata kembali memancarkan kehangatan dan kelegaan, raut wajah mekar dalam rasa syukur.",
        penghayatan: "Rasakan pelukan Bapa yang menyambut anak yang hilang, air mata kesedihan berganti air mata kelegaan.",
        penampilan: "Hening sejenak di akhir pembacaan, kepala menunduk hormat dengan tenang sebelum kembali ke tempat duduk."
      }
    ]
  },
  {
    id: "mzm-100",
    title: "Mazmur 100 (TB2)",
    version: "TB2",
    subtitle: "Pujilah TUHAN di dalam Bait-Nya • Terjemahan Baru Edisi 2 (LAI)",
    refren: "Bersorak-sorailah bagi TUHAN, hai seluruh bumi!",
    genre: "Himne Sukacita & Pujian Agung (Exultant Hymn & Praise)",
    category: "praise",
    macroAnalysis: {
      psikologiGlobal: "Ledakan sukacita kosmis dan perayaan syukur tanpa batas. Teks TB2 mempertegas panggilan masuk gerbang dan pelataran kudus dengan puji-pujian, menyadari bahwa TUHANlah Allah yang setia sepanjang zaman.",
      suasanaBatin: "Gempita terompet, arak-arakan kemenangan, riuh pesta keselamatan, dan senyuman lebar.",
      nadaBatinPembaca: "Bersemangat, cerah, sonorous, bervolume kuat (forte), antusias mengundang seluruh jemaat ikut bersukacita.",
      emotionalArc: "Dimulai dari seruan sorak-sorai terbuka -> ajakan masuk gerbang bait Allah dengan nyanyian -> penegasan abadi bahwa Tuhan itu baik sepanjang masa.",
      fokusUtamaVAIEPP: "Proyeksi vokal diafragma yang kokoh, artikulasi konsonan tajam dan energetik, mata berbinar-binar mengajak umat terlibat aktif."
    },
    contemplationGuide: "Tersenyumlah selebar mungkin dalam batin Anda. Rasakan denyut jantung yang penuh rasa syukur. Hari ini adalah hari kemenangan! Anda bukanlah pembawa kabar duka, melainkan bentara raja yang membawa warta sukacita terbesar bagi dunia.",
    verses: [
      {
        number: 1,
        rawText: "Bersorak-sorailah bagi TUHAN, / hai seluruh bumi! // Beribadahlah kepada TUHAN dengan sukacita, / datanglah ke hadapan-Nya dengan sorak-sorai!",
        annotatedHtml: "<span class=\"stress-word\">Bersorak-sorailah</span> bagi TUHAN, <span class=\"breath-short\">/</span> hai <span class=\"stress-word\">seluruh bumi</span>! <span class=\"breath-long\">//</span> Beribadahlah kepada TUHAN dengan <span class=\"stress-word\">sukacita</span>, <span class=\"breath-short\">/</span> datanglah ke hadapan-Nya dengan <span class=\"stress-word\">sorak-sorai</span>!",
        psikologiAyat: "Deklarasi seruan agung yang menggugah dunia dari kantuk rohani.",
        nadaBatin: "Antusias, berapi-api, penuh energi kemenangan yang menular.",
        vokal: "Forte (terbuka dan bulat), resonansi kepala dan dada seimbang, tidak serak.",
        artikulasi: "Gigit konsonan 'B-S-T' dengan energetik ('Bersorak-sorailah'). Hindari suara mendesah loyo.",
        intonasi: "Melodi naik dinamis (fanfare cadence), tempo cepat-sedang (allegro con brio).",
        ekspresi: "Mata terbuka lebar bersinar, senyum sukacita alami, alis sedikit terangkat antusias.",
        penghayatan: "Rasakan getaran sukacita seisi alam semesta menyambut Rajanya.",
        penampilan: "Dada membusung percaya diri, pandangan mata menyapu seluruh balkon dan penjuru gereja."
      },
      {
        number: 2,
        rawText: "Ketahuilah, bahwa TUHANlah Allah; / Dialah yang menjadikan kita dan punya Dialah kita, // umat-Nya dan kawanan domba gembalaan-Nya.",
        annotatedHtml: "<span class=\"stress-word\">Ketahuilah</span>, bahwa <span class=\"stress-word\">TUHANlah Allah</span>; <span class=\"breath-short\">/</span> <span class=\"stress-word\">Dialah yang menjadikan kita</span> dan punya Dialah kita, <span class=\"breath-long\">//</span> umat-Nya dan kawanan domba gembalaan-Nya.",
        psikologiAyat: "Kesadaran identitas suci TB2: 'TUHANlah Allah; Dialah yang menjadikan kita dan punya Dialah kita'. Kita adalah milik pusaka-Nya.",
        nadaBatin: "Penuh wibawa kepastian iman, bangga menjadi milik Allah.",
        vokal: "Mezzo-forte mantap, tempo sedikit melambat untuk memberi bobot teologis.",
        artikulasi: "Ucapkan 'Dialah yang menjadikan kita' dengan artikulasi bulat dan berbobot.",
        intonasi: "Aksen tegas pada suku kata awal 'TUHANlah Allah', diikuti nada bersyukur pada 'kawanan domba'.",
        ekspresi: "Tatapan mantap, mengangguk lembut memberi penegasan keyakinan kepada jemaat.",
        penghayatan: "Rasakan kebanggaan dan kehormatan tiada tara bahwa Anda diciptakan dan dikasihi oleh Allah sendiri.",
        penampilan: "Postur sangat kokoh, tangan tidak gelisah, tatapan terarah mantap."
      },
      {
        number: 3,
        rawText: "Masuklah melalui gerbang-Nya dengan nyanyian syukur, / ke dalam pelataran-Nya dengan puji-pujian, // bersyukurlah kepada-Nya dan pujilah nama-Nya! // Sebab TUHAN itu baik, / kasih setia-Nya untuk selama-lamanya, / dan kesetiaan-Nya turun-temurun.",
        annotatedHtml: "Masuklah melalui <span class=\"stress-word\">gerbang-Nya dengan nyanyian syukur</span>, <span class=\"breath-short\">/</span> ke dalam pelataran-Nya dengan <span class=\"stress-word\">puji-pujian</span>, <span class=\"breath-long\">//</span> bersyukurlah kepada-Nya dan <span class=\"stress-word\">pujilah nama-Nya</span>! <span class=\"breath-long\">//</span> Sebab <span class=\"stress-word\">TUHAN itu baik</span>, <span class=\"breath-short\">/</span> kasih setia-Nya untuk <span class=\"stress-word\">selama-lamanya</span>, <span class=\"breath-short\">/</span> dan kesetiaan-Nya turun-temurun.",
        psikologiAyat: "Puncak arak-arakan kemenangan liturgis TB2: 'Masuklah melalui gerbang-Nya dengan nyanyian syukur'. Doksologi abadi bahwa kebaikan Tuhan melampaui zaman.",
        nadaBatin: "Agung, megah, hangat, penuh sukacita kekal.",
        vokal: "Forte agung (sonorous), vokal panjang dan kaya di akhir frasa.",
        artikulasi: "Pengucapan 'selama-lamanya' dibuat panjang dan beresonansi penuh.",
        intonasi: "Kadens megah beruntun, diakhiri penegasan penuh wibawa pada 'turun-temurun'.",
        ekspresi: "Wajah memancarkan kemegahan ilahi, senyum penuh anugerah dan kepuasan batin.",
        penghayatan: "Rasakan Anda sedang memimpin jutaan orang suci memasuki istana surga.",
        penampilan: "Tubuh tegak menjulang, memberi kesan agung seorang pembawa firman kerajaan."
      }
    ]
  },
  {
    id: "mzm-130",
    title: "Mazmur 130 (TB2)",
    version: "TB2",
    subtitle: "Seruan dari Jurang yang Dalam • Terjemahan Baru Edisi 2 (LAI)",
    refren: "Dari jurang yang dalam aku berseru kepada-Mu, ya TUHAN.",
    genre: "Ratapan Eksistensial & Penantian Fajar (Existential Lament & Hope)",
    category: "lament",
    macroAnalysis: {
      psikologiGlobal: "Kondisi terdesak di tubir kehampaan hidup, di mana manusia berseru dari titik nadir eksistensinya. Teks TB2: 'Jika Engkau memperhitungkan kesalahan-kesalahan, Tuhan, siapakah yang dapat bertahan? Namun pada-Mu ada pengampunan'. Fajar pengharapan merekah di ufuk timur.",
      suasanaBatin: "Malam gulita, sunyi sepi, debaran dada yang sesak, lalu fajar pengharapan yang mulai merekah.",
      nadaBatinPembaca: "Dalam, serak tertahan, intens, tidak panik melainkan berseru dari kedalaman rongga dada terdalam.",
      emotionalArc: "Dari jeritan jurang yang kelam -> hening menanti fajar -> proklamasi pengharapan penebusan berlimpah.",
      fokusUtamaVAIEPP: "Pengendalian jeda nafas panjang (caesura), intonasi mendalam dari nada rendah ke nada menaik berpengharapan."
    },
    contemplationGuide: "Tenggelamkan diri Anda dalam keheningan total. Rasakan jika Anda berada di dasar jurang yang paling gelap. Satu-satunya pandangan Anda hanyalah mendongak ke atas, menanti berkas cahaya pertama dari fajar anugerah Tuhan.",
    verses: [
      {
        number: 1,
        rawText: "Dari jurang yang dalam aku berseru kepada-Mu, ya TUHAN! // Tuhan, dengarkanlah suaraku! / Biarlah telinga-Mu menaruh perhatian / pada suara permohonanku.",
        annotatedHtml: "Dari <span class=\"stress-word\">jurang yang dalam</span> aku berseru kepada-Mu, ya TUHAN! <span class=\"breath-long\">//</span> Tuhan, <span class=\"stress-word\">dengarkanlah suaraku</span>! <span class=\"breath-short\">/</span> Biarlah telinga-Mu menaruh perhatian <span class=\"breath-short\">/</span> pada suara permohonanku.",
        psikologiAyat: "Jeritan putus asa yang berbalik menjadi seruan iman dari jurang penderitaan.",
        nadaBatin: "Mencekam, berat, tertekan namun bertenaga jiwa yang besar.",
        vokal: "Mezzo-forte di register dada bawah, nada rendah bergaung.",
        artikulasi: "Pengucapan 'jurang yang dalam' dengan vokal 'u-a' berat dan dalam.",
        intonasi: "Mulai dari nada sangat rendah, melonjak pada 'Tuhan, dengarkanlah suaraku!'.",
        ekspresi: "Dahi berkerut prihatin, mata mendongak ke atas dengan intensitas tinggi.",
        penghayatan: "Rasakan tekanan beban hidup yang begitu menghimpit dada Anda.",
        penampilan: "Tegak dengan berat badan tertumpu seimbang, menahan getaran emosional dengan disiplin tubuh."
      },
      {
        number: 2,
        rawText: "Jika Engkau, ya TUHAN, memperhitungkan kesalahan-kesalahan, / Tuhan, siapakah yang dapat bertahan? // Namun pada-Mu ada pengampunan, / supaya Engkau ditakuti orang.",
        annotatedHtml: "Jika Engkau, ya TUHAN, <span class=\"stress-word\">memperhitungkan kesalahan-kesalahan</span>, <span class=\"breath-short\">/</span> Tuhan, <span class=\"stress-word\">siapakah yang dapat bertahan</span>? <span class=\"breath-long\">//</span> Namun pada-Mu <span class=\"stress-word\">ada pengampunan</span>, <span class=\"breath-short\">/</span> supaya Engkau ditakuti orang.",
        psikologiAyat: "Pilihan kata TB2: 'memperhitungkan kesalahan-kesalahan... siapakah yang dapat bertahan? Namun pada-Mu ada pengampunan'. Pembalikan kesadaran dari putus asa menjadi damai anugerah.",
        nadaBatin: "Gentar suci bercampur kelegaan yang menggetarkan.",
        vokal: "Mezzo-piano lembut dan jernih pada kata 'Namun pada-Mu ada pengampunan'.",
        artikulasi: "Konsonan 'p-ng' pada 'pengampunan' diucapkan dengan kelembutan suci.",
        intonasi: "Menurun hening pada pertanyaan retoris, lalu bangkit cerah pada 'ada pengampunan'.",
        ekspresi: "Wajah melunak dari ketegangan sebelumnya, mata memancarkan kekaguman.",
        penghayatan: "Rasakan hembusan angin segar pengampunan yang membasuh jiwa yang terkekang.",
        penampilan: "Bahu mengendur relaks, postur tetap teguh dan anggun."
      },
      {
        number: 3,
        rawText: "Aku menanti-nantikan TUHAN, / jiwaku menanti-nanti, // dan aku berharap pada firman-Nya. // Jiwaku mengharapkan Tuhan / lebih dari pengawal mengharapkan fajar, / ya, lebih dari pengawal mengharapkan fajar.",
        annotatedHtml: "Aku <span class=\"stress-word\">menanti-nantikan TUHAN</span>, <span class=\"breath-short\">/</span> jiwaku menanti-nanti, <span class=\"breath-long\">//</span> dan aku <span class=\"stress-word\">berharap pada firman-Nya</span>. <span class=\"breath-long\">//</span> Jiwaku mengharapkan Tuhan <span class=\"breath-short\">/</span> lebih dari pengawal <span class=\"stress-word\">mengharapkan fajar</span>, <span class=\"breath-short\">/</span> ya, lebih dari pengawal mengharapkan fajar.",
        psikologiAyat: "Teks TB2: 'lebih dari pengawal mengharapkan fajar'. Kesabaran vigil: penantian penuh kerinduan fajar yang pasti terbit.",
        nadaBatin: "Rindu membara, hening yang sarat antisipasi kemenangan.",
        vokal: "Mezzo-piano berbisik jelas, pengulangan frasa kedua diucapkan lebih lembut lagi (echo effect).",
        artikulasi: "Pelankan tempo pada 'mengharapkan fajar', rasakan butir-butir katanya.",
        intonasi: "Garis nada menggantung lembut ke atas, menciptakan rasa rindu yang melayang indah.",
        ekspresi: "Mata menatap ke ufuk kejauhan dengan sinar pengharapan murni.",
        penghayatan: "Bayangkan prajurit jaga malam yang menggigil kedinginan, menanti semburat merah pertama fajar.",
        penampilan: "Sangat tenang, tiada gerak fisik yang tak perlu, memancarkan kesabaran doa."
      }
    ]
  },
  {
    id: "mzm-91",
    title: "Mazmur 91 (TB2)",
    version: "TB2",
    subtitle: "Aman dalam Naungan Yang Mahakuasa • Terjemahan Baru Edisi 2 (LAI)",
    refren: "TUHANlah tempat perlindunganku dan benteng pertahananku.",
    genre: "Mazmur Perlindungan & Iman Teguh (Protection & Steadfast Faith)",
    category: "trust",
    macroAnalysis: {
      psikologiGlobal: "Rasa aman perkasa bagai benteng batu karang yang tak tertembus badai panah. Teks TB2: 'Tempat perlindunganku dan benteng pertahananku, Allahku, yang kupercayai'. Keyakinan mutlak di bawah naungan Yang Mahakuasa.",
      suasanaBatin: "Kokoh, tenang di tengah kekacauan, teduh di bawah sayap naungan ilahi.",
      nadaBatinPembaca: "Berwibawa, mantap, tegas, menjadi benteng ketenangan bagi jemaat yang sedang bimbang atau cemas.",
      emotionalArc: "Pengakuan perlindungan benteng -> jaminan pemeliharaan dari panah dan jerat -> janji keselamatan ilahi.",
      fokusUtamaVAIEPP: "Resonansi dada berwibawa, artikulasi kokoh tanpa keraguan, tatapan mata yang menenangkan dan meneduhkan ketakutan jemaat."
    },
    contemplationGuide: "Rasakan kedua telapak kaki Anda berpijak kuat di atas bumi, bagai gunung batu karang. Bayangkan sayap kemuliaan Tuhan menaungi seluruh keberadaan Anda. Tidak ada senjata atau penyakit apa pun yang dapat memisahkan Anda dari kasih-Nya.",
    verses: [
      {
        number: 1,
        rawText: "Orang yang duduk dalam lindungan Yang Mahatinggi / dan bermalam dalam naungan Yang Mahakuasa // akan berkata kepada TUHAN: / \"Tempat perlindunganku dan benteng pertahananku, / Allahku, yang kupercayai.\"",
        annotatedHtml: "Orang yang duduk dalam <span class=\"stress-word\">lindungan Yang Mahatinggi</span> <span class=\"breath-short\">/</span> dan bermalam dalam naungan Yang Mahakuasa <span class=\"breath-long\">//</span> akan berkata kepada TUHAN: <span class=\"breath-short\">/</span> \"<span class=\"stress-word\">Tempat perlindunganku</span> dan benteng pertahananku, <span class=\"breath-short\">/</span> Allahku, <span class=\"stress-word\">yang kupercayai</span>.\"",
        psikologiAyat: "TB2: 'benteng pertahananku'. Kenyamanan batin di tempat perlindungan yang tak terguncangkan.",
        nadaBatin: "Wibawa damai, mantap, berakar dalam rasa aman ilahi.",
        vokal: "Mezzo-forte terukur, resonansi dada penuh wibawa, tempo sedang mantap.",
        artikulasi: "Pertegas gelar-gelar ilahi: 'Yang Mahatinggi', 'Yang Mahakuasa', 'Allahku'.",
        intonasi: "Kadens menurun dengan bobot wibawa pada kata 'yang kupercayai'.",
        ekspresi: "Tatapan tenang tak tergoyahkan, kepala tegak bermartabat.",
        penghayatan: "Rasakan diri Anda aman di dalam benteng paling kokoh di alam semesta.",
        penampilan: "Postur sangat stabil, tidak condong ke kiri atau kanan."
      },
      {
        number: 2,
        rawText: "Dengan kepak-Nya Ia akan menudungi engkau, / di bawah sayap-Nya engkau akan berlindung, // kesetiaan-Nya ialah perisai dan pagar tembok. // Engkau tidak usah takut pada kedahsyatan malam, / pada panah yang terbang di waktu siang.",
        annotatedHtml: "Dengan kepak-Nya Ia akan <span class=\"stress-word\">menudungi engkau</span>, <span class=\"breath-short\">/</span> di bawah sayap-Nya engkau akan berlindung, <span class=\"breath-long\">//</span> kesetiaan-Nya ialah <span class=\"stress-word\">perisai dan pagar tembok</span>. <span class=\"breath-long\">//</span> Engkau <span class=\"stress-word\">tidak usah takut</span> pada kedahsyatan malam, <span class=\"breath-short\">/</span> pada panah yang terbang di waktu siang.",
        psikologiAyat: "TB2: 'tidak usah takut pada kedahsyatan malam'. Kelembutan perlindungan induk rajawali yang siap menangkis segala serangan musuh.",
        nadaBatin: "Menenangkan, mengayomi, mengusir rasa takut jemaat.",
        vokal: "Mezzo-piano pada 'menudungi engkau', lalu tegas meyakinkan pada 'tidak usah takut'.",
        artikulasi: "Jelaskan kata 'perisai dan pagar tembok' bagai dentang baja pertahanan.",
        intonasi: "Melodi meneduhkan di paruh awal, lalu memancarkan ketegasan perlindungan.",
        ekspresi: "Mata menatap langsung ke jemaat dengan pandangan menguatkan hati yang gentar.",
        penghayatan: "Peluk jemaat dengan suara Anda, jadikan suara Anda sarana perlindungan firman Tuhan bagi mereka.",
        penampilan: "Dada terbuka, bahu tegap, telapak tangan bertumpu tenang di ambon."
      }
    ]
  },
  {
    id: "mzm-42",
    title: "Mazmur 42 (TB2)",
    version: "TB2",
    subtitle: "Kerinduan kepada Allah • Terjemahan Baru Edisi 2 (LAI)",
    refren: "Jiwaku haus kepada Allah, kepada Allah yang hidup.",
    genre: "Kehausan Jiwa & Kerinduan Spiritual (Spiritual Longing & Thirst)",
    category: "longing",
    macroAnalysis: {
      psikologiGlobal: "Kerinduan mistik yang membakar jiwa di padang tandus kehidupan. Teks TB2: 'Seperti rusa yang merindukan sungai berair... Bilakah aku boleh datang memandang wajah Allah?'. Kerinduan yang kudus dan mendalam.",
      suasanaBatin: "Tandusnya padang pasir, desau angin kering, dahaga tenggorokan batin, lalu ingatan manis akan pelataran bait Allah.",
      nadaBatinPembaca: "Lirih, haus, mendalam, intim, sarat perasaan rindu yang suci.",
      emotionalArc: "Dari jeritan dahaga rusa di gurun -> air mata yang menjadi makanan siang malam -> penghiburan jiwa: berharaplah kepada Allah!",
      fokusUtamaVAIEPP: "Artikulasi lembut dengan vokal berhembus (aspirated), ekspresi kerinduan suci di mata, peralihan intonasi saat menegur jiwa sendiri."
    },
    contemplationGuide: "Bayangkan Anda telah berjalan berhari-hari di padang gurun yang terik. Tenggorokan kering, jiwa letih. Tiba-tiba Anda mendengar gemercik sungai di kejauhan. Begitulah jiwa kita yang senantiasa rindu bersatu dengan Allah sumber air hidup.",
    verses: [
      {
        number: 2,
        rawText: "Seperti rusa yang merindukan sungai berair, / demikianlah jiwaku merindukan Engkau, ya Allah. // Jiwaku haus kepada Allah, / kepada Allah yang hidup! // Bilakah aku boleh datang memandang wajah Allah?",
        annotatedHtml: "Seperti rusa yang <span class=\"stress-word\">merindukan sungai berair</span>, <span class=\"breath-short\">/</span> demikianlah jiwaku merindukan Engkau, ya Allah. <span class=\"breath-long\">//</span> Jiwaku <span class=\"stress-word\">haus kepada Allah</span>, <span class=\"breath-short\">/</span> kepada <span class=\"stress-word\">Allah yang hidup</span>! <span class=\"breath-long\">//</span> Bilakah aku boleh datang <span class=\"stress-word\">memandang wajah Allah</span>?",
        psikologiAyat: "Penomoran TB2 ayat 2: Dahaga eksistensial; kerinduan suci 'memandang wajah Allah' (panim el-panim).",
        nadaBatin: "Rindu, mendalam, lembut melayang dari relung batin terdalam.",
        vokal: "Piano ke mezzo-piano, desah nafas yang terkontrol baik, tempo lambat mengalun.",
        artikulasi: "Pengucapan 'merindukan sungai berair' dibuat sangat mengalir (legatissimo).",
        intonasi: "Pertanyaan retoris di akhir ('Bilakah aku boleh datang memandang wajah Allah?') mengambang di udara dengan nada bertanya lirih.",
        ekspresi: "Tatapan mata melayang lembut ke arah atas altar, raut wajah penuh kerinduan kasih.",
        penghayatan: "Rasakan kekeringan batin Anda yang mendambakan sentuhan kasih Allah yang memulihkan.",
        penampilan: "Berdiri hening, anggun, mencerminkan ketenangan seorang pendoa kontemplatif."
      },
      {
        number: 6,
        rawText: "Mengapa engkau tertekan, hai jiwaku, / dan gelisah di dalam diriku? // Berharaplah kepada Allah! / Sebab aku akan bersyukur lagi kepada-Nya, / penolongku dan Allahku!",
        annotatedHtml: "<span class=\"stress-word\">Mengapa engkau tertekan</span>, hai jiwaku, <span class=\"breath-short\">/</span> dan gelisah di dalam diriku? <span class=\"breath-long\">//</span> <span class=\"stress-word\">Berharaplah kepada Allah</span>! <span class=\"breath-short\">/</span> Sebab aku akan bersyukur lagi kepada-Nya, <span class=\"breath-short\">/</span> <span class=\"stress-word\">penolongku dan Allahku</span>!",
        psikologiAyat: "Dialog batiniah (soliloquy): iman bangkit menegur dan menenangkan kegelisahan emosi manusiawi.",
        nadaBatin: "Menegur dengan kasih sayang kepada batin sendiri, lalu bangkit dengan keyakinan pengharapan.",
        vokal: "Paruh pertama lembut intim berbisik -> paruh kedua meningkat tegas ke mezzo-forte penuh kepastian.",
        artikulasi: "Ucapkan 'Berharaplah kepada Allah!' dengan artikulasi mantap dan optimis.",
        intonasi: "Nada bertanya heran pada 'Mengapa engkau tertekan...', lalu melompat ke nada cerah penuh harapan.",
        ekspresi: "Tangan batin meneduhkan dada, tatapan kembali fokus penuh harapan ke arah umat.",
        penghayatan: "Bicaralah kepada jiwa Anda sendiri yang sering cemas, beri dia penghiburan sabda Allah.",
        penampilan: "Sikap tegap optimis, tersenyum kecil penuh ketenangan batin."
      }
    ]
  }
];

// Otomatis lengkapi data suku kata & arah nada pada setiap ayat preset
psalmPresets.forEach(preset => {
  preset.verses.forEach((v, idx) => {
    if (!v.phrasingData) {
      v.phrasingData = analyzePhrasingAndPitch(v.rawText, idx, preset.verses.length, preset.category);
    }
    if (!v.syllableText) {
      const words = v.rawText.replace(/[\/\;]/g, "").split(/\s+/).filter(w => w.length > 0);
      v.syllableText = words.map(w => syllabifyWord(w)).join(" ");
    }
  });
});

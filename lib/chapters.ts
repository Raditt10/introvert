export interface ChapterParagraph {
  text: string;
  isQuote?: boolean;
  isBold?: boolean;
  isHeading?: boolean;
}

export interface Chapter {
  id: number;
  phase: string;
  title: string;
  subtitle: string;
  epigraph?: string;
  paragraphs: ChapterParagraph[];
  kanji: string[];
  gradientClass: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    phase: '01',
    title: 'Sang Introvert',
    subtitle: 'Bab I · Memahami keheningan dari dalam',
    epigraph: '"Dalam keheningan, ada kekuatan yang jarang dipahami dunia."',
    kanji: ['静', '内', '心'],
    gradientClass: 'text-gradient-hero',
    paragraphs: [
      {
        text: 'Pendahuluan',
        isHeading: true,
      },
      {
        text: 'Perkembangan diri pada masa remaja merupakan proses yang kompleks, dinamis, dan menyeluruh, mencakup aspek sosial, emosional, akademik, serta pembentukan identitas. Remaja merupakan fase kritis di mana individu mulai memahami dan menyesuaikan diri dengan lingkungan serta membangun gambaran tentang diri mereka. Dalam proses ini, kepribadian menjadi komponen fundamental yang memengaruhi bagaimana seseorang berpikir, merasa, dan bertindak. Salah satu tipe kepribadian yang sering mendapat stigma negatif adalah kepribadian introvert.',
      },
      {
        text: 'Introvert sering digambarkan sebagai sosok yang pemalu, pendiam, dan tidak mudah bersosialisasi. Di tengah budaya pendidikan yang cenderung memprioritaskan siswa aktif, vokal, dan ekstrovert, siswa dengan kepribadian introvert sering kali terpinggirkan. Padahal, kepribadian introvert memiliki keunggulan tersendiri, seperti kemampuan berpikir mendalam, fokus tinggi, dan kecenderungan untuk bertindak secara reflektif dan penuh perhitungan.',
      },
      {
        text: 'Menurut Jung (dalam Sujanto, 2009), kepribadian introvert adalah orientasi psikologis yang memusatkan energi ke dalam diri, berbeda dengan ekstrovert yang mengeksternalisasi energinya melalui interaksi sosial. Individu introvert cenderung lebih nyaman bekerja sendiri, lebih berhati-hati dalam berbicara, dan cenderung lebih sensitif terhadap stimulus eksternal.',
      },
      {
        text: '"Ciri-ciri ini seringkali menyebabkan mereka dianggap tidak aktif atau bahkan bermasalah secara sosial, meskipun kenyataannya tidak demikian."',
        isQuote: true,
      },
      {
        text: 'Banyak penelitian psikologi perkembangan telah membahas pentingnya memahami tipe kepribadian dalam mendampingi remaja. Hurlock (1997) menyebut bahwa masa remaja merupakan tahap transisi yang sangat memerlukan pemahaman terhadap dinamika internal individu. Kepribadian introvert bisa menjadi kekuatan bila diberi ruang dan pendekatan yang tepat. Sayangnya, dalam konteks pendidikan, siswa dengan kepribadian introvert sering kali mendapatkan perlakuan yang kurang tepat karena minimnya pemahaman dari guru maupun lingkungan sekolah.',
      },
      {
        text: 'Di MA KHAS Kempek, sebagai lembaga yang tidak hanya menekankan aspek akademik tetapi juga spiritual dan sosial, keberagaman kepribadian siswa menjadi tantangan sekaligus peluang. Keberadaan siswa introvert di lingkungan ini menunjukkan adanya kebutuhan akan strategi pendidikan yang tidak hanya berbasis pada performa luar, tetapi juga memperhatikan kekuatan dalam diri individu.',
      },
      {
        text: 'Metode Penelitian',
        isHeading: true,
      },
      {
        text: 'Penelitian ini menggunakan pendekatan kualitatif dengan metode studi kasus. Pendekatan ini dipilih karena mampu menggali secara mendalam pengalaman, persepsi, dan makna yang dirasakan oleh individu yang memiliki kepribadian introvert. Lokasi penelitian adalah MA KHAS Kempek, Cirebon. Partisipan terdiri dari sepuluh siswi kelas XI yang dipilih secara purposive berdasarkan identifikasi guru BK dan wali kelas sebagai siswa dengan kecenderungan kepribadian introvert.',
      },
      {
        text: 'Teknik pengumpulan data dimulai dengan wawancara mendalam yang dilakukan dengan pedoman semi-terstruktur untuk menggali pengalaman, tantangan, serta persepsi terhadap interaksi sosial dan akademik. Observasi nonpartisipatif juga dilakukan — peneliti mengamati perilaku partisipan dalam interaksi sosial, kegiatan kelas, dan aktivitas organisasi. Data akademik dan catatan observasi guru dijadikan data pendukung.',
      },
      {
        text: 'Analisis data dilakukan secara tematik melalui tiga tahap: reduksi data, penyajian data, dan penarikan kesimpulan. Validitas data diuji melalui triangulasi sumber dan metode.',
      },
    ],
  },
  {
    id: 2,
    phase: '02',
    title: 'Baterai Sosial',
    subtitle: 'Bab II · Paradoks energi dan interaksi',
    epigraph: '"Saya lebih nyaman memiliki dua sahabat yang benar-benar dekat daripada ikut nongkrong ramai-ramai, karena saya mudah capek secara mental." — Partisipan penelitian',
    kanji: ['電', '休', '息'],
    gradientClass: 'text-gradient-cool',
    paragraphs: [
      {
        text: 'Dampak Sosial: Minimnya Interaksi dan Ketidakterlibatan Organisasi',
        isHeading: true,
      },
      {
        text: 'Banyak siswa introvert dalam penelitian ini mengaku kesulitan untuk menjalin relasi yang luas. Mereka cenderung memiliki jumlah teman yang sedikit, namun memiliki kedalaman emosional dalam relasi tersebut.',
      },
      {
        text: '"Saya lebih nyaman memiliki dua sahabat yang benar-benar dekat daripada ikut nongkrong ramai-ramai, karena saya mudah capek secara mental."',
        isQuote: true,
      },
      {
        text: 'Fenomena ini berkaitan erat dengan konsep unsociability menurut Eysenck, yakni preferensi terhadap interaksi terbatas dengan intensitas tinggi dibanding interaksi luas tanpa kedalaman. Hal ini juga menjadi tantangan dalam kehidupan organisasi, di mana siswa dituntut untuk tampil aktif, menyuarakan pendapat, dan bekerja dalam tim besar.',
      },
      {
        text: 'Data observasi menunjukkan bahwa hanya 1 dari 10 responden yang terlibat aktif dalam organisasi sekolah. Siswa introvert cenderung memilih untuk menjadi bagian pasif atau administratif dalam organisasi, seperti bendahara atau sekretaris. Mereka menghindari posisi yang menuntut tampil di depan umum.',
      },
      {
        text: 'Namun, penting untuk dicatat bahwa rendahnya partisipasi organisasi bukan berarti mereka tidak memiliki kepemimpinan. Justru beberapa siswa menunjukkan "kepemimpinan diam" — seperti memengaruhi orang lain melalui tulisan, ide, dan keteladanan sikap.',
        isBold: true,
      },
      {
        text: 'Dampak Akademik: Disiplin dan Orientasi Tujuan',
        isHeading: true,
      },
      {
        text: 'Dalam aspek akademik, siswa introvert cenderung memiliki keunggulan dalam konsistensi dan kedisiplinan. Berdasarkan dokumentasi nilai, 70% partisipan memiliki nilai akademik di atas rata-rata kelas, terutama dalam mata pelajaran berbasis teori seperti Bahasa Indonesia, Sejarah, dan Bahasa Arab.',
      },
      {
        text: 'Dalam wawancara, mereka mengaku bahwa belajar secara mandiri, membaca, dan menulis merupakan cara belajar yang paling efektif bagi mereka. Ketika siswa lain merasa bosan dalam situasi pembelajaran pasif, siswa introvert justru merasa nyaman.',
      },
      {
        text: 'Selain itu, introvert lebih memiliki orientasi pada tujuan jangka panjang. Mereka jarang tergoda oleh distraksi sosial, lebih mampu mengatur waktu belajar secara mandiri, dan memiliki motivasi intrinsik yang tinggi.',
      },
      {
        text: 'Fenomena ini sejalan dengan penelitian Khairunnisa & Mirawati (2019) yang menunjukkan bahwa siswa introvert cenderung memiliki strategi belajar yang lebih terorganisir dibanding siswa ekstrovert. Potensi akademik introvert bisa lebih berkembang jika diberikan strategi pengajaran yang tepat seperti flipped classroom, pembelajaran berbasis proyek, atau asesmen tertulis yang mendalam.',
      },
      {
        text: '"Tantangan muncul ketika penilaian keberhasilan akademik hanya mengandalkan partisipasi verbal atau diskusi kelompok, yang membuat siswa introvert terlihat pasif, padahal mereka memahami materi dengan sangat baik."',
        isQuote: true,
      },
    ],
  },
  {
    id: 3,
    phase: '03',
    title: 'Mitos vs Fakta',
    subtitle: 'Bab III · Meluruskan stereotip yang salah',
    epigraph: '"Kadang saya mikir terlalu lama sebelum berbicara, takut salah, takut ditertawakan." — Partisipan penelitian',
    kanji: ['真', '実', '知'],
    gradientClass: 'text-gradient-nature',
    paragraphs: [
      {
        text: 'Dampak Emosional: Overthinking, Cemas Sosial, dan Strategi Adaptif',
        isHeading: true,
      },
      {
        text: 'Secara emosional, siswa introvert dalam penelitian ini menunjukkan dua kecenderungan dominan: kecemasan sosial dan kebiasaan overthinking. Beberapa responden mengaku sering merasa tidak nyaman ketika harus berinteraksi dengan banyak orang atau berbicara di forum umum.',
      },
      {
        text: '"Kadang saya mikir terlalu lama sebelum berbicara, takut salah, takut ditertawakan."',
        isQuote: true,
      },
      {
        text: 'Kondisi ini memperlihatkan bahwa tantangan psikologis utama siswa introvert bukan pada kemampuan berpikir, tetapi pada rasa aman dalam mengungkapkan diri. Mereka cenderung memproses emosi secara internal, dan tidak selalu mampu mengungkapkan perasaan kepada orang lain.',
      },
      {
        text: 'Namun, penelitian ini juga menemukan bahwa siswa introvert memiliki kemampuan adaptasi yang cukup kuat melalui strategi mandiri seperti journaling, membaca buku motivasi, menulis puisi, atau mendengarkan musik tenang.',
        isBold: true,
      },
      {
        text: 'Guru BK di sekolah menyampaikan bahwa siswa introvert sering datang ke ruang konseling bukan karena masalah besar, tetapi untuk "menenangkan diri". Ini menunjukkan adanya kesadaran emosional (emotional awareness) yang baik, meskipun tidak selalu diikuti dengan ekspresi terbuka.',
      },
      {
        text: 'Keunggulan Kompetitif: Ketelitian, Kreativitas, dan Fokus',
        isHeading: true,
      },
      {
        text: 'Dalam banyak kasus, siswa introvert menunjukkan keunggulan yang kompetitif di luar ekspektasi umum. Mereka dikenal lebih teliti dalam mengerjakan tugas, tidak terburu-buru mengambil keputusan, dan memiliki kreativitas tinggi dalam hal artistik dan literasi.',
      },
      {
        text: 'Beberapa siswa yang diwawancarai memiliki karya tulisan pribadi, seperti puisi, cerpen, atau bahkan catatan harian reflektif. Ketika diminta untuk presentasi, mereka lebih nyaman menyampaikan hasilnya dalam bentuk video rekaman atau infografis daripada berbicara langsung.',
      },
      {
        text: 'Hal ini menunjukkan bahwa pendekatan belajar visual dan reflektif lebih sesuai bagi siswa introvert. Jika dikelola dengan baik, mereka bisa menjadi inovator dan pemikir strategis dalam komunitas sekolah.',
        isBold: true,
      },
      {
        text: 'Perbandingan dengan Penelitian Terdahulu',
        isHeading: true,
      },
      {
        text: 'Yeny Elfiani (2020) meneliti perbedaan manajemen konflik berdasarkan kepribadian introvert-ekstrovert dan menemukan bahwa introvert lebih cenderung menggunakan pendekatan kompromi dan menghindari konflik terbuka.',
      },
      {
        text: 'Khairun Nisa & Mirawati (2019) menyatakan bahwa introvert tetap bisa bersosialisasi, hanya saja caranya berbeda — mereka memilih kedekatan yang intim dan stabil dibanding popularitas semu.',
      },
      {
        text: 'Laras Ayu Istichori (2021) menunjukkan bahwa kepribadian introvert memiliki tingkat kemandirian yang tinggi dan mampu membuat keputusan dengan analisis matang.',
      },
    ],
  },
  {
    id: 4,
    phase: '04',
    title: 'Kekuatan',
    subtitle: 'Bab IV · Senjata rahasia yang tak bersuara',
    epigraph: '"Kepribadian introvert bukanlah kelemahan, melainkan modal unik yang membutuhkan pendekatan pendidikan yang sesuai."',
    kanji: ['力', '深', '考'],
    gradientClass: 'text-gradient-hero',
    paragraphs: [
      {
        text: 'Implikasi Praktis dan Teoretis',
        isHeading: true,
      },
      {
        text: 'Bagi Guru dan Sekolah',
        isHeading: true,
      },
      {
        text: 'Mengembangkan model pembelajaran campuran: kombinasi diskusi kelompok kecil dengan tugas individu reflektif. Memberi ruang presentasi alternatif seperti video, infografik, dan tulisan. Menyediakan ruang tenang di sekolah (quiet corner atau ruang journaling) agar siswa introvert memiliki tempat untuk me-recharge energi mereka.',
      },
      {
        text: 'Bagi Keluarga dan Masyarakat',
        isHeading: true,
      },
      {
        text: 'Mendorong eksplorasi bakat tanpa tekanan sosial. Menghargai proses berpikir dan kesunyian sebagai kekuatan, bukan kelemahan. Orang tua perlu memberikan dukungan emosional dan menghindari tekanan sosial berlebihan terhadap anak introvert.',
      },
      {
        text: 'Implikasi Teoretis',
        isHeading: true,
      },
      {
        text: 'Kepribadian introvert bukan hambatan dalam perkembangan remaja, tetapi perlu didampingi melalui pendekatan psikologis yang empatik dan fleksibel. Penelitian ini memperkuat teori introversi sebagai bentuk orientasi energi ke dalam diri, bukan penolakan terhadap dunia luar.',
        isBold: true,
      },
      {
        text: 'Kesimpulan',
        isHeading: true,
      },
      {
        text: 'Penelitian ini menyimpulkan bahwa kepribadian introvert memberikan dampak signifikan terhadap perkembangan diri remaja, baik dari aspek sosial, akademik, maupun emosional. Meskipun menghadapi hambatan dalam interaksi sosial dan kepercayaan diri, siswa introvert menunjukkan kekuatan dalam ketekunan belajar, refleksi diri, dan kestabilan akademik.',
      },
      {
        text: '"Kepribadian introvert bukanlah kelemahan, melainkan modal unik yang membutuhkan pendekatan pendidikan yang sesuai."',
        isQuote: true,
      },
      {
        text: 'Saran',
        isHeading: true,
      },
      {
        text: 'Bagi Guru dan Sekolah: Perlu menyediakan ruang reflektif, pembelajaran berbasis proyek individu, serta pendekatan personal dalam pembinaan siswa introvert.',
      },
      {
        text: 'Bagi Orang Tua: Memberikan dukungan emosional dan menghindari tekanan sosial berlebihan terhadap anak introvert.',
      },
      {
        text: 'Bagi Peneliti Lanjutan: Diperlukan penelitian kuantitatif untuk melihat hubungan kepribadian introvert dengan prestasi atau kesejahteraan psikologis secara lebih luas.',
      },
    ],
  },
];

export const references = [
  'Chaplin, J. P. (2006). Kamus Lengkap Psikologi. Jakarta: Rajawali Pers.',
  'Fandini, L. (2019). Perbedaan Forgiveness Ditinjau dari Tipe Kepribadian pada Remaja. Psikologi Prima, 2(1), 41–51.',
  'Hurlock, E. B. (1997). Perkembangan Anak. Erlangga.',
  'Ibrahim, A. G., & Haryono, B. (2022). Pengaruh Tipe Kepribadian dan Lingkungan Keluarga terhadap Interaksi Sosial Mahasiswa. Jurnal Sosialisasi, 9(1), 54–66.',
  'Laras, A. I. (2021). Pengaruh Tipe Kepribadian terhadap Kemandirian Anak. Jurnal Psikologi, 14(2), 25–38.',
  'Muriah, S., & Wardan, K. (2020). Psikologi Perkembangan Anak dan Remaja. Literasi Nusantara.',
  'Putri, I. P., & Irawan, S. (2019). Tipe Kepribadian dan Interaksi Sosial. Mimbar Ilmu, 24(1), 89–95.',
  'Rahayu, Y. M., & Fauziah, A. N. M. (2017). Kemampuan Penalaran dan Tipe Kepribadian Siswa. E-Journal Unesa, 5(2), 138–146.',
  'Saputri, R., et al. (2023). Perkembangan Peserta Didik. Rumah Cemerlang Indonesia.',
  'Suryabrata, S. (1995). Psikologi Kepribadian. Jakarta: CV Rajawali.',
  'Sujanto, D. (2009). Psikologi Kepribadian. Jakarta: Bumi Aksara.',
];

export const sourceInfo = {
  journal: 'Muqoddima: Jurnal Pemikiran dan Riset Sosiologi',
  volume: '5 (1): 26-31',
  year: '2024',
  doi: '10.47776/MJPRS.005.01.04',
  authors: [
    { name: 'Ahmad Royani', affiliation: 'Universitas Islam Bunga Bangsa Cirebon' },
    { name: 'Nadya Nailal Husna', affiliation: 'Madrasah Aliyah KHAS Kempek, Cirebon' },
  ],
  fullTitle: 'Analisis Dampak Kepribadian Introvert Terhadap Perkembangan Diri Remaja: Tinjauan Psikologis',
};

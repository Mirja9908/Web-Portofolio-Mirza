/**
 * Naufal Mirza Nugraha — Portfolio
 * script.js — Foundation interactions only (Tahap 1)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. NAVBAR: Scroll shadow + Active link ──────────────────
    const navbar = document.getElementById('navbar');

    const updateNavbarScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbarScroll, { passive: true });
    updateNavbarScroll();

    // ── 2. NAVBAR: Active link on scroll (Intersection Observer) ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ── 3. MOBILE MENU ─────────────────────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ── 4. COPY EMAIL ──────────────────────────────────────────
    window.copyEmail = () => {
        const emailEl = document.getElementById('email-display');
        if (!emailEl) return;
        const email = emailEl.textContent.trim();

        navigator.clipboard.writeText(email).then(() => {
            showToast();
        }).catch(() => {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast();
        });
    };

    function showToast() {
        const toast = document.getElementById('emailToast');
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ── 5. PROJECT CARDS: Subtle 3D Tilt (Desktop only, max ±3deg) ──
    const initProjectCardTilt = () => {
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Only activate on desktop pointer devices with motion enabled
        if (!finePointer.matches || prefersReducedMotion.matches) return;

        const cards = document.querySelectorAll('.project-card');
        if (!cards.length) return;

        cards.forEach((card) => {
            let rafId = null;
            let targetRx = 0;
            let targetRy = 0;

            const onMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                if (!rect.width || !rect.height) return;

                // Center is (0, 0), range is [-0.5, 0.5]
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                // Subtle tilt capped to max ±3deg
                targetRx = Math.max(-3, Math.min(3, -y * 6));
                targetRy = Math.max(-3, Math.min(3, x * 6));

                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        card.style.setProperty('--rx', `${targetRx.toFixed(2)}deg`);
                        card.style.setProperty('--ry', `${targetRy.toFixed(2)}deg`);
                        rafId = null;
                    });
                }
            };

            const onMouseLeave = () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                // Smoothly reset back to 0
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
            };

            card.addEventListener('mousemove', onMouseMove, { passive: true });
            card.addEventListener('mouseleave', onMouseLeave, { passive: true });
        });
    };

    initProjectCardTilt();

    // ── 6. FULLSCREEN PROJECT DETAIL VIEW (Case Study Overlay) ──
    const PROJECT_DETAILS = {
        akabara: {
            id: "akabara",
            number: "PROJECT 01",
            title: "AKABARA 33",
            date: "31 Januari 2026",
            role: "Sie Acara",
            context: "Anniversary",
            overview: "AKABARA 33 merupakan peringatan hari ulang tahun yang dirancang sebagai momentum perayaan dan kebersamaan seluruh warga sekolah.",
            myRole: "Sebagai bagian dari Sie Acara, saya bertanggung jawab menyusun dan mengawal alur rundown, memastikan kesiapan pengisi acara, serta mengkoordinasikan jalannya panggung sejak pembukaan hingga penutupan.",
            handled: [
                "Perancangan dan sinkronisasi rundown kegiatan",
                "Koordinasi teknis dengan pengisi acara dan tim perlengkapan",
                "Pengawalan alur dan durasi panggung selama acara berlangsung",
                "Penanganan kendala teknis dan penyesuaian waktu secara real-time"
            ],
            challenge: "Di balik kemeriahan perayaan, fase persiapan menuntut konsentrasi tinggi. Menjelang hari H, ritme kerja panitia sangat intensif untuk memastikan setiap segmen acara tersinkronisasi dengan baik. Ada momen ketika koordinasi harus dilakukan secara cepat di tengah dinamika situasi dan pergeseran durasi di panggung. Bagi saya, tanggung jawab di Sie Acara adalah memastikan ketenangan di balik layar—kendala apa pun yang muncul tidak boleh mengganggu kenyamanan dan antusiasme audiens yang hadir.",
            takeaway: "Memperkuat kemampuan manajemen waktu panggung, komunikasi cepat dan tenang di balik layar, serta pengambilan keputusan situasional yang presisi.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "akabara-1",
                    src: "",
                    alt: "Dokumentasi AKABARA 33 — Alur Rundown & Panggung Utama",
                    caption: "Dokumentasi Utama Panggung"
                },
                {
                    id: "akabara-2",
                    src: "",
                    alt: "Dokumentasi AKABARA 33 — Koordinasi Pengisi Acara",
                    caption: "Koordinasi Teknis Lapangan"
                },
                {
                    id: "akabara-3",
                    src: "",
                    alt: "Dokumentasi AKABARA 33 — Puncak Acara & Audiens",
                    caption: "Suasana Puncak Perayaan"
                }
            ]
        },
        bmts: {
            id: "bmts",
            number: "FEATURED PROJECT — 02",
            title: "BMTS 33",
            date: "13–27 April 2026",
            role: "Ketua Pelaksana",
            context: "Bakti Masyarakat Telkom School",
            overview: "Bakti Masyarakat Telkom School (BMTS 33) merupakan program pengabdian sosial terpadu skala besar yang melibatkan partisipasi aktif ratusan siswa untuk terjun langsung memberikan dampak positif di tengah masyarakat.",
            myRole: "Sebagai Ketua Pelaksana, saya memegang mandat kepemimpinan menyeluruh: merumuskan visi program, membagi struktur kerja, mengambil keputusan strategis, mengoordinasikan lintas divisi, serta memimpin pengawasan operasional selama dua pekan pelaksanaan.",
            handled: [
                "Kepemimpinan strategis dan terpadu terhadap 12 kelompok kerja",
                "Mobilisasi dan pendampingan 130+ siswa selama seluruh agenda",
                "Koordinasi intensif dan pelaporan berkala bersama Pimpinan Harian",
                "Sinkronisasi teknis kegiatan harian bersama Sie Acara",
                "Pengarahan publikasi dan dokumentasi bersama Sie Dokumentasi",
                "Evaluasi berkala dan manajemen mitigasi risiko di lapangan"
            ],
            challenge: "Mengemban amanah sebagai Ketua Pelaksana untuk event berdurasi dua pekan dengan 130+ siswa adalah ujian kepemimpinan yang nyata. Tekanan menjelang dan selama kegiatan berlangsung sangat besar, mulai dari menyatukan ritme 12 kelompok yang berbeda hingga memastikan keselamatan dan kelancaran kegiatan di lingkungan masyarakat. Ada malam-malam panjang di mana evaluasi harus diselesaikan hingga larut untuk memetakan solusi sebelum aktivitas esok pagi dimulai. Menjaga ketenangan, stamina, dan kejelasan arah adalah keharusan, karena stabilitas tim bertumpu pada ketegasan dan ketenangan pemimpinnya.",
            takeaway: "Menempa kapasitas kepemimpinan skala besar, manajemen multi-tim dan multi-hari, diplomasi komunikasi dengan berbagai pihak, serta tanggung jawab moral penuh atas keberhasilan program.",
            metrics: [
                { value: "12", label: "KELOMPOK KERJA" },
                { value: "130+", label: "SISWA TERLIBAT" }
            ],
            featured: true,
            photos: [
                {
                    id: "bmts-1",
                    src: "",
                    alt: "Dokumentasi BMTS 33 — Pengabdian Sosial Terpadu",
                    caption: "Dokumentasi Utama Pengabdian Masyarakat"
                },
                {
                    id: "bmts-2",
                    src: "",
                    alt: "Dokumentasi BMTS 33 — Mobilisasi 130+ Siswa",
                    caption: "Mobilisasi & Pengarahan 12 Kelompok Kerja"
                },
                {
                    id: "bmts-3",
                    src: "",
                    alt: "Dokumentasi BMTS 33 — Koordinasi Pimpinan Harian",
                    caption: "Koordinasi Strategis Pimpinan & Divisi"
                },
                {
                    id: "bmts-4",
                    src: "",
                    alt: "Dokumentasi BMTS 33 — Evaluasi Berkala Lapangan",
                    caption: "Evaluasi & Mitigasi Risiko Lapangan"
                }
            ]
        },
        classmeeting: {
            id: "classmeeting",
            number: "PROJECT 03",
            title: "Classmeeting VITAVIT",
            date: "17–18 Juni 2026",
            role: "Sie Acara",
            context: "Classmeeting",
            overview: "Classmeeting VITAVIT adalah ajang kompetisi antarkelas pasca-ujian yang memadukan semangat sportivitas olahraga dan kreativitas siswa dalam suasana yang dinamis dan sehat.",
            myRole: "Bertugas dalam divisi Sie Acara untuk memanajemen jadwal kompetisi, mengarahkan jalannya mata lomba, serta memastikan seluruh peserta mengikuti alur kegiatan secara tertib dan sportif.",
            handled: [
                "Pengelolaan jadwal dan alur pertandingan Futsal antarkelas",
                "Koordinasi teknis pelaksanaan Senam Kreasi bersama instruktur dan peserta",
                "Penataan waktu penyajian dan penilaian kompetisi Healthy Food",
                "Fasilitasi teknis penayangan dan penjurian lomba Vlog"
            ],
            challenge: "Tantangan utama dalam classmeeting adalah mengelola dinamika ratusan siswa yang berkompetisi secara serempak di beberapa titik lokasi. Manajemen waktu yang presisi menjadi kunci agar jadwal pertandingan futsal, senam kreasi, dan presentasi healthy food tidak mengalami penundaan yang mengganggu flow keseluruhan acara.",
            takeaway: "Mengasah keahlian crowd management, sinkronisasi jadwal multi-lomba secara paralel, serta komunikasi persuasif yang efektif kepada peserta.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "classmeeting-1",
                    src: "",
                    alt: "Dokumentasi Classmeeting VITAVIT — Kompetisi Futsal Antarkelas",
                    caption: "Dokumentasi Pertandingan Futsal"
                },
                {
                    id: "classmeeting-2",
                    src: "",
                    alt: "Dokumentasi Classmeeting VITAVIT — Senam Kreasi",
                    caption: "Pelaksanaan Senam Kreasi Bersama"
                },
                {
                    id: "classmeeting-3",
                    src: "",
                    alt: "Dokumentasi Classmeeting VITAVIT — Healthy Food & Lomba Vlog",
                    caption: "Penjurian Healthy Food & Lomba Vlog"
                }
            ]
        },
        mpls: {
            id: "mpls",
            number: "PROJECT 04",
            title: "MPLS 34",
            date: "13–17 Juli 2026",
            role: "Sie Acara & MC",
            context: "Masa Pengenalan Lingkungan Sekolah",
            overview: "Masa Pengenalan Lingkungan Sekolah (MPLS 34) adalah agenda orientasi resmi tahunan bagi siswa baru untuk mengenal budaya, nilai, serta ekosistem SMK Telkom Purwokerto.",
            myRole: "Menjalankan peran ganda: merancang dan mengawal alur kegiatan dalam Sie Acara, serta memandu langsung jalannya seluruh sesi sebagai Master of Ceremony (MC) selama dua hari penuh.",
            handled: [
                "Menjalankan peran Master of Ceremony (MC) MPLS 2026 selama 2 hari penuh",
                "Penyusunan alur transisi materi dan bridging antar-sesi orientasi",
                "Koordinasi narasumber, pemateri, dan tim teknis kepanitiaan",
                "Pengendalian suasana panggung secara dinamis sesuai respons audiens"
            ],
            challenge: "Menjalankan peran MC selama dua hari penuh sekaligus tetap terlibat dalam koordinasi Sie Acara membutuhkan energi dan fokus yang sangat prima. Berdiri di depan ratusan siswa baru yang belum saling mengenal menuntut saya untuk mampu mencairkan suasana sejak menit pertama. Ketika rundown mengalami penyesuaian mendadak dari pemateri, saya harus tetap tenang di atas panggung, berimprovisasi dengan natural tanpa membiarkan jeda waktu terasa canggung oleh audiens.",
            takeaway: "Memperdalam kapasitas public speaking tingkat lanjut, ketahanan performa panggung durasi panjang, serta adaptabilitas tinggi menghadapi perubahan rundown.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "mpls-1",
                    src: "",
                    alt: "Dokumentasi MPLS 34 — Pemanduan Acara MC 2 Hari Penuh",
                    caption: "Dokumentasi Master of Ceremony (MC)"
                },
                {
                    id: "mpls-2",
                    src: "",
                    alt: "Dokumentasi MPLS 34 — Orientasi Siswa Baru",
                    caption: "Suasana Orientasi Ratusan Siswa Baru"
                },
                {
                    id: "mpls-3",
                    src: "",
                    alt: "Dokumentasi MPLS 34 — Koordinasi Pemateri & Acara",
                    caption: "Koordinasi Pemateri & Bridging Materi"
                }
            ]
        },
        recruitment: {
            id: "recruitment",
            number: "PROJECT 05",
            title: "Open Recruitment OSIS",
            date: "Juli–Oktober 2026",
            role: "Registration / CP & Interview",
            context: "Kesiswaan & OSIS",
            overview: "Program regenerasi kepengurusan OSIS untuk menjaring, menyeleksi, dan membekali calon pengurus baru yang memiliki komitmen dan potensi kepemimpinan terbaik.",
            myRole: "Bertanggung jawab mengelola gerbang awal pendaftaran, bertindak sebagai Contact Person (CP) resmi, serta menjadi pewawancara pada tahapan interview seleksi calon anggota.",
            handled: [
                "Pengelolaan alur registrasi dan verifikasi kelengkapan berkas pendaftar",
                "Pemberian informasi resmi dan komunikasi responsif sebagai Contact Person (CP)",
                "Pelaksanaan sesi interview mendalam mengenai motivasi dan kapabilitas kandidat",
                "Rekapitulasi penilaian dan penyelarasan hasil bersama tim seleksi"
            ],
            challenge: "Mengawal proses komunikasi selama rentang waktu beberapa bulan menuntut konsistensi tinggi dalam pelayanan informasi. Dalam tahapan interview, tantangan utama adalah membaca karakter dan potensi kepemimpinan pendaftar secara objektif dalam waktu yang terbatas guna menjaga kualitas regenerasi organisasi.",
            takeaway: "Meningkatkan kemampuan wawancara analitis, komunikasi interpersonal profesional, serta keandalan dalam memproses data dan evaluasi kandidat.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "recruitment-1",
                    src: "",
                    alt: "Dokumentasi Open Recruitment OSIS — Sesi Interview Calon Pengurus",
                    caption: "Pelaksanaan Wawancara Mendalam Calon Pengurus"
                },
                {
                    id: "recruitment-2",
                    src: "",
                    alt: "Dokumentasi Open Recruitment OSIS — Verifikasi Alur Pendaftaran",
                    caption: "Alur Registrasi & Verifikasi Berkas"
                }
            ]
        },
        '17an': {
            id: "17an",
            number: "PROJECT 06",
            title: "17-an",
            date: "17–19 Agustus 2026",
            role: "Sie Acara",
            context: "Peringatan 17-an",
            overview: "Rangkaian perayaan Hari Kemerdekaan Republik Indonesia di lingkungan sekolah yang menghadirkan perlombaan tradisional dan kegiatan kebersamaan antarsiswa.",
            myRole: "Bertanggung jawab dalam Sie Acara untuk merancang format perlombaan, mengatur jadwal dan lokasi pertandingan, serta mengawal jalannya seluruh kegiatan selama tiga hari.",
            handled: [
                "Perancangan konsep, aturan teknis, dan alur perlombaan kemerdekaan",
                "Pengaturan zonasi lokasi dan timeline kompetisi di area sekolah",
                "Koordinasi teknis bersama juri, panitia lapangan, dan logistik lomba",
                "Pengawalan sesi seremonial pembukaan dan penganugerahan pemenang"
            ],
            challenge: "Tingginya antusiasme dan mobilitas siswa di area luar ruangan menuntut koordinasi lapangan yang ekstra sigap. Komunikasi antar-pos panitia harus terus terjaga agar seluruh rangkaian lomba selesai tepat waktu tanpa mengurangi semarak kemeriahan acara.",
            takeaway: "Memperkuat koordinasi tim di lapangan terbuka, kecepatan tanggap terhadap kendala teknis perlombaan, dan manajemen alur waktu kegiatan dinamis.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "17an-1",
                    src: "",
                    alt: "Dokumentasi 17-an — Perlombaan Tradisional Lapangan",
                    caption: "Suasana Perlombaan Lapangan Kemerdekaan"
                },
                {
                    id: "17an-2",
                    src: "",
                    alt: "Dokumentasi 17-an — Koordinasi Teknis Panitia",
                    caption: "Koordinasi Lapangan Antar-Pos Kegiatan"
                },
                {
                    id: "17an-3",
                    src: "",
                    alt: "Dokumentasi 17-an — Penganugerahan Pemenang",
                    caption: "Seremonial Penganugerahan Pemenang"
                }
            ]
        },
        aksaradaya: {
            id: "aksaradaya",
            number: "PROJECT 07",
            title: "AKSARADAYA",
            date: "23 Oktober 2026",
            role: "Wakil Ketua Pelaksana",
            context: "Bulan Kebudayaan",
            overview: "AKSARADAYA adalah perayaan Bulan Kebudayaan mandiri yang memadukan apresiasi seni, kreativitas, dan keragaman ekspresi siswa melalui panggung musik, busana, sastra, dan ruang dialog.",
            myRole: "Sebagai Wakil Ketua Pelaksana, saya mendampingi kepemimpinan operasional acara: mengawasi persiapan teknis seluruh segmen seni, memantau alur pertunjukan, dan memastikan keselamatan serta kepuasan seluruh pengisi acara dan audiens.",
            handled: [
                "Pengawasan panggung penampilan Band Sekolah dan Musikalisasi",
                "Koordinasi teknis dan alur peragaan busana Fashion Show kebudayaan",
                "Penataan teknis sesi Podcast langsung di panggung kegiatan",
                "Penyelarasan alur transisi antar-segmen seni dan mitigasi kendala teknis"
            ],
            challenge: "AKSARADAYA menghadirkan banyak segmen pertunjukan seni yang berbeda karakteristiknya dalam satu hari yang padat. Menjelang hari H, tuntutan koordinasi meningkat tajam untuk memastikan peralatan instrumen band, tata suara, tata panggung fashion show, hingga kesiapan podcast berada di posisi optimal. Sebagai Wakil Ketua Pelaksana, saya harus siap menjadi jembatan solusi ketika muncul ketidaksesuaian teknis di panggung, menjaga alur transisi antar penampilan tetap rapi dan memikat penonton.",
            takeaway: "Memperkaya kapasitas kepemimpinan dalam produksi event seni multi-format, diplomasi antar-divisi pertunjukan kreatif, dan ketepatan mitigasi risiko panggung.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "aksaradaya-1",
                    src: "",
                    alt: "Dokumentasi AKSARADAYA — Penampilan Band & Musikalisasi",
                    caption: "Panggung Penampilan Seni & Musik"
                },
                {
                    id: "aksaradaya-2",
                    src: "",
                    alt: "Dokumentasi AKSARADAYA — Fashion Show Budaya",
                    caption: "Peragaan Busana Kebudayaan"
                },
                {
                    id: "aksaradaya-3",
                    src: "",
                    alt: "Dokumentasi AKSARADAYA — Podcast Langsung",
                    caption: "Sesi Podcast Langsung di Panggung"
                }
            ]
        },
        kpko: {
            id: "kpko",
            number: "PROJECT 08",
            title: "KPKO — Kegiatan Pemilihan Ketua OSIS",
            date: "23 Oktober 2026",
            role: "Koordinator 2 — Sie Acara",
            context: "Pemilihan Ketua OSIS",
            overview: "KPKO merupakan pesta demokrasi pemilihan Ketua OSIS yang diselenggarakan sebagai event akbar tersendiri dan independen, mencakup seluruh rangkaian orasi visi-misi, debat kandidat, hingga pemungutan suara resmi seluruh siswa.",
            myRole: "Sebagai Koordinator 2 Sie Acara, saya memimpin perancangan protokoler teknis acara: menyusun alur orasi dan debat kandidat secara terstruktur, mengelola mekanisme pemungutan suara, dan menjaga integritas serta ketertiban jalannya seluruh prosesi pemilihan.",
            handled: [
                "Perancangan alur protokoler dan teknis panggung Orasi Kandidat",
                "Pengelolaan alur, tata tertib, dan teknis sesi Debat Kandidat resmi",
                "Pengaturan alur bilik dan protokoler Pencoblosan / Pemungutan Suara",
                "Pengawalan rangkaian acara pemilihan Ketua OSIS lainnya hingga penghitungan"
            ],
            challenge: "Menyelenggarakan event demokrasi sebesar KPKO memiliki tingkat sensitivitas yang tinggi. Diadakan pada tanggal 23 Oktober 2026—hari yang sama di mana saya juga memegang tanggung jawab sebagai Wakil Ketua Pelaksana di AKSARADAYA—menuntut manajemen waktu dan pembagian fokus yang luar biasa disiplin. Setiap sesi dalam KPKO, terutama debat kandidat dan pencoblosan, membutuhkan ketepatan protokoler tanpa ruang untuk kesalahan. Ketenangan emosi dan koordinasi yang presisi dengan anggota tim adalah kunci keberhasilan mengawal pesta demokrasi ini berjalan tertib dan bermartabat.",
            takeaway: "Membuktikan kapasitas mengelola dua tanggung jawab besar secara paralel pada tanggal yang sama, kepemimpinan acara berintegritas tinggi, dan ketelitian protokoler seremonial formal.",
            metrics: null,
            featured: false,
            photos: [
                {
                    id: "kpko-1",
                    src: "",
                    alt: "Dokumentasi KPKO — Debat Kandidat Ketua OSIS",
                    caption: "Sesi Debat Kandidat Resmi"
                },
                {
                    id: "kpko-2",
                    src: "",
                    alt: "Dokumentasi KPKO — Orasi Visi & Misi Kandidat",
                    caption: "Orasi Visi-Misi di Hadapan Siswa"
                },
                {
                    id: "kpko-3",
                    src: "",
                    alt: "Dokumentasi KPKO — Bilik Pemungutan Suara",
                    caption: "Protokoler Bilik Pencoblosan Suara"
                }
            ]
        }
    };

    const overlay = document.getElementById('projectDetailOverlay');
    const backdrop = document.getElementById('projectDetailBackdrop');
    const backBtn = document.getElementById('detailBackBtn');
    const closeBtn = document.getElementById('detailCloseBtn');
    const storyCol = document.getElementById('detailColStory');
    const docCol = document.getElementById('detailColDoc');

    // Active State
    let currentProjectId = null;
    let currentPhotoIndex = 0;
    let lastActiveElement = null;

    // Helper: generate frame inner HTML for a photo object
    const createPhotoFrameHtml = (photo, data, index, total) => {
        if (photo.src && photo.src.trim() !== '') {
            return `
                <div class="gallery-image-wrap">
                    <img src="${photo.src}" alt="${photo.alt || photo.caption || data.title}" class="gallery-image" />
                </div>
            `;
        }
        return `
            <div class="gallery-placeholder">
                <div class="gallery-placeholder-icon">
                    <i class="fa-regular fa-image"></i>
                </div>
                <span class="gallery-placeholder-tag">DOKUMENTASI PROYEK</span>
                <h4 class="gallery-placeholder-title">${photo.caption || 'Dokumentasi Project'}</h4>
                <p class="gallery-placeholder-desc">${photo.alt || `Arsip visual dokumentasi resmi untuk ${data.title}`}</p>
                <div class="gallery-placeholder-slot">
                    <i class="fa-solid fa-camera"></i>
                    <span>Slot Dokumentasi ${index + 1} dari ${total}</span>
                </div>
            </div>
        `;
    };

    // Render entire gallery shell & initial photo
    const renderGallery = (data, photoIndex = 0) => {
        if (!docCol) return;
        const photos = data.photos || [];
        const total = photos.length;

        // Empty state: no photos exist
        if (total === 0) {
            docCol.innerHTML = `
                <div class="gallery-header">
                    <div class="gallery-badge">
                        <i class="fa-solid fa-camera"></i>
                        <span>DOKUMENTASI PROYEK</span>
                    </div>
                </div>
                <div class="gallery-stage">
                    <div class="gallery-frame">
                        <div class="gallery-empty-state">
                            <div class="gallery-placeholder-icon">
                                <i class="fa-regular fa-images"></i>
                            </div>
                            <span class="gallery-placeholder-tag">DOKUMENTASI PROYEK</span>
                            <h4 class="gallery-placeholder-title">Belum Ada Dokumentasi</h4>
                            <p class="gallery-placeholder-desc">Slot dokumentasi foto untuk proyek ini akan segera diperbarui.</p>
                        </div>
                    </div>
                </div>
                <div class="gallery-footer">
                    <span class="gallery-caption">Dokumentasi arsip resmi</span>
                </div>
            `;
            return;
        }

        const idx = Math.max(0, Math.min(photoIndex, total - 1));
        currentPhotoIndex = idx;
        const currentPhoto = photos[idx];
        const isSingle = total === 1;

        const isPrevDisabled = isSingle || idx === 0;
        const isNextDisabled = isSingle || idx === total - 1;

        const frameHtml = createPhotoFrameHtml(currentPhoto, data, idx, total);

        const dotsHtml = isSingle ? '' : photos.map((p, i) => `
            <button type="button" class="gallery-dot ${i === idx ? 'active' : ''}" data-index="${i}" aria-label="Lihat foto ${i + 1} dari ${total}" ${i === idx ? 'aria-current="true"' : ''}></button>
        `).join('');

        docCol.innerHTML = `
            <div class="gallery-header">
                <div class="gallery-badge">
                    <i class="fa-solid fa-camera"></i>
                    <span>DOKUMENTASI PROYEK</span>
                </div>
                <div class="gallery-counter-wrap">
                    <span class="gallery-counter" id="galleryCounter" aria-live="polite">${idx + 1} / ${total}</span>
                </div>
            </div>

            <div class="gallery-stage" id="galleryStage">
                <button type="button" class="gallery-nav-btn gallery-nav-prev" id="galleryPrevBtn" aria-label="Foto sebelumnya" title="Foto sebelumnya" ${isPrevDisabled ? 'disabled aria-disabled="true"' : ''}>
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <div class="gallery-frame" id="galleryFrame">
                    ${frameHtml}
                </div>

                <button type="button" class="gallery-nav-btn gallery-nav-next" id="galleryNextBtn" aria-label="Foto berikutnya" title="Foto berikutnya" ${isNextDisabled ? 'disabled aria-disabled="true"' : ''}>
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <div class="gallery-footer">
                <div class="gallery-dots" id="galleryDots" role="tablist" aria-label="Pilih foto dokumentasi">
                    ${dotsHtml}
                </div>
                <p class="gallery-caption" id="galleryCaption">${currentPhoto.caption || 'Dokumentasi Proyek'}</p>
            </div>
        `;
    };

    // Smoothly update only the active slide without rebuilding the full shell
    const updateGallerySlide = (data, photoIndex) => {
        const photos = data.photos || [];
        const total = photos.length;
        if (total === 0) return;

        const idx = Math.max(0, Math.min(photoIndex, total - 1));
        currentPhotoIndex = idx;
        const currentPhoto = photos[idx];
        const isSingle = total === 1;

        const counterEl = document.getElementById('galleryCounter');
        const prevBtn = document.getElementById('galleryPrevBtn');
        const nextBtn = document.getElementById('galleryNextBtn');
        const frameEl = document.getElementById('galleryFrame');
        const captionEl = document.getElementById('galleryCaption');
        const dotBtns = docCol.querySelectorAll('.gallery-dot');

        if (!frameEl) {
            renderGallery(data, idx);
            return;
        }

        // Update counter
        if (counterEl) {
            counterEl.textContent = `${idx + 1} / ${total}`;
        }

        // Update navigation buttons
        if (prevBtn) {
            const disablePrev = isSingle || idx === 0;
            prevBtn.disabled = disablePrev;
            prevBtn.setAttribute('aria-disabled', String(disablePrev));
        }
        if (nextBtn) {
            const disableNext = isSingle || idx === total - 1;
            nextBtn.disabled = disableNext;
            nextBtn.setAttribute('aria-disabled', String(disableNext));
        }

        // Update frame content
        frameEl.innerHTML = createPhotoFrameHtml(currentPhoto, data, idx, total);

        // Update dots
        if (dotBtns && dotBtns.length) {
            dotBtns.forEach((dot, i) => {
                const isActive = (i === idx);
                dot.classList.toggle('active', isActive);
                if (isActive) {
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.removeAttribute('aria-current');
                }
            });
        }

        // Update caption
        if (captionEl) {
            captionEl.textContent = currentPhoto.caption || 'Dokumentasi Proyek';
        }
    };

    const navigateGallery = (delta) => {
        if (!currentProjectId) return;
        const data = PROJECT_DETAILS[currentProjectId];
        if (!data || !data.photos || !data.photos.length) return;

        const newIndex = currentPhotoIndex + delta;
        if (newIndex >= 0 && newIndex < data.photos.length) {
            updateGallerySlide(data, newIndex);
        }
    };

    const setGalleryIndex = (newIndex) => {
        if (!currentProjectId) return;
        const data = PROJECT_DETAILS[currentProjectId];
        if (!data || !data.photos || !data.photos.length) return;

        if (newIndex >= 0 && newIndex < data.photos.length && newIndex !== currentPhotoIndex) {
            updateGallerySlide(data, newIndex);
        }
    };

    // Attach click delegation on docCol once (prevents listener buildup)
    if (docCol) {
        docCol.addEventListener('click', (e) => {
            const prevBtn = e.target.closest('#galleryPrevBtn');
            const nextBtn = e.target.closest('#galleryNextBtn');
            const dotBtn = e.target.closest('.gallery-dot');

            if (prevBtn && !prevBtn.disabled) {
                navigateGallery(-1);
            } else if (nextBtn && !nextBtn.disabled) {
                navigateGallery(1);
            } else if (dotBtn) {
                const idx = parseInt(dotBtn.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    setGalleryIndex(idx);
                }
            }
        });
    }

    // Render full project detail (Left story + Right gallery)
    const renderProjectDetail = (data) => {
        if (!data || !storyCol || !docCol) return;

        // Render Story (Left Column)
        let metricsHtml = '';
        if (data.metrics && data.metrics.length) {
            metricsHtml = `
                <div class="detail-metrics-grid">
                    ${data.metrics.map(m => `
                        <div class="detail-metric-card">
                            <span class="detail-metric-number">${m.value}</span>
                            <span class="detail-metric-label">${m.label}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        storyCol.innerHTML = `
            <span class="detail-num-tag">${data.number}</span>
            <h1 class="detail-title" id="detailTitle">${data.title}</h1>

            <div class="detail-meta-bar">
                <div class="detail-meta-item">
                    <span class="detail-meta-label">Tanggal</span>
                    <strong class="detail-meta-val"><i class="fa-regular fa-calendar"></i> ${data.date}</strong>
                </div>
                <div class="detail-meta-item">
                    <span class="detail-meta-label">Peran</span>
                    <strong class="detail-meta-val detail-meta-val--gold"><i class="fa-solid fa-user-tag"></i> ${data.role}</strong>
                </div>
                <div class="detail-meta-item">
                    <span class="detail-meta-label">Konteks</span>
                    <strong class="detail-meta-val"><i class="fa-solid fa-landmark"></i> ${data.context}</strong>
                </div>
            </div>

            ${metricsHtml}

            <div class="detail-section">
                <h3 class="detail-section-title"><i class="fa-solid fa-align-left"></i> Overview</h3>
                <p class="detail-p">${data.overview}</p>
            </div>

            <div class="detail-section">
                <h3 class="detail-section-title"><i class="fa-solid fa-user-shield"></i> Peran & Tanggung Jawab</h3>
                <p class="detail-p">${data.myRole}</p>
            </div>

            <div class="detail-section">
                <h3 class="detail-section-title"><i class="fa-solid fa-list-check"></i> Ruang Lingkup Kerja</h3>
                <ul class="detail-handled-list">
                    ${data.handled.map(item => `<li><i class="fa-solid fa-circle-check"></i> <span>${item}</span></li>`).join('')}
                </ul>
            </div>

            <div class="detail-section detail-section--highlight">
                <h3 class="detail-section-title"><i class="fa-solid fa-fire-flame-curved"></i> Tantangan & Dinamika Lapangan</h3>
                <div class="detail-quote-box">
                    <p class="detail-p detail-p--quote">"${data.challenge}"</p>
                </div>
            </div>

            <div class="detail-section detail-section--takeaway">
                <h3 class="detail-section-title"><i class="fa-solid fa-lightbulb"></i> Pembelajaran & Nilai</h3>
                <p class="detail-p">${data.takeaway}</p>
            </div>
        `;

        // Render Right Column (Gallery) starting at photo 0
        renderGallery(data, 0);
    };

    const openProjectDetail = (projectId, triggeringCard) => {
        const data = PROJECT_DETAILS[projectId];
        if (!data || !overlay) return;

        currentProjectId = projectId;
        currentPhotoIndex = 0;
        lastActiveElement = triggeringCard || document.activeElement;

        renderProjectDetail(data);

        // Reset scroll position of both overlay and story panel
        overlay.scrollTop = 0;
        if (storyCol) storyCol.scrollTop = 0;

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus back button for keyboard accessibility
        if (backBtn) {
            setTimeout(() => backBtn.focus(), 60);
        }
    };

    const closeProjectDetail = () => {
        if (!overlay || !overlay.classList.contains('active')) return;

        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        currentProjectId = null;
        currentPhotoIndex = 0;

        // Return focus to triggering card
        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }
    };

    // Attach click and keyboard handlers to cards
    const projectCards = document.querySelectorAll('.project-card[data-project-id]');
    projectCards.forEach(card => {
        const pid = card.getAttribute('data-project-id');
        card.addEventListener('click', () => {
            openProjectDetail(pid, card);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectDetail(pid, card);
            }
        });
    });

    if (backBtn) backBtn.addEventListener('click', closeProjectDetail);
    if (closeBtn) closeBtn.addEventListener('click', closeProjectDetail);
    if (backdrop) backdrop.addEventListener('click', closeProjectDetail);

    // Keyboard support: ESC closes modal, Arrow keys navigate photos
    document.addEventListener('keydown', (e) => {
        if (!overlay || !overlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeProjectDetail();
        } else if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    });

});

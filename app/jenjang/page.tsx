"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  GraduationCap, BookOpen, CheckCircle2, ArrowRight, Sparkles, 
  Layers, Users, Award, ShieldCheck, FileText, MonitorCheck, 
  Clock, HelpCircle, ChevronDown, Star, UserCheck, Check, Target, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

type JenjangType = 'sd' | 'smp' | 'sma_ipa' | 'sma_ips' | 'utbk';

export default function PilihJenjangPage() {
  const [activeJenjang, setActiveJenjang] = useState<JenjangType>('utbk');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const jenjangData = {
    sd: {
      title: "Bimbel Tingkat SD: Fondasi Belajar Menyenangkan & Juara Kelas",
      subtitle: "Membentuk kebiasaan belajar positif, menguasai matematika dasar, dan membangun rasa percaya diri anak sejak dini.",
      badge: "Jenjang Sekolah Dasar (Kelas 1 - 6)",
      highlightStat: "95% Siswa Naik Peringkat Rapor",
      targetLabel: "Masuk SMP Negeri / Favorit",
      painPoint: "Anak sering kesulitan memahami konsep matematika dasar, cepat bosan dengan metode belajar konvensional, atau kewalahan mengejar materi sekolah.",
      solution: "Bimbel SG menghadirkan metode belajar interaktif berbasis permainan edukatif dan logika kreatif, didampingi guru penyabar yang dekat dengan dunia anak.",
      packages: [
        {
          name: "Paket Reguler SD",
          price: "Rp 350.000",
          originalPrice: "Rp 500.000",
          period: "Bulan",
          features: ["2x Pertemuan / Minggu", "Modul Belajar Cetak & Digital", "Pendampingan PR Harian", "Laporan Bulanan Ortu"],
          popular: false
        },
        {
          name: "Paket Intensif & CBT SD",
          price: "Rp 600.000",
          originalPrice: "Rp 850.000",
          period: "Bulan",
          features: ["3x Pertemuan / Minggu", "Akses Penuh Tryout CBT Interaktif", "Free Konsultasi Psikologi Anak", "Modul Eksklusif & Bonus Alat Tulis"],
          popular: true
        }
      ],
      mentors: [
        { name: "Kak Rina, S.Pd.", role: "Mentor Matematika & Tematik SD", edu: "Pendidikan Guru SD, Universitas Negeri Jakarta", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
        { name: "Kak Diki, S.Hum.", role: "Mentor Literasi & Bahasa", edu: "Sastra Indonesia, Universitas Indonesia", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80" }
      ],
      testimonials: [
        { name: "Ibu Dian (Wali Murid Kelas 5 SD)", text: "Anak saya jadi lebih antusias belajar matematika. Nilai rapornya naik signifikan dan tidak takut lagi kalau ada ulangan harian!", school: "SDN Menteng 01" }
      ],
      faqs: [
        { q: "Apakah metode belajarnya membuat anak cepat bosan?", a: "Tidak, kami menggunakan pendekatan visual interaktif dan games edukatif sehingga anak merasa sedang bermain sambil belajar." },
        { q: "Apakah ada laporan rutin untuk orang tua?", a: "Ya, laporan presensi dan perkembangan nilai dikirimkan secara berkala setiap bulan melalui WhatsApp dan portal orang tua." }
      ]
    },
    smp: {
      title: "Bimbel Kelas 7-9 SMP: Siap Hadapi Ujian & Sekolah Unggulan",
      subtitle: "Transisi penting menuju pola pikir analitis, persiapan ANBK, dan seleksi masuk SMA favorit.",
      badge: "Jenjang Sekolah Menengah Pertama",
      highlightStat: "89% Lolos SMA Negeri Impian",
      targetLabel: "Masuk SMA Unggulan / Favorit",
      painPoint: "Mulai masuk masa remaja dengan kurikulum yang semakin kompleks, beban tugas menumpuk, serta kebingungan dalam membagi waktu belajar.",
      solution: "Bimbel SG memberikan formula cepat memahami konsep sains & rumus matematika, latihan soal rutin berbasis CBT, serta bimbingan mental pra-remaja.",
      packages: [
        {
          name: "Paket Reguler SMP",
          price: "Rp 450.000",
          originalPrice: "Rp 650.000",
          period: "Bulan",
          features: ["2x Pertemuan / Minggu", "Modul Kurikulum Merdeka", "Akses CBT Latihan Soal", "Grup Diskusi Tugas 24/7"],
          popular: false
        },
        {
          name: "Paket Unggulan ANBK & SMA",
          price: "Rp 750.000",
          originalPrice: "Rp 1.000.000",
          period: "Bulan",
          features: ["3x Pertemuan / Minggu", "Simulasi Tryout CBT Nasional", "Bedah Soal Seleksi Sekolah Unggulan", "Klinik PR Privat Mingguan"],
          popular: true
        }
      ],
      mentors: [
        { name: "Kak Fajar, S.Si.", role: "Mentor IPA Terpadu SMP", edu: "Fakultas MIPA, Universitas Gadjah Mada", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
        { name: "Kak Siska, M.Pd.", role: "Mentor Matematika SMP", edu: "Pendidikan Matematika, UPI Bandung", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80" }
      ],
      testimonials: [
        { name: "Ahmad Rizki (Siswa Kelas 9)", text: "Berkat tryout CBT di Bimbel SG, saya jadi terbiasa dengan format ujian nasional dan berhasil lolos ke SMA Negeri pilihan pertama!", school: "SMPN 12 Jakarta" }
      ],
      faqs: [
        { q: "Apakah ada persiapan khusus untuk masuk SMA Favorit?", a: "Ya, kami memiliki modul khusus dan tryout prediktif untuk seleksi masuk SMA Negeri unggulan dan Sekolah Berasrama." }
      ]
    },
    sma_ipa: {
      title: "Bimbel SMA MIPA: Kuasai Eksakta & Tembus Fakultas Impian",
      subtitle: "Bedah tuntas rumus Fisika, Kimia, Biologi, dan Matematika Lanjut dengan trik cepat penalaran tingkat tinggi (HOTS).",
      badge: "Jenjang SMA - MIPA / Sains",
      highlightStat: "92% Lolos Saintek / Kedokteran PTN",
      targetLabel: "Fakultas Kedokteran & Teknik PTN",
      painPoint: "Materi sains yang sangat rumit, rumus menumpuk yang sulit dihafal, serta tuntutan nilai rapor tinggi untuk jalur prestasi SNBP.",
      solution: "Pengajaran berbasis logika konsep (bukan sekadar menghafal rumus), latihan soal HOTS berstandar nasional, dan strategi manajemen nilai rapor.",
      packages: [
        {
          name: "Paket Saintek Reguler",
          price: "Rp 550.000",
          originalPrice: "Rp 750.000",
          period: "Bulan",
          features: ["3x Pertemuan / Minggu", "Modul Eksklusif MIPA", "Akses Bank Soal & CBT", "Konsultasi Pemilihan Jurusan Kuliah"],
          popular: false
        },
        {
          name: "Paket Intensif SNBP & MIPA",
          price: "Rp 900.000",
          originalPrice: "Rp 1.250.000",
          period: "Bulan",
          features: ["4x Pertemuan / Minggu", "Drill Soal HOTS & Tryout IRT", "Analisis Peluang Lolos SNBP Rapor", "Private Klinik Bersama Master Teacher"],
          popular: true
        }
      ],
      mentors: [
        { name: "Dr. Hendra Kusuma", role: "Master Mentor Fisika & Kalkulus", edu: "Doktor Fisika, Universitas Indonesia", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" },
        { name: "Kak Melati, S.Si.", role: "Mentor Kimia & Biologi", edu: "Biokimia, Institut Pertanian Bogor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" }
      ],
      testimonials: [
        { name: "Kevin Pratama (Alumni SMA MIPA)", text: "Fisika dan Kimia yang tadinya paling saya takuti jadi sangat logis karena cara mengajar Master Teacher di sini luar biasa.", school: "SMAN 68 Jakarta" }
      ],
      faqs: [
        { q: "Apakah ada bimbingan khusus untuk strategi nilai rapor SNBP?", a: "Tentu, kami memetakan target nilai tiap semester agar siswa memiliki peluang besar lolos jalur tanpa tes." }
      ]
    },
    sma_ips: {
      title: "Bimbel SMA IPS: Analisis Sosial, Ekonomi, & Strategi Masuk Soshum PTN",
      subtitle: "Kuasai peta ekonomi, sosiologi, sejarah, dan literasi mendalam untuk mendominasi rumpun ujian Soshum.",
      badge: "Jenjang SMA - IPS / Sosial",
      highlightStat: "88% Lolos Jurusan Favorit Soshum UI/UGM",
      targetLabel: "Fakultas Ekonomi, Hukum & Ilmu Sosial",
      painPoint: "Kesulitan memahami analisis ekonomi kuantitatif, jenuh dengan hafalan materi sejarah yang terlalu luas, serta minimnya latihan soal penalaran.",
      solution: "Metode peta konsep visual interaktif, diskusi kasus sosial ekonomi aktual, dan latihan soal berbasis literasi tinggi.",
      packages: [
        {
          name: "Paket Soshum Reguler",
          price: "Rp 550.000",
          originalPrice: "Rp 750.000",
          period: "Bulan",
          features: ["3x Pertemuan / Minggu", "Modul Soshum Terupdate", "Akses Platform CBT Soshum", "Diskusi Kasus Ekonomi & Sosial"],
          popular: false
        },
        {
          name: "Paket Intensif Soshum Elite",
          price: "Rp 900.000",
          originalPrice: "Rp 1.250.000",
          period: "Bulan",
          features: ["4x Pertemuan / Minggu", "Simulasi UTBK Soshum Komplit", "Analisis Peta Persaingan Jurusan Favorit", "Pendampingan Essay & Wawancara PTN"],
          popular: true
        }
      ],
      mentors: [
        { name: "Kak Bagus, S.E., M.Sc.", role: "Mentor Ekonomi & Geografi", edu: "Fakultas Ekonomi & Bisnis, UI", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80" }
      ],
      testimonials: [
        { name: "Nabila Zahra", text: "Ekonomi dan Soshum dibedah dengan sangat tajam. Saya diterima di jurusan Ilmu Hukum UI berkat bimbingan di Bimbel SG!", school: "SMAN 8 Jakarta" }
      ],
      faqs: [
        { q: "Apakah anak IPS bisa lintas jurusan ke saintek?", a: "Kami menyediakan program khusus bagi siswa IPS yang ingin mengambil rumpun ujian Saintek pada seleksi SNBT." }
      ]
    },
    utbk: {
      title: "Karantina & Bimbingan Intensif UTBK-SNBT: Tiket Emas PTN Impian",
      subtitle: "Program persiapan tempur paling ditakuti pesaing! Drill soal HOTS maksimal dengan sistem penilaian IRT berstandar nasional.",
      badge: "Kelas 12 & Gap Year (Fokus SNBT)",
      highlightStat: "94% Lolos PTN Top 3 Indonesia",
      targetLabel: "UI, ITB, UGM, UNAIR & PTN Favorit",
      painPoint: "Pesaing ratusan ribu orang se-Indonesia, format soal UTBK yang berubah-ubah, dan kecemasan gagal masuk PTN impian.",
      solution: "Sistem latihan terpusat, pembahasan soal bocoran pola terbaru, analisis kelemahan per subtest menggunakan Item Response Theory (IRT), serta mental coaching.",
      packages: [
        {
          name: "Paket Tryout & CBT UTBK",
          price: "Rp 250.000",
          originalPrice: "Rp 500.000",
          period: "Paket",
          features: ["10x Tryout Nasional CBT", "Sistem Penilaian Akurat IRT", "Grafik Rapor & Pembahasan Video", "Peringkat Nasional Siswa"],
          popular: false
        },
        {
          name: "Paket Karantina SNBT Gold",
          price: "Rp 1.500.000",
          originalPrice: "Rp 2.200.000",
          period: "Program",
          features: ["Bimbingan Intensif Setiap Hari", "Full Akses CBT & Bank Soal 5 Tahun", "Strategi Jitu Pemilihan Jurusan (Porselen)", "Garansi Konsultasi Ulang Nilai"],
          popular: true
        }
      ],
      mentors: [
        { name: "Dr. Aris Setiawan", role: "Lead Master Teacher Penalaran Umum", edu: "S3 Matematika ITB, Spesialis UTBK", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
        { name: "Kak Nadia, S.Psi.", role: "Mentor Psikotes & Mental Coaching UTBK", edu: "Psikologi UI, Konselor Pendidikan", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" }
      ],
      testimonials: [
        { name: "Rian Hidayat (Mahasiswa Kedokteran UNAIR)", text: "Tryout CBT di Bimbel SG sangat mirip aslinya. Waktu ujian di sana membuat saya tidak kaget lagi saat hari H UTBK!", school: "Alumni SMAN 3 Bandung" }
      ],
      faqs: [
        { q: "Apakah sistem penilaian tryout CBT menggunakan IRT?", a: "Ya, kami menerapkan sistem Item Response Theory (IRT) persis seperti sistem resmi UTBK-SNBT nasional." },
        { q: "Apakah jadwal belajar bisa disesuaikan dengan sekolah?", a: "Terdapat pilihan kelas pagi, sore, maupun kelas khusus akhir pekan untuk mengakomodasi jadwal sekolah reguler." }
      ]
    }
  };

  const currentData = jenjangData[activeJenjang];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO SECTION KOMPLEKS & DINAMIS (TANPA GAP DI BAWAH NAVBAR) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1E3A8A] text-white overflow-hidden">
        {/* Glow & Ambient Background FX */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Dynamic Content & CTAs */}
            <motion.div 
              key={activeJenjang + "-content"}
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} /> {currentData.badge}
              </div>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight">
                {currentData.title}
              </h1>

              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {currentData.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/login">
                  <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                    Daftar Program Ini <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/cbt">
                  <Button variant="outline" className="border-slate-600 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all">
                    Coba Tes CBT Gratis
                  </Button>
                </Link>
              </div>

              {/* Mini Trust Metrics */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#D4AF37]" /> Kurikulum Terupdate
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#D4AF37]" /> Kuota Kelas Terbatas (12 Siswa)
                </div>
              </div>
            </motion.div>

            {/* Right Column: Complex Interactive Preview Card */}
            <motion.div 
              key={activeJenjang + "-card"}
              initial={{ opacity: 0, scale: 0.92, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-slate-900/70 border border-white/15 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Top Badge on Card */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse"></div>
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Live Track Status</span>
                  </div>
                  <span className="text-[11px] font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">Verified Program</span>
                </div>

                {/* Main Card Content */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Target Utama Lulus</span>
                    <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                      <Target className="text-[#D4AF37] shrink-0" size={22} />
                      {currentData.targetLabel}
                    </h3>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                      <span>Indikator Keberhasilan</span>
                      <TrendingUp size={16} />
                    </div>
                    <p className="text-sm font-semibold text-white">{currentData.highlightStat}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Fasilitas Unggulan Jenjang Ini</span>
                    <ul className="space-y-2 text-xs text-slate-300 font-light">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Modul Eksklusif & Cornell Note System</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Evaluasi Tryout CBT Berbasis IRT</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Klinik PR & Konsultasi Tanpa Batas</li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Mulai dari {currentData.packages[0].price} /bln</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Lihat Paket <ArrowRight size={14} />
                  </span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TAB INTERAKTIF PILIH JENJANG */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-6 overflow-x-auto">
          <div className="flex justify-center gap-2 min-w-max mx-auto">
            {[
              { id: 'sd', label: 'Tingkat SD' },
              { id: 'smp', label: 'Tingkat SMP' },
              { id: 'sma_ipa', label: 'SMA - MIPA' },
              { id: 'sma_ips', label: 'SMA - IPS' },
              { id: 'utbk', label: 'Intensif UTBK / SNBT' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveJenjang(tab.id as JenjangType)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeJenjang === tab.id 
                    ? 'bg-[#1E3A8A] text-[#D4AF37] shadow-lg scale-105 border border-slate-800' 
                    : 'bg-slate-100 text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div key={activeJenjang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          
          {/* 2. PAIN POINTS & SOLUTION (EMPATI & SOLUSI) */}
          <section className="py-20 bg-[#F8F9FA]">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="bg-red-50/80 border border-red-100 p-8 rounded-3xl shadow-sm">
                  <span className="text-red-700 font-bold text-xs uppercase tracking-wider mb-2 block">Tantangan Belajar</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Kendala yang Sering Dihadapi Siswa</h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-light">{currentData.painPoint}</p>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-100 p-8 rounded-3xl shadow-sm">
                  <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2 block">Solusi Bimbel SG</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Bagaimana Kami Membantu</h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-light">{currentData.solution}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. PILIHAN PROGRAM PAKET BELAJAR (PRODUCT CORE) */}
          <section className="py-20 bg-white border-y border-slate-200">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Investasi Pendidikan Terbaik</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Pilihan Paket Belajar {currentData.badge}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {currentData.packages.map((pkg, idx) => (
                  <div key={idx} className={`bg-[#F8F9FA] rounded-3xl p-8 border ${pkg.popular ? 'border-[#D4AF37] shadow-2xl relative ring-2 ring-[#D4AF37]/20 bg-white' : 'border-slate-200 shadow-md'} flex flex-col justify-between`}>
                    {pkg.popular && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                        Paling Dipilih Siswa
                      </span>
                    )}
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#1E3A8A] mb-2">{pkg.name}</h3>
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-3xl font-black text-slate-900">{pkg.price}</span>
                        <span className="text-slate-400 line-through text-sm">{pkg.originalPrice}</span>
                        <span className="text-xs text-slate-500 font-medium">/ {pkg.period}</span>
                      </div>
                      <div className="space-y-3 mb-8 border-t border-slate-200 pt-4">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <Check className="text-emerald-600 shrink-0" size={16} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href="/login">
                      <Button className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider ${pkg.popular ? 'bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 shadow-lg' : 'bg-[#1E3A8A] text-white hover:bg-slate-800'}`}>
                        Beli Paket Sekarang
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. FITUR UNGGULAN JENJANG & SISTEM CBT (VALUE PROPOSITION) */}
          <section className="py-20 bg-[#F8F9FA]">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Teknologi Pembelajaran Modern</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Fitur Unggulan & Sistem CBT Terintegrasi</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-14 h-14 bg-[#D4AF37]/15 text-[#D4AF37] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <MonitorCheck size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1E3A8A] mb-3">Simulasi Ujian Realistik</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">Tryout berbasis Computer Based Test (CBT) dengan tampilan, durasi, dan tingkat kesulitan yang dirancang sangat mirip dengan ujian aslinya.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <FileText size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1E3A8A] mb-3">Analisis Nilai Instan & IRT</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">Sistem langsung menampilkan grafik rapor belajar, evaluasi butir soal, dan pembahasan mendalam sesaat setelah ujian selesai.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1E3A8A] mb-3">Bank Soal Terupdate</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">Akses ke ribuan modul latihan soal dan bank soal komprehensif yang selalu disesuaikan dengan kurikulum nasional terbaru.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. PROFIL PENGAJAR / TENTOR (TRUST BUILDER) */}
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Master Teacher Profesional</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Tentor Berpengalaman di Jenjang Ini</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentData.mentors.map((mentor, idx) => (
                  <div key={idx} className="bg-[#F8F9FA] rounded-3xl p-6 border border-slate-200 shadow-md flex items-center gap-6">
                    <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-md" />
                    <div>
                      <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">{mentor.role}</span>
                      <h4 className="font-serif font-bold text-[#1E3A8A] text-xl mb-1">{mentor.name}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{mentor.edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. TESTIMONI & KISAH SUKSES SISWA (SOCIAL PROOF) */}
          <section className="py-20 bg-[#F8F9FA]">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Kisah Sukses Alumni</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Apa Kata Mereka yang Telah Berhasil?</h2>
              </div>

              <div className="space-y-6">
                {currentData.testimonials.map((testi, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
                    <div className="flex gap-1 text-[#D4AF37] mb-4">
                      {[...Array(5)].map((_, i) => (<Star key={i} size={16} fill="currentColor" />))}
                    </div>
                    <p className="text-slate-700 text-base font-light italic mb-6 leading-relaxed">&ldquo;{testi.text}&rdquo;</p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <h4 className="font-bold text-[#1E3A8A] text-sm">{testi.name}</h4>
                        <p className="text-xs text-slate-500">{testi.school}</p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Alumni Terverifikasi</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ KHUSUS JENJANG (PERTANYAAN UMUM) */}
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
              <div className="text-center mb-16">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md inline-flex items-center gap-1.5">
                  <HelpCircle size={14} /> Tanya Jawab
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Pertanyaan Sering Diajukan ({currentData.badge})</h2>
              </div>

              <div className="space-y-4">
                {currentData.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="bg-[#F8F9FA] rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left flex justify-between items-center gap-4 font-serif text-lg font-bold text-[#1E3A8A] hover:text-[#D4AF37] transition-colors">
                        <span>{faq.q}</span>
                        <span className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#D4AF37]/15 text-[#D4AF37]' : 'text-slate-500'}`}>
                          <ChevronDown size={18} />
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className="p-6 pt-0 text-slate-600 text-sm font-light leading-relaxed border-t border-slate-200">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
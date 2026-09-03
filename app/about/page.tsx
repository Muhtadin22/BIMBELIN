"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  ShieldCheck, Award, Target, Eye, CheckCircle2, 
  ArrowRight, History, Scale, Briefcase, Sparkles, 
  BookOpen, Users, Building2, MonitorCheck, FileCheck, Check, Trophy, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null);

  const coreValues = [
    { 
      title: 'Empathetic Teaching', 
      desc: 'Memahami karakter belajar setiap anak secara personal, membimbing dengan kesabaran, dan membangun motivasi intrinsik.', 
      icon: Users 
    },
    { 
      title: 'Result-Oriented', 
      desc: 'Berfokus penuh pada pencapaian target akademik, kenaikan nilai rapor, serta kelulusan di PTN dan sekolah favorit.', 
      icon: Award 
    },
    { 
      title: 'Adaptive Learning', 
      desc: 'Menggunakan teknologi evaluasi mutakhir seperti Item Response Theory (IRT) dan kurikulum yang selalu disesuaikan dengan perkembangan nasional.', 
      icon: Sparkles 
    }
  ];

  const legalitasList = [
    { title: 'Izin Operasional Dinas Pendidikan', desc: 'SK No. 421.9/102-Disdik/2018 resmi terakreditasi A untuk seluruh tingkat pendidikan.', icon: FileCheck },
    { title: 'Sertifikasi Nasional Pengajar', desc: '100% Master Teacher memiliki lisensi resmi mengajar dan lolos uji kompetensi materi.', icon: ShieldCheck },
    { title: 'Penghargaan Lembaga Terfavorit', desc: 'Meraih predikat Bimbel Inovatif & Berprestasi Nasional selama 3 tahun berturut-turut.', icon: Award }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Aris Setiawan, M.Sc.',
      role: 'Lead Master Teacher Penalaran Umum',
      edu: 'S3 Matematika ITB / S2 Universitas Indonesia',
      specialty: 'Penalaran Kuantitatif & UTBK SNBT',
      motto: 'Matematika bukan tentang menghafal rumus, melainkan melatih ketajaman logika berpikir.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'
    },
    {
      id: 2,
      name: 'Kak Melati, S.Si., M.Pd.',
      role: 'Senior Mentor Sains & Kimia',
      edu: 'Biokimia Institut Pertanian Bogor',
      specialty: 'Kimia Analitik & Biologi Molekuler',
      motto: 'Belajar sains itu menyenangkan jika kita tahu aplikasinya di kehidupan nyata.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
    },
    {
      id: 3,
      name: 'Kak Bagus Prasetyo, S.E.',
      role: 'Mentor Ekonomi & Soshum',
      edu: 'Fakultas Ekonomi & Bisnis Universitas Indonesia',
      specialty: 'Ekonomi Makro, Akuntansi, & Soshum UTBK',
      motto: 'Kesuksesan ujian diraih melalui strategi terukur dan konsistensi latihan.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80'
    },
    {
      id: 4,
      name: 'Kak Nadia Kusuma, S.Psi.',
      role: 'Konselor Pendidikan & Mental Coach',
      edu: 'Psikologi Universitas Gadjah Mada',
      specialty: 'Manajemen Stres Ujian & Pemilihan Jurusan PTN',
      motto: 'Kesehatan mental siswa adalah fondasi utama sebelum menaklukkan soal ujian tersulit sekalipun.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80'
    }
  ];

  const facilities = [
    { title: 'Lab Komputer CBT Modern', desc: 'Perangkat komputer berspesifikasi tinggi dengan sistem pengamanan lockdown untuk simulasi UTBK realistik.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80' },
    { title: 'Ruang Kelas Interaktif AC', desc: 'Kapasitas terbatas (maksimal 12-15 siswa) dilengkapi proyektor dan papan pintar untuk diskusi aktif.', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80' },
    { title: 'Studio Produksi Video & E-Learning', desc: 'Fasilitas rekaman digital mandiri untuk modul video pembelajaran berkualitas tinggi yang dapat diakses siswa 24/7.', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80' },
    { title: 'Perpustakaan & Ruang Diskusi', desc: 'Koleksi buku referensi terlengkap, modul latihan, serta area nyaman untuk kelompok belajar mandiri.', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* HERO SECTION ABOUT (KOMPLEKS, DINAMIS & TANPA GAP DI BAWAH NAVBAR) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1E3A8A] text-white overflow-hidden">
        {/* Glow & Ambient Background FX */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Narrative & CTAs */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} /> Otoritas, Legalitas, & Kepercayaan
              </div>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight">
                Membangun Masa Depan Gemilang Bersama <span className="text-[#D4AF37]">Bimbel SG.</span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Sejak berdiri, kami berkomitmen menjadi institusi bimbingan belajar terdepan yang memadukan dedikasi pengajar profesional dengan teknologi pendidikan mutakhir.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/login">
                  <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                    Gabung Bersama Kami <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="#values">
                  <Button variant="outline" className="border-slate-600 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all">
                    Pelajari Nilai Kami
                  </Button>
                </Link>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#D4AF37]" /> Terakreditasi A Nasional
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#D4AF37]" /> Resmi Di Bawah Hukum
                </div>
              </div>
            </motion.div>

            {/* Right Column: Complex Interactive Milestone Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-slate-900/70 border border-white/15 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse"></div>
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Institutional Metrics</span>
                  </div>
                  <span className="text-[11px] font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">Verified & Audited</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Pencapaian Utama</span>
                    <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                      <Trophy className="text-[#D4AF37] shrink-0" size={22} />
                      22+ Tahun Mengawal Prestasi Bangsa
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-2xl font-bold text-[#D4AF37] font-serif block">15.000+</span>
                      <span className="text-xs text-slate-300">Siswa Lolos PTN / Favorit</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-2xl font-bold text-white font-serif block">100+</span>
                      <span className="text-xs text-slate-300">Master Teacher Tersertifikasi</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Standar Mutu Lembaga</span>
                    <ul className="space-y-2 text-xs text-slate-300 font-light">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Kurikulum Berbasis Data & IRT CBT</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Pendampingan Mental & Psikologis Siswa</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Legalitas SK No. 421.9/102</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                    Terpercaya <CheckCircle2 size={14} />
                  </span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 1: VISION, MISSION & CORE VALUES */}
      <section id="values" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Sejarah & Filosofi</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E3A8A]">Perjalanan Menegakkan Standar Baru Pendidikan</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                Bimbel SG didirikan oleh segenap akademisi dan praktisi pendidikan yang memiliki visi besar untuk meratakan kualitas pendidikan di Indonesia. Berawal dari kelas kecil di Jakarta Selatan, kini kami telah berkembang menjadi ekosistem belajar digital dan offline yang meluncurkan ribuan siswa lolos ke PTN dan sekolah impian.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-[#D4AF37] text-3xl font-serif mb-1">15.000+</h4>
                  <p className="text-xs text-slate-500">Siswa Lulus ke PTN/Favorit</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#D4AF37] text-3xl font-serif mb-1">100+</h4>
                  <p className="text-xs text-slate-500">Master Teacher Tersertifikasi</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#1E3A8A] text-white p-8 md:p-10 rounded-3xl shadow-2xl relative border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[100px]"></div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#D4AF37]">Visi Jangka Panjang</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-8">
                &ldquo;Menjadi institusi bimbingan belajar paling terpercaya di Indonesia yang mencetak generasi unggul, berintegritas tinggi, dan siap memimpin perubahan melalui penguasaan sains dan teknologi.&rdquo;
              </p>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#D4AF37]">Misi Utama</h3>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-[#D4AF37] shrink-0 mt-0.5" /> Menyelenggarakan pembelajaran adaptif berstandar tinggi.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-[#D4AF37] shrink-0 mt-0.5" /> Mengembangkan sistem CBT dan evaluasi berbasis data (IRT).</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-[#D4AF37] shrink-0 mt-0.5" /> Membimbing mental dan motivasi siswa secara holistik.</li>
              </ul>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Pilar Nilai Lembaga</span>
            <h2 className="font-serif text-3xl text-[#1E3A8A] font-bold mt-2">Core Values Kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-[#F8F9FA] p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-[#D4AF37]/15 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-colors shadow-sm">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1E3A8A] mb-3">{val.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: LEGALITAS & AKREDITASI */}
      <section className="py-20 bg-[#F8F9FA] border-y border-slate-200">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Keamanan & Kredibilitas</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Legalitas Resmi & Akreditasi Lembaga</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Menjamin ketenangan dan keamanan investasi pendidikan orang tua siswa bersama lembaga yang sah di bawah hukum.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalitasList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1E3A8A] mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] font-mono font-bold text-[#1E3A8A] uppercase">
                    Official Verified // SG-EDU
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: TUTOR PROFILE NETWORK (MEET YOUR MENTORS) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Master Teacher Network</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Kenali Para Mentor Terbaik Kami</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Klik atau arahkan kursor pada kartu tutor untuk melihat keahlian khusus dan moto mengajar mereka.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((tutor) => {
              const isSelected = selectedTutor === tutor.id;
              return (
                <motion.div
                  key={tutor.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedTutor(isSelected ? null : tutor.id)}
                  className="bg-[#F8F9FA] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative h-72 overflow-hidden bg-slate-900">
                    <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-slate-950 px-2.5 py-1 rounded-md inline-block mb-1 shadow-sm">
                        {tutor.role}
                      </span>
                      <h3 className="font-serif text-lg font-bold">{tutor.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-slate-500 font-medium">{tutor.edu}</p>
                    <p className="text-xs text-[#1E3A8A] font-bold">{tutor.specialty}</p>
                    
                    {/* Detail Moto interaktif */}
                    <div className="pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-600 italic font-light">
                        &ldquo;{tutor.motto}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: LEARNING ENVIRONMENT & INFRASTRUCTURE GALLERY */}
      <section className="py-24 bg-[#F8F9FA] border-t border-slate-200">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Fasilitas Modern</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Lingkungan & Infrastruktur Belajar</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Didesain khusus untuk menciptakan suasana belajar yang kondusif, nyaman, dan berteknologi tinggi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
                <div className="relative h-64 overflow-hidden">
                  <img src={fac.image} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#1E3A8A]/20"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-xl font-bold text-[#1E3A8A] mb-2">{fac.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-20 bg-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left max-w-5xl">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-2">Siap Bergabung dengan Keluarga Besar Bimbel SG?</h3>
            <p className="text-slate-300 text-sm font-light">Dapatkan konsultasi gratis pemilihan program belajar dan tryout CBT pertama Anda.</p>
          </div>
          <Link href="/login">
            <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl whitespace-nowrap transition-all">
              Daftar Sekarang <ArrowRight size={16} className="inline ml-1" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
"use client";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Award, TrendingUp, Users, Search, Filter, Sparkles, 
  CheckCircle2, ArrowRight, Quote, Star, GraduationCap, School, ChevronRight, Trophy, Target 
} from 'lucide-react';
import Link from 'next/link';

export default function TestimoniPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniv, setSelectedUniv] = useState('Semua');
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(0);

  const alumniData = [
    { id: 1, name: 'Budi Pratama', school: 'SMAN 1 Jakarta', univ: 'Universitas Indonesia', major: 'Ilmu Kedokteran', year: '2025', score: '785' },
    { id: 2, name: 'Siti Rahma', school: 'SMAN 3 Bandung', univ: 'ITB', major: 'Teknik Informatika', year: '2025', score: '770' },
    { id: 3, name: 'Rian Hidayat', school: 'SMAN 8 Jakarta', univ: 'Universitas Gadjah Mada', major: 'Akuntansi', year: '2025', score: '755' },
    { id: 4, name: 'Nabila Zahra', school: 'SMAN 2 Surabaya', univ: 'Universitas Indonesia', major: 'Ilmu Hukum', year: '2025', score: '740' },
    { id: 5, name: 'Dimas Anggara', school: 'SMAN 5 Malang', univ: 'ITS Surabaya', major: 'Teknik Sipil', year: '2024', score: '735' },
    { id: 6, name: 'Aisyah Putri', school: 'SMAN 34 Jakarta', univ: 'Universitas Padjadjaran', major: 'Psikologi', year: '2025', score: '750' },
  ];

  const filteredAlumni = useMemo(() => {
    return alumniData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.major.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniv = selectedUniv === 'Semua' || item.univ.toLowerCase().includes(selectedUniv.toLowerCase());
      return matchesSearch && matchesUniv;
    });
  }, [searchTerm, selectedUniv]);

  const caseStudies = [
    {
      id: 0,
      name: 'Rizki Maulana',
      origin: 'SMAN 12 Bekasi',
      initialScore: 'Rata-rata Rapor 60 (Kategori Lemah)',
      finalScore: 'Skor UTBK 750 (Lolos Kedokteran UNAIR)',
      duration: '4 Bulan Karantina Intensif',
      story: 'Awal bergabung, Rizki memiliki kendala besar dalam memahami konsep dasar penalaran kuantitatif dan manajemen waktu ujian. Melalui metode drilling soal HOTS dan evaluasi Item Response Theory (IRT) di Bimbel SG, Rizki mendapatkan pendampingan privat mingguan hingga berhasil menaikkan skor drastis dalam waktu 4 bulan.',
      quote: 'Dulu saya pesimis bisa tembus Kedokteran. Di Bimbel SG, saya diajarkan trik logis yang membuat soal sesulit apapun jadi lebih mudah ditaklukkan.'
    },
    {
      id: 1,
      name: 'Clara Aurelia',
      origin: 'SMAN 7 Tangerang',
      initialScore: 'Skor Tryout Awal 420',
      finalScore: 'Skor UTBK 730 (Lolos Akuntansi UI)',
      duration: '6 Bulan Bimbingan Reguler',
      story: 'Clara sempat merasa kewalahan dengan materi tes literasi bahasa Inggris dan matematika. Dengan modul terstruktur dan latihan CBT reguler yang mirip ujian asli, Clara mampu mengidentifikasi kelemahannya secara real-time dan memperbaiki skor tryout setiap pekannya.',
      quote: 'Sistem CBT Bimbel SG benar-benar penyelamat. Suasana ujiannya sama persis dengan saat saya tes UTBK di kampus.'
    }
  ];

  const parentTestimonials = [
    {
      parent: 'Bapak Hendra & Ibu Wati (Orang Tua dari Fikri, Kelas 12)',
      text: 'Perubahan anak kami luar biasa. Dulu Fikri susah diatur kalau belajar mandiri di rumah. Sejak bergabung dengan Bimbel SG, ia jadi jauh lebih disiplin, rajin membuat jadwal belajar sendiri, dan fitur laporan nilai online sangat membantu kami memantau perkembangannya secara transparan.',
      highlight: 'Anak jadi lebih rajin & mandiri'
    },
    {
      parent: 'Ibu Sinta Dewi (Wali Murid Siswa Soshum)',
      text: 'Investasi pendidikan terbaik yang pernah kami keluarkan. Biayanya sangat sebanding dengan fasilitas kelas terbatas, tentor yang komunikatif, dan ketepatan prediksi soal ujian. Alhamdulillah anak kami lolos di PTN impiannya tanpa drama stres berlebihan.',
      highlight: 'Investasi biaya yang sangat efektif'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* HERO SECTION (KOMPLEKS, DINAMIS & TANPA GAP DI BAWAH NAVBAR) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1E3A8A] text-white overflow-hidden">
        {/* Glow & Ambient Background FX */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Title & Subtitle */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} /> Bukti Nyata Prestasi & Transformasi
              </div>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight">
                Kisah Sukses Alumni <span className="text-[#D4AF37]">Bimbel SG.</span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Halaman pembongkar keraguan (objection killer) terbaik yang menampilkan data statistik kelulusan, direktori alumni, hingga cerita sukses mendalam.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/login">
                  <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                    Daftar Program Sekarang <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="#walloffame">
                  <Button variant="outline" className="border-slate-600 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all">
                    Cari Data Alumni
                  </Button>
                </Link>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#D4AF37]" /> Data Kelulusan Teraudit
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-[#D4AF37]" /> 87% Lolos PTN Favorit
                </div>
              </div>
            </motion.div>

            {/* Right Column: Complex Interactive Success Metric Card */}
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
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Success Dashboard</span>
                  </div>
                  <span className="text-[11px] font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">Audited 2025</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Peningkatan Rata-rata Skor</span>
                    <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                      <TrendingUp className="text-[#D4AF37] shrink-0" size={24} />
                      +185 Poin Skor UTBK
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-2xl font-bold text-[#D4AF37] font-serif block">87%</span>
                      <span className="text-xs text-slate-300">Tingkat Kelulusan Nasional</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-2xl font-bold text-white font-serif block">34%</span>
                      <span className="text-xs text-slate-300">Tembus Fakultas Kedokteran</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Sebaran Kampus Favorit</span>
                    <ul className="space-y-2 text-xs text-slate-300 font-light">
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]" /> Universitas Indonesia (UI)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]" /> Institut Teknologi Bandung (ITB)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]" /> Universitas Gadjah Mada (UGM)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Ribuan Alumni Sukses</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                    Terbukti Nyata <Star size={14} fill="currentColor" />
                  </span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 1: SUCCESS ANALYTICS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Statistik Terverifikasi</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Dashboard Kelulusan Alumni Tahun Lalu</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Angka berbicara mengenai konsistensi kualitas bimbingan belajar kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-xl border border-slate-800 text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-2">Tingkat Kelulusan Nasional</span>
                <h3 className="text-6xl font-black text-[#D4AF37] mb-2 font-serif">87%</h3>
                <p className="text-slate-300 text-sm font-light">Alumni Lolos SNBP, SNBT, & Mandiri PTN Favorit</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                AUDITED DATA // 2025
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-8 rounded-3xl border border-slate-200 shadow-sm md:col-span-2 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#1E3A8A] mb-4">Fakultas Terfavorit Pilihan Alumni SG</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Fakultas Kedokteran & Ilmu Kesehatan</span>
                      <span className="text-[#D4AF37]">34% Alumni</span>
                    </div>
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '34%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Fakultas Teknik & Ilmu Komputer</span>
                      <span className="text-[#D4AF37]">42% Alumni</span>
                    </div>
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div className="bg-[#1E3A8A] h-full rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Fakultas Ekonomi, Bisnis & Hukum (Soshum)</span>
                      <span className="text-[#D4AF37]">24% Alumni</span>
                    </div>
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-600" /> Peningkatan rata-rata skor UTBK siswa mencapai +185 poin.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WALL OF FAME */}
      <section id="walloffame" className="py-24 bg-[#F8F9FA] border-y border-slate-200">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Direktori Interaktif</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Wall of Fame Alumni SG</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Cari nama sekolah asal atau universitas tujuan untuk melihat rekam jejak kelulusan.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Cari nama, sekolah, atau jurusan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0"><Filter size={14} /> Filter Kampus:</span>
              {['Semua', 'Universitas Indonesia', 'ITB', 'Universitas Gadjah Mada', 'ITS Surabaya'].map((univ) => (
                <button
                  key={univ}
                  onClick={() => setSelectedUniv(univ)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedUniv === univ 
                      ? 'bg-[#1E3A8A] text-[#D4AF37]' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {univ}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.length > 0 ? (
              filteredAlumni.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono font-bold bg-amber-50 text-[#D4AF37] px-2.5 py-1 rounded-md border border-amber-200">
                        Angkatan {item.year}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Skor: {item.score}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1E3A8A] mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-4"><School size={13} /> {item.school}</p>
                  </div>
                  <div className="bg-[#F8F9FA] p-3 rounded-xl border border-slate-100 mt-2">
                    <p className="text-xs font-bold text-[#1E3A8A] flex items-center gap-1">
                      <GraduationCap size={15} className="text-[#D4AF37]" /> {item.major}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.univ}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                Tidak ditemukan data alumni yang sesuai dengan pencarian &quot;{searchTerm}&quot;.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: IN-DEPTH CASE STUDIES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Transformasi Nyata</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Cerita Sukses Mendalam (Case Studies)</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Bagaimana siswa dengan keterbatasan awal berhasil menembus skor tertinggi UTBK.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1E3A8A] text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-800">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block">Studi Kasus #{activeCaseStudy! + 1}</span>
              <h3 className="font-serif text-3xl font-bold text-white">{caseStudies[activeCaseStudy!].name}</h3>
              <p className="text-xs text-slate-400">{caseStudies[activeCaseStudy!].origin}</p>
              
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs text-red-400 font-bold">Kondisi Awal: {caseStudies[activeCaseStudy!].initialScore}</div>
                <div className="text-xs text-emerald-400 font-bold">Hasil Akhir: {caseStudies[activeCaseStudy!].finalScore}</div>
                <div className="text-xs text-[#D4AF37] font-medium">Durasi: {caseStudies[activeCaseStudy!].duration}</div>
              </div>

              <div className="flex gap-2 pt-2">
                {caseStudies.map((cs, idx) => (
                  <button
                    key={cs.id}
                    onClick={() => setActiveCaseStudy(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeCaseStudy === idx ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Profil {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6">
              <Quote size={36} className="text-[#D4AF37]/40" />
              <p className="text-slate-300 text-sm leading-relaxed font-light italic">
                &ldquo;{caseStudies[activeCaseStudy!].story}&rdquo;
              </p>
              <div className="pt-4 border-t border-slate-800 text-xs font-bold text-[#D4AF37]">
                &ldquo;{caseStudies[activeCaseStudy!].quote}&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PARENT'S PERSPECTIVES */}
      <section className="py-24 bg-[#F8F9FA] border-t border-slate-200">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-amber-50 rounded-md">Perspektif Wali Murid</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] font-bold mt-3">Testimoni & Penilaian Orang Tua Siswa</h2>
            <p className="text-slate-600 text-sm font-light mt-2">Kepuasan orang tua melihat perubahan positif sikap anak dan transparansi pelaporan nilai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentTestimonials.map((parent, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={16} fill="currentColor" />))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-200">
                    {parent.highlight}
                  </span>
                  <p className="text-slate-700 text-sm font-light italic leading-relaxed mb-6">
                    &ldquo;{parent.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-[#D4AF37] font-bold flex items-center justify-center text-xs">
                    PT
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E3A8A] text-sm">{parent.parent}</h4>
                    <p className="text-xs text-slate-500">Orang Tua Terverifikasi</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left max-w-5xl">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-2">Ingin Anak Anda Menjadi Bagian dari Kisah Sukses Berikutnya?</h3>
            <p className="text-slate-300 text-sm font-light">Amankan kursi bimbingan intensif dan mulailah persiapan dari sekarang.</p>
          </div>
          <Link href="/login">
            <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl whitespace-nowrap transition-all">
              Daftar Program Sekarang <ArrowRight size={16} className="inline ml-1" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
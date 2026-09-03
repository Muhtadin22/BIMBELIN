"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  GraduationCap, Users, BookOpen, Star, Trophy, 
  Target, HeartHandshake, Brain, MapPin, Phone, AtSign 
} from 'lucide-react';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-[#F8F9FA] font-sans text-gray-800">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-24 lg:pb-32 flex flex-col-reverse lg:flex-row items-center gap-12">
        <motion.div 
          className="flex-1 text-center lg:text-left z-10"
          initial="hidden" animate="visible" variants={fadeIn}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-bold mb-6">
            <Trophy className="w-4 h-4 text-[#D4AF37]" /> Pilihan Utama Masuk PTN
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1E3A8A] leading-tight mb-6">
            Langkah Pasti Tembus <br className="hidden lg:block"/>
            <span className="text-[#D4AF37]">UI & Sekolah Favorit!</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
            Bimbingan belajar SD, SMP, dan SMA terpercaya dengan pendampingan intensif oleh tentor profesional lulusan PTN. Saatnya buktikan potensimu bersama Bimbel SG!
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button className="h-14 px-8 text-lg bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold shadow-lg shadow-[#D4AF37]/20">Hubungi Kami</Button>
            <Button variant="outline" className="h-14 px-8 text-lg bg-white text-[#1E3A8A] border-[#1E3A8A]/30 hover:bg-slate-50">Temukan Cabang Terdekat</Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 w-full"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
        >
          <div className="aspect-square max-w-lg mx-auto bg-gradient-to-tr from-[#1E3A8A]/15 to-blue-50 rounded-[3rem] shadow-2xl flex items-center justify-center p-8 relative overflow-hidden border-4 border-white">
             <GraduationCap className="w-64 h-64 text-[#1E3A8A] opacity-10 absolute" />
             <div className="z-10 text-center text-[#1E3A8A]">
               <h3 className="font-bold text-3xl mb-2">Belajar Lebih Fokus</h3>
               <p className="text-gray-600">(Ilustrasi Siswa Belajar / Guru Mengajar)</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 2. STATISTIK & REKAM JEJAK */}
      <section className="bg-[#1E3A8A] py-12 relative z-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">21K+</h3>
              <p className="text-slate-100 font-medium">Siswa Lolos UI & PTN</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">22+</h3>
              <p className="text-slate-100 font-medium">Tahun Pengalaman</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">100%</h3>
              <p className="text-slate-100 font-medium">Tentor Lulusan PTN</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">Puluhan</h3>
              <p className="text-slate-100 font-medium">Cabang Tersebar</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM JENJANG PENDIDIKAN */}
      <section id="jenjang" className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">Pilih Jenjang Target Belajarmu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami merancang kurikulum spesifik untuk setiap tahapan pendidikan agar target sekolah atau kampus impianmu tercapai.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { grade: "SD / MI", kelas: "Kelas 4, 5, 6", target: "Masuk SMP Favorit", desc: "Membangun fondasi belajar yang kuat dan persiapan berprestasi sejak dini." },
              { grade: "SMP / MTs", kelas: "Kelas 7, 8, 9", target: "Masuk SMA Favorit", desc: "Fokus pada penguasaan materi inti dan persiapan ujian sekolah terpadu." },
              { grade: "SMA / SMK & Alumni", kelas: "Kelas 10, 11, 12", target: "Masuk UI & PTN Favorit", desc: "Drilling soal UTBK/SNBT, pemantapan konsep, dan strategi jitu lolos kampus idaman.", isPopular: true }
            ].map((program, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl border-2 flex flex-col relative ${program.isPopular ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-2xl shadow-blue-950/20' : 'bg-white border-gray-200 shadow-lg text-gray-800'}`}
              >
                {program.isPopular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-slate-950 px-4 py-1 rounded-full text-sm font-bold shadow-md">Paling Diminati</span>}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-1 ${program.isPopular ? 'text-white' : 'text-[#1E3A8A]'}`}>{program.grade}</h3>
                  <p className={program.isPopular ? 'text-slate-100' : 'text-[#D4AF37] font-semibold'}>{program.kelas}</p>
                </div>
                <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${program.isPopular ? 'bg-white/10' : 'bg-[#F8F9FA]'}`}>
                  <Target className={`w-8 h-8 ${program.isPopular ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`} />
                  <div>
                    <p className={`text-sm ${program.isPopular ? 'text-slate-100' : 'text-gray-500'}`}>Target Utama:</p>
                    <p className="font-bold">{program.target}</p>
                  </div>
                </div>
                <p className={`mb-8 flex-1 leading-relaxed ${program.isPopular ? 'text-slate-100' : 'text-gray-600'}`}>{program.desc}</p>
                <Button variant={program.isPopular ? 'primary' : 'outline'} className={program.isPopular ? 'bg-[#D4AF37] hover:bg-[#C29F2E] border-none text-slate-950 font-bold' : 'w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-slate-50 font-semibold'}>Lihat Detail Program</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROFIL, KEUNGGULAN & FASILITAS */}
      <section id="keunggulan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">Memberikan Bukti, Bukan Sekadar Janji</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Lebih dari dua dekade kami berinovasi. Nikmati fasilitas layanan unggulan yang dirancang khusus untuk kemudahan belajarmu.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="bg-[#F8F9FA] p-8 rounded-[2rem] shadow-sm border border-gray-200" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="w-16 h-16 bg-[#1E3A8A]/10 rounded-2xl flex items-center justify-center mb-6 text-[#1E3A8A]">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">Klinik TENTOR</h3>
              <p className="text-gray-600 leading-relaxed">Layanan konsultasi eksklusif untuk bahas PR, tugas, dan solusi problem siswa di luar jam belajar normal <b>tanpa biaya tambahan</b>.</p>
            </motion.div>

            <motion.div className="bg-[#F8F9FA] p-8 rounded-[2rem] shadow-sm border border-gray-200" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mb-6 text-amber-700">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">Buku Panduan Cornell</h3>
              <p className="text-gray-600 leading-relaxed">Modul lengkap & up-to-date yang menerapkan <i>Cornell Note System</i>, terbukti secara ilmiah membantu siswa mengingat materi lebih lama.</p>
            </motion.div>

            <motion.div className="bg-[#F8F9FA] p-8 rounded-[2rem] shadow-sm border border-gray-200" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="w-16 h-16 bg-[#1E3A8A]/10 rounded-2xl flex items-center justify-center mb-6 text-[#1E3A8A]">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">Tes Psikologi (TPMB)</h3>
              <p className="text-gray-600 leading-relaxed">Pemetaan Minat dan Bakat untuk penjurusan kuliah, lengkap dengan sesi seminar dan konsultasi langsung dari psikolog profesional.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. PROFIL TENTOR */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">Belajar Asik Bersama Tentor Hebat</h2>
            <p className="text-gray-600 mb-6 text-lg">Bimbel SG memiliki standar seleksi pengajar yang ketat. Seluruh tentor kami adalah praktisi pendidikan dan lulusan dari PTN terkemuka.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><Users className="w-6 h-6 text-[#1E3A8A]" /> Pendekatan mengajar yang ramah & interaktif</li>
              <li className="flex items-center gap-3"><Users className="w-6 h-6 text-[#1E3A8A]" /> Ahli dalam menaklukkan soal tipe HOTS</li>
              <li className="flex items-center gap-3"><Users className="w-6 h-6 text-[#1E3A8A]" /> Siap menjadi mentor akademik & motivasi</li>
            </ul>
            <Button variant="outline" className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-slate-50 font-semibold">Kenalan dengan Tentor Kami</Button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-gray-200 rounded-3xl h-48 md:h-64 flex items-end p-4 bg-gradient-to-t from-slate-900 to-slate-400">
               <p className="text-white font-bold">Kak Dika<span className="block text-sm font-normal">Tutor Matematika (ITB)</span></p>
            </div>
            <div className="bg-gray-200 rounded-3xl h-48 md:h-64 flex items-end p-4 bg-gradient-to-t from-slate-900 to-slate-400 mt-8">
               <p className="text-white font-bold">Kak Nisa<span className="block text-sm font-normal">Tutor Biologi (UI)</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CABANG TERDEKAT */}
      <section id="cabang" className="py-24 bg-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Temukan Cabang SG Terdekatmu!</h2>
            <p className="text-slate-100 max-w-2xl mx-auto">Fasilitas nyaman dan lengkap sudah menunggumu. Temukan kami di berbagai titik strategis.</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['Akses UI', 'Depok', 'Kalisari', 'Cililitan', 'Pondok Gede', 'Pajajaran', 'Cibinong', 'Cabang Lainnya...'].map((cabang, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-2xl border border-white/20 hover:border-[#D4AF37] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  <h4 className="font-bold text-lg">{cabang}</h4>
                </div>
                {idx !== 7 && (
                  <div className="space-y-2 text-sm text-slate-100 mb-4">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> 0812-XXXX-XXXX</p>
                    <p className="flex items-center gap-2"><AtSign className="w-4 h-4" /> @sg_{cabang.toLowerCase().replace(' ', '')}</p>
                  </div>
                )}
                <Button className={`w-full text-sm h-10 py-0 font-bold ${idx === 7 ? 'bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 border-none' : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'}`} variant={idx === 7 ? 'primary' : 'outline'}>{idx === 7 ? 'Lihat Semua' : 'Detail Lokasi'}</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KISAH SUKSES ALUMNI */}
      <section id="testimoni" className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">Kisah Sukses Alumni SG</h2>
            <p className="text-gray-600">Terbukti mengantarkan ribuan siswa menuju Universitas Impian.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Fathir", univ: "Kedokteran - Universitas Indonesia", text: "Klinik Tentor sangat membantu saya mengejar materi yang tertinggal. Tutornya asik dan mudah diajak diskusi kapan saja!" },
              { name: "Sarah", univ: "SAPPK - Institut Teknologi Bandung", text: "Modul Cornell Note-nya juara. Cara meringkas materinya bikin belajar UTBK jadi lebih terstruktur dan efisien." },
              { name: "Bagas", univ: "Ilmu Komunikasi - UGM", text: "Bimbel SG beneran mendampingi sampai lulus. Seminar TPMB ngebantu banget buat mantepin pilihan jurusan." }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                className="p-8 bg-white rounded-[2rem] relative border border-gray-200 shadow-sm"
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { delay: i * 0.15 } } }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed">"{testi.text}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center font-bold text-[#1E3A8A]">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E3A8A]">{testi.name}</h4>
                    <p className="text-sm text-[#D4AF37] font-bold">{testi.univ}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#1E3A8A] py-16 text-center shadow-inner text-white">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Jangan Tunda Kesuksesanmu!</h2>
            <Button className="bg-[#D4AF37] text-slate-950 hover:bg-[#C29F2E] text-lg h-14 px-10 font-bold shadow-lg">Daftar Bimbel SG Sekarang</Button>
         </div>
      </section>

    </div>
  );
}
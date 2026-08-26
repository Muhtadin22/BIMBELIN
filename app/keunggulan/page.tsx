"use client";
import { motion } from 'framer-motion';
import { HeartHandshake, Brain, BookOpen, Clock, Users, ShieldCheck } from 'lucide-react';

export default function KeunggulanPage() {
  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h1 className="text-4xl md:text-6xl font-extrabold text-trustBlue-900 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Rahasia Sukses <br/>22+ Tahun Mengajar
          </motion.h1>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Bukan sekadar tempat les biasa. Kami membangun ekosistem belajar eksklusif yang tidak akan kamu temukan di tempat lain.
          </motion.p>
        </div>

        {/* Bento Grid Layout - Desain Premium */}
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Box 1: Klinik Tentor (Besar) */}
          <motion.div 
            className="md:col-span-2 bg-linear-to-br from-trustBlue-900 to-trustBlue-700 rounded-[2rem] p-10 text-white flex flex-col justify-end relative overflow-hidden group shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          >
            <HeartHandshake className="absolute top-10 right-10 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
            <div className="bg-energeticOrange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full w-max mb-6">Fasilitas Paling Disukai</div>
            <h3 className="text-3xl font-bold mb-4">Klinik TENTOR Sepuasnya</h3>
            <p className="text-trustBlue-100 text-lg max-w-md">Bawa PR tersulitmu, tugas menumpuk, atau soal UTBK yang membingungkan ke Klinik Tentor. Bahas secara privat di luar jam kelas tanpa dikenakan biaya sepeserpun.</p>
          </motion.div>

          {/* Box 2: TPMB */}
          <motion.div 
            className="bg-orange-50 rounded-[2rem] p-10 flex flex-col justify-center border border-orange-100 relative group"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          >
            <Brain className="w-12 h-12 text-energeticOrange-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Tes Psikologi (TPMB)</h3>
            <p className="text-gray-600">Bingung pilih jurusan? Pemetaan bakat kami dilakukan langsung oleh psikolog bersertifikat untuk mencegah salah jurusan kuliah.</p>
          </motion.div>

          {/* Box 3: Buku Cornell */}
          <motion.div 
            className="bg-blue-50 rounded-[2rem] p-10 flex flex-col justify-center border border-blue-100 relative group"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          >
            <BookOpen className="w-12 h-12 text-trustBlue-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Cornell Note System</h3>
            <p className="text-gray-600">Modul cetak kami menggunakan sistem Cornell dari Universitas Ivy League, terbukti meningkatkan memori jangka panjang.</p>
          </motion.div>

          {/* Box 4: Tentor */}
          <motion.div 
            className="md:col-span-2 bg-gray-900 rounded-[2rem] p-10 flex items-center justify-between overflow-hidden relative shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          >
            <div className="z-10">
              <ShieldCheck className="w-12 h-12 text-green-400 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">100% Pengajar Lulusan PTN</h3>
              <p className="text-gray-400 max-w-md text-lg">Hanya mereka yang telah membuktikan diri lolos PTN yang akan membimbingmu. Standar seleksi pengajar kami sangat ketat demi kualitas.</p>
            </div>
            {/* Dekorasi Angka */}
            <h1 className="absolute -right-10 -bottom-20 text-[15rem] font-black text-white/5 pointer-events-none">UI</h1>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
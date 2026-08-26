"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Target, CheckCircle2, ArrowRight, BookA } from 'lucide-react';

export default function JenjangPage() {
  const jenjangData = [
    {
      title: "SMA / SMK & Alumni",
      target: "Lolos UI & PTN Favorit",
      color: "bg-trustBlue-900 text-white",
      features: [
        "Drilling Soal UTBK / SNBT & Ujian Mandiri",
        "Rasionalisasi Nilai Rapor (SNBP)",
        "Tryout CBT Real-time berskala Nasional",
        "Konsultasi Jurusan dengan Psikolog (TPMB)",
        "Klinik Tentor Spesialis Saintek / Soshum"
      ]
    },
    {
      title: "SMP / MTs",
      target: "Masuk SMA Favorit & Prestasi",
      color: "bg-blue-50 text-trustBlue-900 border-2 border-blue-100",
      features: [
        "Penguatan Konsep Dasar Matematika & IPA",
        "Persiapan Ujian Sekolah Berstandar Nasional",
        "Buku Panduan Cornell Note System",
        "Tryout Evaluasi Bulanan Terjadwal",
        "Pemantauan Rapor Akademik Terpadu"
      ]
    },
    {
      title: "SD / MI",
      target: "Fondasi Kuat & Masuk SMP Favorit",
      color: "bg-white text-gray-800 border-2 border-gray-100 shadow-xl",
      features: [
        "Metode Belajar Fun & Interaktif",
        "Pendampingan PR Harian di Klinik Tentor",
        "Fokus Literasi & Numerasi (AKM)",
        "Pendidikan Karakter & Motivasi Belajar",
        "Modul Tematik Full Color & Mudah Dipahami"
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Special */}
        <motion.div className="text-center mb-20 relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-trustBlue-300 rounded-full blur-[100px] opacity-40"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-trustBlue-900 mb-6 relative z-10">
            Fokus Pada <span className="text-transparent bg-clip-text bg-linear-to-r from-energeticOrange-400 to-red-500">Targetmu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">Setiap jenjang memiliki tantangannya sendiri. Kami menyiapkan senjata rahasia untuk setiap tahap perjuanganmu.</p>
        </motion.div>

        {/* Detailed Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {jenjangData.map((data, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              className={`rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden group ${data.color}`}
            >
              {/* Dekorasi Background */}
              <BookA className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 group-hover:scale-110 transition-transform duration-500" />
              
              <h2 className="text-3xl font-extrabold mb-2">{data.title}</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 backdrop-blur-md w-max mb-8 font-semibold text-sm">
                <Target className="w-4 h-4" /> Target: {data.target}
              </div>

              <div className="flex-1 space-y-6 mb-10 z-10">
                <h4 className="font-bold opacity-80 uppercase tracking-wider text-sm">Yang Akan Kamu Dapatkan:</h4>
                <ul className="space-y-4">
                  {data.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 shrink-0 opacity-80" />
                      <span className="font-medium leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className={`w-full h-14 text-lg flex justify-between items-center px-6 z-10 ${i === 0 ? 'bg-energeticOrange-500 text-white hover:bg-energeticOrange-600' : 'bg-trustBlue-900 text-white'}`}>
                Pilih Program Ini <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
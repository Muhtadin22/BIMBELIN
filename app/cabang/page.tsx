"use client";
import { motion, Variants } from 'framer-motion'; // <-- PERBAIKAN: Menambahkan Variants di sini
import { Button } from '@/components/ui/Button';
import {
  Target,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Rocket,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function JenjangPage() {
  const jenjangData = [
    {
      id: "sma",
      title: "SMA / SMK & Alumni",
      subtitle: "Fokus UTBK & Ujian Mandiri",
      target: "Lolos UI & PTN Favorit",
      icon: GraduationCap,
      color: "bg-trustBlue-900 text-white",
      borderColor: "border-trustBlue-800",
      glowColor: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]", // Energetic Orange Glow
      btnColor: "bg-energeticOrange-500 hover:bg-energeticOrange-600 text-white border-none",
      features: [
        "Drilling Soal UTBK / SNBT & Ujian Mandiri",
        "Rasionalisasi Nilai Rapor (SNBP)",
        "Tryout CBT Real-time berskala Nasional",
        "Konsultasi Jurusan dengan Psikolog (TPMB)",
        "Klinik Tentor Spesialis Saintek / Soshum"
      ]
    },
    {
      id: "smp",
      title: "SMP / MTs",
      subtitle: "Fokus Ujian Sekolah",
      target: "Masuk SMA Favorit",
      icon: Rocket,
      color: "bg-blue-50 text-trustBlue-900",
      borderColor: "border-blue-200",
      glowColor: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]", // Blue Glow
      btnColor: "bg-trustBlue-900 hover:bg-trustBlue-800 text-white border-none",
      features: [
        "Penguatan Konsep Dasar Matematika & IPA",
        "Persiapan Ujian Sekolah Berstandar Nasional",
        "Buku Panduan Cornell Note System",
        "Tryout Evaluasi Bulanan Terjadwal",
        "Pemantauan Rapor Akademik Terpadu"
      ]
    },
    {
      id: "sd",
      title: "SD / MI",
      subtitle: "Fokus Literasi & Numerasi",
      target: "Masuk SMP Favorit",
      icon: BookOpen,
      color: "bg-white text-gray-800",
      borderColor: "border-gray-200",
      glowColor: "group-hover:shadow-[0_0_40px_rgba(0,0,0,0.1)]", // Subtle Gray Glow
      btnColor: "bg-white text-trustBlue-900 border-2 border-trustBlue-900 hover:bg-trustBlue-50",
      features: [
        "Metode Belajar Fun & Interaktif",
        "Pendampingan PR Harian di Klinik Tentor",
        "Fokus Literasi & Numerasi (AKM)",
        "Pendidikan Karakter & Motivasi Belajar",
        "Modul Tematik Full Color & Mudah Dipahami"
      ]
    }
  ];

  // <-- PERBAIKAN: Menambahkan tipe : Variants
  const listContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // <-- PERBAIKAN: Menambahkan tipe : Variants
  const listItem: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div className="pt-24 pb-24 bg-gray-50 min-h-screen relative overflow-hidden">

      {/* Background Ornaments (Modern Touch) */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-energeticOrange-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-blue-100 text-trustBlue-700 font-bold mb-6 shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-energeticOrange-500" />
            Kurikulum Terstruktur
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-trustBlue-900 mb-6 tracking-tight"
          >
            Fokus Pada <span className="text-transparent bg-clip-text bg-gradient-to-r from-energeticOrange-500 to-orange-400">Target Belajarmu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Setiap jenjang memiliki tantangannya sendiri. Kami menyiapkan senjata rahasia dan metodologi terbaik untuk setiap tahap perjuanganmu.
          </motion.p>
        </div>

        {/* Pricing/Level Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {jenjangData.map((data, i) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -12 }}
              className={`rounded-[2.5rem] border-2 p-1 relative group flex flex-col transition-all duration-300 ${data.borderColor} ${data.glowColor}`}
            >
              <div className={`h-full rounded-[2.2rem] p-8 md:p-10 flex flex-col ${data.color}`}>

                {/* Card Header */}
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold mb-2">{data.title}</h2>
                    <p className="opacity-80 font-medium">{data.subtitle}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <data.icon className={`w-8 h-8 ${data.id === 'sma' ? 'text-energeticOrange-400' : 'text-current'}`} />
                  </div>
                </div>

                {/* Target Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl w-max mb-8 font-bold text-sm shadow-inner ${data.id === 'sma' ? 'bg-trustBlue-800/50 text-white' : 'bg-white/50 text-trustBlue-900'}`}>
                  <Target className={`w-5 h-5 ${data.id === 'sma' ? 'text-energeticOrange-400' : 'text-energeticOrange-500'}`} />
                  Target: {data.target}
                </div>

                {/* Features List with Staggered Animation */}
                <motion.div
                  className="flex-1 mb-10"
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold opacity-70 uppercase tracking-wider text-xs mb-6">Fasilitas & Fokus Belajar:</h4>
                  <ul className="space-y-5">
                    {data.features.map((feat, idx) => (
                      <motion.li key={idx} variants={listItem} className="flex items-start gap-4">
                        <div className={`mt-0.5 rounded-full p-1 ${data.id === 'sma' ? 'bg-trustBlue-800' : 'bg-blue-100'}`}>
                          <CheckCircle2 className={`w-4 h-4 ${data.id === 'sma' ? 'text-energeticOrange-400' : 'text-trustBlue-600'}`} />
                        </div>
                        <span className="font-medium leading-relaxed opacity-90">{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Interactive CTA Button */}
                <Button
                  className={`w-full h-16 text-lg flex justify-between items-center px-8 transition-all group/btn ${data.btnColor}`}
                >
                  Pilih Program Ini
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
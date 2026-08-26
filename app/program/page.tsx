"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle2, 
  Sparkles, 
  Award, 
  BookOpen, 
  MonitorPlay, 
  Users, 
  ChevronDown 
} from 'lucide-react';

export default function ProgramPage() {
  const [activeTab, setActiveTab] = useState<'reguler' | 'intensif'>('reguler');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Data Program
  const programData = {
    reguler: [
      { 
        title: "Paket SD", 
        grade: "Kelas 4-6",
        price: "Rp 250.000", 
        period: "/bulan",
        features: ["3x Pertemuan/Minggu", "Modul Tematik Lengkap", "Konsultasi PR Kapan Saja", "Tryout Evaluasi Bulanan", "Rapor Perkembangan"] 
      },
      { 
        title: "Paket SMP", 
        grade: "Kelas 7-9",
        price: "Rp 350.000", 
        period: "/bulan",
        features: ["4x Pertemuan/Minggu", "Fokus Matematika & IPA", "Persiapan Ujian Sekolah", "Tryout Rutin Berbasis Komputer", "Sesi Motivasi Belajar"],
        isPopular: true
      },
      { 
        title: "Paket SMA", 
        grade: "Kelas 10-12",
        price: "Rp 450.000", 
        period: "/bulan",
        features: ["4x Pertemuan/Minggu", "Pilihan Saintek / Soshum", "Pemantapan Materi Esensial", "Analisis Potensi Jurusan", "Bank Soal Terupdate"] 
      }
    ],
    intensif: [
      { 
        title: "Super UTBK / SNBT", 
        grade: "Fokus PTN",
        price: "Rp 3.500.000", 
        period: "/paket",
        features: ["Belajar Setiap Hari", "Drilling Soal TPS & Literasi", "Simulasi UTBK Real-Time (CBT)", "Konsultasi Rasionalisasi SNMPTN", "Garansi Uang Kembali*"],
        isPopular: true
      },
      { 
        title: "Sekolah Kedinasan", 
        grade: "STAN, STIS, IPDN",
        price: "Rp 4.000.000", 
        period: "/paket",
        features: ["Materi SKD (TWK, TIU, TKP)", "Tes Fisik & Kesamaptaan", "Tryout Nasional Kedinasan", "Pendampingan Psikotes", "Tutor Lulusan Kedinasan"] 
      }
    ]
  };

  // Data FAQ
  const faqs = [
    { q: "Apakah ada biaya pendaftaran awal?", a: "Tidak ada biaya pendaftaran. Anda hanya perlu membayar biaya program bulanan atau paket yang dipilih." },
    { q: "Bagaimana jika saya berhalangan hadir di kelas?", a: "Kami menyediakan rekaman kelas dan tutor siap sedia di grup WhatsApp untuk membantu Anda mengejar ketertinggalan." },
    { q: "Apakah bisa pindah dari program Reguler ke Intensif?", a: "Bisa, Anda dapat melakukan *upgrade* paket kapan saja melalui admin kami dengan penyesuaian biaya." },
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section Program */}
      <section className="bg-trustBlue-900 pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trustBlue-800 text-energeticOrange-400 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" /> Kurikulum Terbaru 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Pilih Jalur Suksesmu <br/>Bersama Bimbelin
          </h1>
          <p className="text-trustBlue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Metode teruji, tutor ahli, dan fasilitas lengkap yang dirancang khusus untuk memastikan kamu selangkah lebih dekat dengan mimpimu.
          </p>
        </motion.div>
      </section>

      {/* Interactive Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 inline-flex relative">
            <button 
              onClick={() => setActiveTab('reguler')}
              className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm md:text-base transition-colors duration-300 ${activeTab === 'reguler' ? 'text-white' : 'text-gray-500 hover:text-trustBlue-900'}`}
            >
              Program Reguler
            </button>
            <button 
              onClick={() => setActiveTab('intensif')}
              className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm md:text-base transition-colors duration-300 ${activeTab === 'intensif' ? 'text-white' : 'text-gray-500 hover:text-trustBlue-900'}`}
            >
              Program Intensif
            </button>
            
            {/* Animated Tab Background */}
            <motion.div 
              className="absolute top-2 bottom-2 bg-trustBlue-900 rounded-full"
              initial={false}
              animate={{ 
                left: activeTab === 'reguler' ? '0.5rem' : '50%', 
                width: activeTab === 'reguler' ? 'calc(50% - 0.5rem)' : 'calc(50% - 0.5rem)' 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className={`grid gap-8 ${activeTab === 'reguler' ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'}`}
          >
            {programData[activeTab].map((paket, i) => (
              <motion.div 
                key={paket.title}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-[2rem] border-2 bg-white flex flex-col relative transition-all duration-300 ${paket.isPopular ? 'border-energeticOrange-500 shadow-2xl shadow-orange-500/10 scale-105 z-10' : 'border-gray-100 shadow-lg mt-4 md:mt-0'}`}
              >
                {paket.isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-energeticOrange-400 to-energeticOrange-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Award className="w-4 h-4" /> Paling Diminati
                  </span>
                )}
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-energeticOrange-500 font-semibold mb-2">{paket.grade}</p>
                  <h3 className="text-2xl font-bold text-trustBlue-900 mb-4">{paket.title}</h3>
                  <div className="flex items-baseline text-gray-900">
                    <span className="text-4xl font-extrabold">{paket.price}</span>
                    <span className="text-gray-500 font-medium ml-2">{paket.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {paket.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-6 h-6 text-trustBlue-500 shrink-0" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full text-lg h-14">{paket.isPopular ? 'Daftar Sekarang' : 'Pilih Paket'}</Button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Universal Features Section */}
      <section className="bg-trustBlue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-trustBlue-900 mb-4">Fasilitas Lengkap untuk Semua</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Apapun paket yang kamu pilih, Bimbelin memberikan dukungan penuh untuk memaksimalkan potensi belajarmu.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Modul Super Cerdas", desc: "Buku panduan cetak yang ringkas, mudah dipahami, dan sesuai standar HOTS." },
              { icon: MonitorPlay, title: "Akses LMS 24/7", desc: "Tonton ulang rekaman kelas dan kerjakan latihan soal kapan saja melalui website." },
              { icon: Users, title: "Grup Diskusi Eksklusif", desc: "Ruang tanya jawab dengan tutor dan teman sebaya untuk bahas soal-soal sulit." }
            ].map((fasilitas, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-trustBlue-100 p-3 rounded-xl text-trustBlue-700 shrink-0">
                  <fasilitas.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-trustBlue-900 mb-2">{fasilitas.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{fasilitas.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-trustBlue-900">Pertanyaan Seputar Program</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-semibold text-trustBlue-900 text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-energeticOrange-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Star, 
  Quote, 
  PlayCircle, 
  Trophy, 
  Users, 
  GraduationCap 
} from 'lucide-react';

export default function TestimoniPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Data Statistik
  const stats = [
    { icon: Trophy, value: "98%", label: "Tingkat Kelulusan PTN" },
    { icon: Users, value: "5.000+", label: "Siswa Bergabung" },
    { icon: GraduationCap, value: "1.200+", label: "Diterima di Top 10 PTN" },
  ];

  // Data Testimoni Teks
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      school: "Diterima di Kedokteran UI",
      category: "Saintek",
      text: "Tutor di Bimbelin sangat sabar dan modulnya tepat sasaran. Tryout CBT-nya benar-benar mirip dengan ujian aslinya! Rasanya mental sudah sangat siap saat hari-H.",
      rating: 5,
      initial: "B"
    },
    {
      id: 2,
      name: "Siti Aminah",
      school: "Diterima di STEI ITB",
      category: "Saintek",
      text: "Fasilitas kelasnya super nyaman. Konsultasi jurusannya juga sangat membantu saya menentukan pilihan yang tepat, dari yang awalnya bingung mau ambil apa.",
      rating: 5,
      initial: "S"
    },
    {
      id: 3,
      name: "Andi Wijaya",
      school: "Diterima di Hukum UGM",
      category: "Soshum",
      text: "Belajar dari nol sampai akhirnya bisa tembus PTN impian. Strategi belajar yang diajarkan sangat efektif, tidak cuma menghafal tapi paham konsep.",
      rating: 5,
      initial: "A"
    },
    {
      id: 4,
      name: "Rina Amelia",
      school: "Diterima di STAN",
      category: "Kedinasan",
      text: "Program kedinasannya juara! Latihan fisik dan drilling soal SKD-nya beneran dipandu sama tutor yang juga lulusan STAN. Recommended banget!",
      rating: 5,
      initial: "R"
    },
    {
      id: 5,
      name: "Kevin Pratama",
      school: "Diterima di Psikologi UI",
      category: "Soshum",
      text: "Grup diskusinya aktif banget, kalau ada soal susah tengah malam pun tutor atau teman lain sering bantu jawab. Ekosistem belajarnya sehat.",
      rating: 5,
      initial: "K"
    },
    {
      id: 6,
      name: "Nabila Putri",
      school: "Diterima di FTTM ITB",
      category: "Saintek",
      text: "Awalnya pesimis karena nilai tryout selalu jelek, tapi berkat evaluasi bulanan Bimbelin, grafiknya naik terus sampai tembus passing grade!",
      rating: 5,
      initial: "N"
    }
  ];

  const categories = ['Semua', 'Saintek', 'Soshum', 'Kedinasan'];

  const filteredTestimonials = activeFilter === 'Semua' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-trustBlue-900 pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <motion.div 
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Bukti Nyata, <br/> <span className="text-energeticOrange-400">Bukan Sekadar Janji</span>
          </h1>
          <p className="text-trustBlue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Ribuan siswa telah membuktikan bahwa dengan bimbingan yang tepat, kampus impian bukan lagi sekadar angan-angan.
          </p>
        </motion.div>
      </section>

      {/* Stats Section (Overlapping) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center pt-6 md:pt-0 first:pt-0"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.2 }}
              >
                <div className="mx-auto w-16 h-16 bg-trustBlue-50 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-energeticOrange-500" />
                </div>
                <h3 className="text-4xl font-extrabold text-trustBlue-900 mb-2">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Success Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-trustBlue-900 mb-4">Tonton Kisah Inspiratif Mereka</h2>
          <p className="text-gray-600">Perjalanan dari nol hingga memakai jas almamater kampus idaman.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((video) => (
            <motion.div 
              key={video}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-trustBlue-900/90 to-transparent z-10"></div>
              {/* Ini adalah placeholder gambar, nantinya ganti dengan thumbnail YouTube sungguhan */}
              <div className="absolute inset-0 bg-trustBlue-800 opacity-50 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 mb-4" />
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <h3 className="text-xl font-bold text-white mb-1">Perjuangan Tembus Kedokteran UI</h3>
                <p className="text-gray-300 text-sm">Alumni SMAN 1 Jakarta</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filterable Text Testimonials */}
      <section className="bg-trustBlue-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-trustBlue-900 mb-8">Ulasan Siswa & Orang Tua</h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === category 
                      ? 'bg-energeticOrange-500 text-white shadow-lg shadow-orange-500/30' 
                      : 'bg-white text-gray-600 hover:bg-trustBlue-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial Grid with Animation */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredTestimonials.map((testi) => (
                <motion.div 
                  key={testi.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-[2rem] relative shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
                >
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-trustBlue-100" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-energeticOrange-500 text-energeticOrange-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 flex-1 relative z-10 leading-relaxed">
                    "{testi.text}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6">
                    <div className="w-14 h-14 bg-gradient-to-tr from-trustBlue-600 to-trustBlue-400 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-md">
                      {testi.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-trustBlue-900">{testi.name}</h4>
                      <p className="text-sm font-semibold text-energeticOrange-500">{testi.school}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-trustBlue-900 mb-6">Jadilah Kisah Sukses Selanjutnya!</h2>
          <p className="text-gray-600 text-lg mb-10">Masa depanmu ditentukan oleh keputusanmu hari ini. Jangan tunggu sampai kelas penuh.</p>
          <Button className="h-14 text-lg px-10">Daftar Sekarang</Button>
        </div>
      </section>
      
    </div>
  );
}
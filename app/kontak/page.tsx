"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2 
} from 'lucide-react';

export default function KontakPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulasi pengiriman form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi loading 2 detik, lalu tampilkan pesan sukses
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form setelah 5 detik
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    { icon: MapPin, title: "Kantor Pusat", detail: "Jl. Pendidikan No. 123, Jakarta Selatan, 12345" },
    { icon: Phone, title: "Telepon & WhatsApp", detail: "+62 812 3456 7890" },
    { icon: Mail, title: "Email Dukungan", detail: "halo@bimbelin.com" },
    { icon: Clock, title: "Jam Operasional", detail: "Senin - Sabtu: 08.00 - 20.00 WIB" },
  ];

  return (
    <div className="bg-trustBlue-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="bg-trustBlue-900 pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-energeticOrange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Mari Terhubung <br/> Dengan Tim Kami
          </h1>
          <p className="text-trustBlue-100 text-lg max-w-2xl mx-auto">
            Punya pertanyaan seputar program, biaya, atau butuh konsultasi? Jangan ragu untuk menghubungi kami melalui form atau kontak langsung di bawah ini.
          </p>
        </motion.div>
      </section>

      {/* Main Content (Split Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info Cards */}
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 space-y-8">
              <h3 className="text-2xl font-bold text-trustBlue-900 mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-trustBlue-50 p-3 rounded-xl text-energeticOrange-500 shrink-0">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-trustBlue-900">{info.title}</h4>
                      <p className="text-gray-600 mt-1">{info.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct WA Button */}
              <div className="pt-6 border-t border-gray-100">
                <Button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 shadow-green-500/30">
                  <MessageCircle className="w-5 h-5" />
                  Chat via WhatsApp
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-48 rounded-[2rem] overflow-hidden relative shadow-md flex items-center justify-center">
              {/* Jika nanti punya link Google Maps, ganti div ini dengan iframe Google Maps */}
              <div className="absolute inset-0 bg-trustBlue-100 flex flex-col items-center justify-center text-trustBlue-700">
                <MapPin className="w-10 h-10 mb-2 opacity-50" />
                <span className="font-semibold">Area Google Maps</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 h-full relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <h3 className="text-3xl font-bold text-trustBlue-900 mb-2">Kirim Pesan</h3>
                    <p className="text-gray-500 mb-4">Isi data di bawah ini dan tim kami akan merespons maksimal dalam 1x24 jam.</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-trustBlue-900 text-sm">Nama Lengkap</label>
                        <input 
                          type="text" 
                          required
                          className="p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-energeticOrange-500/50 focus:border-energeticOrange-500 transition-all" 
                          placeholder="Budi Santoso" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-trustBlue-900 text-sm">Nomor WhatsApp</label>
                        <input 
                          type="tel" 
                          required
                          className="p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-energeticOrange-500/50 focus:border-energeticOrange-500 transition-all" 
                          placeholder="081234567890" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-trustBlue-900 text-sm">Topik Pertanyaan</label>
                      <select className="p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-energeticOrange-500/50 focus:border-energeticOrange-500 transition-all appearance-none cursor-pointer">
                        <option>Informasi Pendaftaran & Biaya</option>
                        <option>Konsultasi Jurusan / Program</option>
                        <option>Kendala Teknis (Website/Aplikasi)</option>
                        <option>Lainnya</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-trustBlue-900 text-sm">Pesan Anda</label>
                      <textarea 
                        required
                        rows={5} 
                        className="p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-energeticOrange-500/50 focus:border-energeticOrange-500 transition-all resize-none" 
                        placeholder="Tuliskan pertanyaan atau kendala Anda di sini secara detail..."
                      ></textarea>
                    </div>

                    <Button 
                      disabled={isSubmitting}
                      className="mt-4 flex items-center justify-center gap-2 py-4 text-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Mengirim Pesan...
                        </span>
                      ) : (
                        <>
                          <Send className="w-5 h-5" /> Kirim Pesan Sekarang
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-trustBlue-900 mb-4">Pesan Terkirim!</h3>
                    <p className="text-gray-600 max-w-sm mx-auto">
                      Terima kasih telah menghubungi Bimbelin. Tim kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali melalui WhatsApp atau Email.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </motion.div>
          
        </div>
      </section>

    </div>
  );
}
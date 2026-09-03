"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  GraduationCap, Mail, Lock, User, Phone, BookOpen, 
  ArrowRight, CheckCircle2, Sparkles, Users 
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    parentName: '',
    email: '',
    whatsapp: '',
    jenjang: 'utbk',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        ...formData,
        role: 'siswa_ortu', // Akun siswa & orang tua disatukan
        status: 'Aktif',
        createdAt: new Date().toISOString(),
        sppStatus: 'Lunas',
        riwayatPengerjaan: [
          { id: 1, judul: "Tryout UTBK SNBT - Paket 1", tanggal: "2026-06-01", status: "Selesai", nilai: "750", predikat: "Sangat Baik" },
          { id: 2, judul: "Latihan Soal Penalaran Kuantitatif", tanggal: "2026-06-05", status: "Selesai", nilai: "820", predikat: "Luar Biasa" }
        ]
      };

      // Simpan ke database dummy lokal (localStorage)
      const existingUsers = JSON.parse(localStorage.getItem('sg_dummy_users') || '[]');
      localStorage.setItem('sg_dummy_users', JSON.stringify([...existingUsers, newUser]));

      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto w-full relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-[#D4AF37] flex items-center justify-center font-bold shadow-md">
              <GraduationCap size={20} />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1E3A8A]">BIMBEL SG.</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} /> Pendaftaran Akun Terpadu (Siswa & Orang Tua)
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1E3A8A]">Daftar Akun Baru</h1>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10 relative overflow-hidden">
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1E3A8A]">Registrasi Berhasil! 🎉</h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto font-light">
                Akun siswa dan orang tua telah berhasil dibuat. Silakan login untuk mengakses dashboard terpadu.
              </p>
              <div className="pt-4">
                <Link href="/login">
                  <Button className="bg-[#1E3A8A] text-white hover:bg-blue-900 px-6 py-3 rounded-xl font-bold">
                    Masuk ke Halaman Login <ArrowRight size={16} className="inline ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap Siswa</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Contoh: Fathir Maulana" className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Orang Tua / Wali</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                  <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder="Contoh: Bapak Hendra" className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Login</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="fathir@student.com" className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <input type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} placeholder="0812XXXXXXXX" className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pilih Jenjang / Program</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <select name="jenjang" value={formData.jenjang} onChange={handleChange} className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer">
                      <option value="sd">Tingkat SD</option>
                      <option value="smp">Tingkat SMP</option>
                      <option value="sma_ipa">SMA - MIPA</option>
                      <option value="sma_ips">SMA - IPS</option>
                      <option value="utbk">Karantina UTBK / SNBT</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full py-4 bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase">
                {isLoading ? "Memproses Pendaftaran..." : <>Daftar Akun Terpadu <ArrowRight size={16} /></>}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
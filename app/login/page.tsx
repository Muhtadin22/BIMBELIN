"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Lock, User, BookOpen, Gavel, Settings, Users, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type RoleKey = 'siswa' | 'guru' | 'admin' | 'ortu';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleKey>('siswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const rolesConfig = {
    siswa: {
      title: 'Siswa / Peserta Didik',
      desc: 'Akses materi belajar, riwayat nilai, jadwal kelas, & ruang ujian CBT.',
      icon: BookOpen,
      color: 'border-blue-500 bg-blue-50/10 text-blue-400'
    },
    guru: {
      title: 'Guru / Tentor Akademik',
      desc: 'Membuat soal, memeriksa jawaban esai, & analisis performa siswa.',
      icon: Gavel,
      color: 'border-amber-500 bg-amber-50/10 text-amber-400'
    },
    admin: {
      title: 'Administrator Sistem',
      desc: 'Kelola data pengguna, paket soal, monitor sistem, & transaksi.',
      icon: Settings,
      color: 'border-purple-500 bg-purple-50/10 text-purple-400'
    },
    ortu: {
      title: 'Orang Tua / Wali Murid',
      desc: 'Pemantauan rapor perkembangan belajar dan presensi anak.',
      icon: Users,
      color: 'border-emerald-500 bg-emerald-50/10 text-emerald-400'
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pengalihan berdasarkan hak akses role
    alert(`Berhasil masuk sebagai ${rolesConfig[selectedRole].title}! Mengalihkan ke dashboard...`);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 pt-28 font-sans relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Kolom Kiri: Pemilihan Hak Akses Role */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-amber-400 font-bold tracking-widest uppercase text-xs">Autentikasi Terpusat</span>
            <h1 className="font-serif text-3xl font-bold text-white mt-1 mb-2">Pilih Hak Akses Masuk</h1>
            <p className="text-slate-400 text-sm font-light">Sistem akan menyesuaikan fitur dashboard sesuai dengan peran dan izin akses Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {(Object.keys(rolesConfig) as RoleKey[]).map((key) => {
              const role = rolesConfig[key];
              const Icon = role.icon;
              const isSelected = selectedRole === key;

              return (
                <div
                  key={key}
                  onClick={() => setSelectedRole(key)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'border-amber-500 bg-slate-900 shadow-lg shadow-amber-500/10 scale-[1.02]' 
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${role.color}`}>
                        <Icon size={20} />
                      </div>
                      {isSelected && <ShieldCheck size={18} className="text-amber-400" />}
                    </div>
                    <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>{role.title}</h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-light">{role.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Form Login */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="mb-6 pb-4 border-b border-slate-800">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Portal Aktif</span>
              <h3 className="font-serif font-bold text-xl text-white mt-0.5">{rolesConfig[selectedRole].title}</h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email / Nomor Induk</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input 
                    type="text" 
                    required
                    placeholder="nama@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kata Sandi (Password)</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm mt-6">
                <span>Masuk ke Dashboard</span>
                <ArrowRight size={16} />
              </Button>
            </form>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
            SECURED ACCESS // SG-EDTECH 2026
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Lock, Mail, GraduationCap, ShieldCheck, Briefcase, Users, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserRole = 'siswa' | 'ortu' | 'guru' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('siswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const rolesConfig = {
    siswa: { title: "Siswa", defaultEmail: "fathir@student.com", icon: GraduationCap },
    ortu: { title: "Orang Tua", defaultEmail: "ortu@bimbelsg.edu", icon: Users },
    guru: { title: "Guru / Tentor", defaultEmail: "tentor@bimbelsg.edu", icon: Briefcase },
    admin: { title: "Admin Pusat", defaultEmail: "admin@bimbelsg.edu", icon: ShieldCheck }
  };

  useEffect(() => {
    setEmail(rolesConfig[selectedRole].defaultEmail);
    setPassword('');
    setErrorMessage('');
  }, [selectedRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);

      if (selectedRole === 'admin') {
        if (email === 'admin@bimbelsg.edu') {
          const adminUser = { fullName: 'Super Administrator', role: 'admin', email };
          localStorage.setItem('sg_logged_in_user', JSON.stringify(adminUser));
          router.push('/dashboard');
        } else {
          setErrorMessage('Email atau sandi Admin tidak valid.');
        }
      } else if (selectedRole === 'guru') {
        const guruUser = { fullName: 'Dr. Aris Setiawan, M.Sc.', role: 'guru', email };
        localStorage.setItem('sg_logged_in_user', JSON.stringify(guruUser));
        router.push('/dashboard');
      } else if (selectedRole === 'ortu') {
        const ortuUser = { fullName: 'Bapak Hendra (Wali Murid)', role: 'ortu', email };
        localStorage.setItem('sg_logged_in_user', JSON.stringify(ortuUser));
        router.push('/dashboard');
      } else {
        // Cek akun siswa yang terdaftar via register atau default
        const registeredUsers = JSON.parse(localStorage.getItem('sg_dummy_users') || '[]');
        const matchedUser = registeredUsers.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (matchedUser || email === 'siswa@bimbelsg.edu') {
          const siswaData = matchedUser || { fullName: 'Fathir Maulana', role: 'siswa', email, jenjang: 'utbk' };
          localStorage.setItem('sg_logged_in_user', JSON.stringify(siswaData));
          router.push('/dashboard');
        } else {
          setErrorMessage('Email/sandi siswa salah atau belum terdaftar. Silakan daftar terlebih dahulu.');
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto w-full relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-[#D4AF37] flex items-center justify-center font-bold shadow-md">
              <GraduationCap size={20} />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1E3A8A]">BIMBEL SG.</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#1E3A8A]">Portal Login Terproteksi</h1>
          <p className="text-slate-600 text-sm mt-1 font-light">Pilih peran akun Anda untuk masuk ke sistem.</p>
        </div>

        {/* Tab Pemilih Role saat Login */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {(Object.keys(rolesConfig) as UserRole[]).map((roleKey) => {
            const config = rolesConfig[roleKey];
            const Icon = config.icon;
            const isSelected = selectedRole === roleKey;
            return (
              <button
                key={roleKey}
                onClick={() => setSelectedRole(roleKey)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-lg scale-105' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} className={isSelected ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'} />
                <span className="text-[11px] font-bold">{config.title}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} /> <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Akun {rolesConfig[selectedRole].title}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full py-4 bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase">
              {isLoading ? "Memverifikasi..." : <>Masuk sebagai {rolesConfig[selectedRole].title} <ArrowRight size={16} /></>}
            </Button>
          </form>

          {selectedRole === 'siswa' && (
            <div className="text-center mt-6 text-xs text-slate-600 font-light">
              Belum punya akun siswa? <Link href="/register" className="text-[#1E3A8A] font-bold hover:underline">Daftar di sini</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  ShieldAlert, Lock, BookOpen, FileText, BarChart3, 
  Calendar, DollarSign, Activity, CheckCircle2, 
  UserCheck, Settings, Award, ArrowRight, ShieldCheck, 
  Eye, Gavel, Users, AlertOctagon, LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type RoleType = 'siswa' | 'guru' | 'admin' | 'ortu';

export default function StrictDashboardPage() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<RoleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi cek sesi login dari localStorage / sessionStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('sg_user_role') as RoleType;
    if (savedRole && ['siswa', 'guru', 'admin', 'ortu'].includes(savedRole)) {
      setActiveRole(savedRole);
    } else {
      // Jika belum login, defaultkan ke siswa atau arahkan ke login
      setActiveRole('siswa'); 
    }
    setIsLoading(false);
  }, []);

  const handleSwitchRole = (role: RoleType) => {
    setActiveRole(role);
    localStorage.setItem('sg_user_role', role);
  };

  const handleLogout = () => {
    localStorage.removeItem('sg_user_role');
    router.push('/login');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">Memuat Keamanan Sistem...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 md:p-12 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* --- PANEL SIMULASI GANTI PERAN (UNTUK KEPERLUAN DEMO DUMMY) --- */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-amber-400" size={20} />
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">Simulasi Pengujian Hak Akses Ketat:</span>
              <p className="text-xs text-slate-300">Ubah peran untuk melihat isolasi keamanan menu masing-masing pengguna.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(['siswa', 'guru', 'admin', 'ortu'] as RoleType[]).map((role) => (
              <button
                key={role}
                onClick={() => handleSwitchRole(role)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeRole === role 
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' 
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {role}
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-950/50 border border-red-800/50 text-red-400 hover:bg-red-900 text-xs font-bold flex items-center gap-1 ml-4"
            >
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>

        {/* --- KONTROL TAMPILAN BERDASARKAN HAK AKSES (STRICT ISOLATION) --- */}
        <AnimatePresence mode="wait">
          
          {/* ================= 1. DASHBOARD SISWA ================= */}
          {activeRole === 'siswa' && (
            <motion.div key="siswa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 p-8 rounded-3xl border border-blue-900/50 shadow-xl flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono uppercase bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-bold">Akses Terbatas: Siswa</span>
                  <h1 className="text-3xl font-black text-white mt-2">Portal Belajar & Ruang CBT</h1>
                  <p className="text-slate-400 text-sm mt-1">Budi Santoso &bull; NIS: 20261004 &bull; Kelas 12 MIPA</p>
                </div>
                <div className="hidden md:block text-right font-mono text-xs text-slate-400">
                  <p>Security Check: <span className="text-emerald-400 font-bold">PASSED</span></p>
                  <p>Anti-Cheat Engine: <span className="text-emerald-400 font-bold">ACTIVE</span></p>
                </div>
              </div>

              {/* Menu Khusus Siswa */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <BookOpen className="text-blue-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Materi & Modul Belajar</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Akses e-book kurikulum terbaru dan video pembahasan soal UTBK.</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs font-bold">Buka Modul</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <BarChart3 className="text-emerald-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Riwayat Nilai & IRT</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Analisis statistik perkembangan skor tryout dan evaluasi butir soal.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Lihat Rapor</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <Calendar className="text-purple-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Jadwal Kelas & Bimbingan</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Kalender sesi tatap muka dan klinik tentor privat mingguan.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Cek Jadwal</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-md flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-black px-3 py-0.5 rounded-bl-xl uppercase">Secure Room</div>
                  <div>
                    <Lock className="text-amber-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Ruang Ujian CBT</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Masuk menggunakan token terbit dengan proteksi lockdown penuh.</p>
                  </div>
                  <a href="/cbt">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">Mulai Ujian</Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= 2. DASHBOARD GURU / TENTOR ================= */}
          {activeRole === 'guru' && (
            <motion.div key="guru" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 p-8 rounded-3xl border border-amber-900/50 shadow-xl flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono uppercase bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-bold">Akses Terbatas: Guru / Tentor</span>
                  <h1 className="text-3xl font-black text-white mt-2">Panel Authoring Soal & Evaluasi</h1>
                  <p className="text-slate-400 text-sm mt-1">Tim Akademik &bull; Hak Akses: Pembuatan & Koreksi</p>
                </div>
                <div className="hidden md:block text-right font-mono text-xs text-amber-400">
                  <p>Authoring Privilege: <span className="font-bold">GRANTED</span></p>
                </div>
              </div>

              {/* Menu Khusus Guru */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <FileText className="text-amber-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Buat & Terbitkan Soal</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Input manual atau import dokumen Word (.docx) dengan format token dinamis.</p>
                  </div>
                  <a href="/guru/buat-soal">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">Buka Portal Guru</Button>
                  </a>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <Gavel className="text-blue-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Periksa Jawaban Esai</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Koreksi lembar jawaban esai uraian siswa dan berikan bobot nilai kualitatif.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Koreksi Sekarang</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <BarChart3 className="text-emerald-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Analisis Performa Siswa</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Evaluasi statistik tingkat kesulitan soal dan peta pemahaman kelas.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Lihat Analisis</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= 3. DASHBOARD ADMIN ================= */}
          {activeRole === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="bg-gradient-to-r from-purple-950/40 to-slate-900 p-8 rounded-3xl border border-purple-900/50 shadow-xl flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono uppercase bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 font-bold">Akses Penuh: Administrator Sistem</span>
                  <h1 className="text-3xl font-black text-white mt-2">Pusat Kendali Infrastruktur & Transaksi</h1>
                  <p className="text-slate-400 text-sm mt-1">Super Admin &bull; Hak Akses: Tanpa Batas (Full Privileges)</p>
                </div>
                <div className="hidden md:block text-right font-mono text-xs text-purple-400">
                  <p>Database Status: <span className="text-emerald-400 font-bold">ONLINE</span></p>
                  <p>Security Level: <span className="text-red-400 font-bold">MAXIMUM</span></p>
                </div>
              </div>

              {/* Menu Khusus Admin */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <Users className="text-purple-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Manajemen Pengguna</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Kelola akun, ubah peran hak akses, atau blokir pengguna bermasalah.</p>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-xs font-bold">Kelola Pengguna</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <Settings className="text-blue-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Pengaturan Paket Soal</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Konfigurasi katalog tryout nasional dan kuota akses paket belajar.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Atur Paket</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <Activity className="text-emerald-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Monitoring Sistem</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Pantau beban server, log aktivitas ujian, dan deteksi anomali.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Monitor Server</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <DollarSign className="text-amber-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Transaksi Pembayaran</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Verifikasi invoice pembayaran paket belajar dan laporan keuangan.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Cek Keuangan</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= 4. DASHBOARD ORANG TUA ================= */}
          {activeRole === 'ortu' && (
            <motion.div key="ortu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 p-8 rounded-3xl border border-emerald-900/50 shadow-xl flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">Akses Khusus: Orang Tua / Wali</span>
                  <h1 className="text-3xl font-black text-white mt-2">Pemantauan Perkembangan Anak</h1>
                  <p className="text-slate-400 text-sm mt-1">Wali dari: Budi Santoso &bull; Mode: Pasif & Transparan</p>
                </div>
                <div className="hidden md:block text-right font-mono text-xs text-emerald-400">
                  <p>Binding Account: <span className="font-bold">VERIFIED</span></p>
                </div>
              </div>

              {/* Menu Khusus Orang Tua */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <FileText className="text-emerald-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Rapor Perkembangan Belajar</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Lihat ringkasan nilai tryout bulanan, grafik peningkatan skor, dan catatan evaluasi tentor untuk anak Anda.</p>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs font-bold">Unduh Rapor PDF</Button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <UserCheck className="text-blue-400 mb-4" size={28} />
                    <h3 className="font-bold text-lg mb-1">Presensi & Kehadiran Kelas</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">Log riwayat kehadiran harian anak pada sesi kelas bimbingan offline maupun online.</p>
                  </div>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-bold">Cek Presensi</Button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
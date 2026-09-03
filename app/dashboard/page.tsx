"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Users, ShieldCheck, BookOpen, FileText, BarChart3, 
  Calendar, DollarSign, Activity, Lock, CheckCircle2, 
  AlertCircle, UserCheck, Settings, Award, ArrowRight
} from 'lucide-react';

type RoleType = 'siswa' | 'guru' | 'admin' | 'ortu';

export default function MultiRoleDashboard() {
  const [currentRole, setCurrentRole] = useState<RoleType>('siswa');

  // --- DUMMY DATA UNTUK MASING-MASING ROLE ---
  const roleData = {
    siswa: {
      title: 'Portal Akademik Siswa',
      subtitle: 'Selamat datang, Budi Santoso (Kelas 12 MIPA 1)',
      stats: [
        { label: 'Tryout Selesai', value: '14 Paket', icon: FileText, color: 'text-blue-500' },
        { label: 'Rata-rata Skor UTBK', value: '685', icon: Award, color: 'text-emerald-500' },
        { label: 'Kehadiran Kelas', value: '98%', icon: Calendar, color: 'text-purple-500' },
      ],
      quickActions: [
        { title: 'Masuk Ruang CBT', desc: 'Lanjut ujian aktif menggunakan token.', link: '/cbt', icon: Lock, bg: 'bg-blue-600' },
        { title: 'Materi & Modul Belajar', desc: 'Unduh e-book dan video pembahasan.', link: '#', icon: BookOpen, bg: 'bg-emerald-600' },
      ]
    },
    guru: {
      title: 'Dashboard Tentor / Guru',
      subtitle: 'Panel Pembuatan Soal & Diagnostik Kelas',
      stats: [
        { label: 'Soal Terbit', value: '128 Butir', icon: FileText, color: 'text-blue-500' },
        { label: 'Siswa Dibina', value: '120 Siswa', icon: Users, color: 'text-emerald-500' },
        { label: 'Rata Kelas', value: '74.2', icon: BarChart3, color: 'text-amber-500' },
      ],
      quickActions: [
        { title: 'Buat & Terbitkan Soal', desc: 'Input soal manual atau import Word (.docx).', link: '/guru/buat-soal', icon: FileText, bg: 'bg-orange-600' },
        { title: 'Analisis Performa Kelas', desc: 'Evaluasi soal tersulit yang dijawab siswa.', link: '#', icon: BarChart3, color: 'text-blue-600', bg: 'bg-purple-600' },
      ]
    },
    admin: {
      title: 'Admin Control Center',
      subtitle: 'Manajemen Sistem, Keuangan, & Infrastruktur EdTech',
      stats: [
        { label: 'Total Pengguna', value: '1,420 Active', icon: Users, color: 'text-blue-500' },
        { label: 'Transaksi Bulan Ini', value: 'Rp 45.8 Juta', icon: DollarSign, color: 'text-emerald-500' },
        { label: 'System Health', value: '99.9% Uptime', icon: Activity, color: 'text-purple-500' },
      ],
      quickActions: [
        { title: 'Manajemen Pengguna', desc: 'Kelola hak akses Siswa, Guru, dan Ortu.', link: '#', icon: Settings, bg: 'bg-slate-800' },
        { title: 'Audit Keuangan & Transaksi', desc: 'Verifikasi pembayaran paket tryout.', link: '#', icon: DollarSign, bg: 'bg-emerald-700' },
      ]
    },
    ortu: {
      title: 'Portal Pemantauan Orang Tua',
      subtitle: 'Laporan Perkembangan & Presensi Anak (Budi Santoso)',
      stats: [
        { label: 'Peringkat Kelas', value: '3 dari 32', icon: Award, color: 'text-amber-500' },
        { label: 'Status Presensi', value: 'Hadir Tepat Waktu', icon: UserCheck, color: 'text-emerald-500' },
        { label: 'Tryout Terakhir', value: '710 (Kategori A)', icon: FileText, color: 'text-blue-500' },
      ],
      quickActions: [
        { title: 'Unduh Rapor Akademik', desc: 'Lihat rekapitulasi nilai bulanan anak.', link: '#', icon: FileText, bg: 'bg-indigo-600' },
        { title: 'Jadwal & Kehadiran', desc: 'Pantau log masuk kelas online anak.', link: '#', icon: Calendar, bg: 'bg-blue-600' },
      ]
    }
  };

  const activeData = roleData[currentRole];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- ROLE SWITCHER INTERAKTIF --- */}
        <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-2xl mb-10 flex flex-wrap gap-2 justify-center items-center">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest px-4">Simulasi Peran (RBAC):</span>
          {[
            { id: 'siswa', label: '1. Siswa' },
            { id: 'guru', label: '2. Guru / Tentor' },
            { id: 'admin', label: '3. Admin' },
            { id: 'ortu', label: '4. Orang Tua' },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => setCurrentRole(role.id as RoleType)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === role.id 
                  ? 'bg-amber-500 text-slate-950 shadow-lg scale-105' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>

        {/* --- HEADER DASHBOARD --- */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck size={14} /> Hak Akses Aktif: {currentRole.toUpperCase()}
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white">{activeData.title}</h1>
                <p className="text-slate-400 text-sm mt-1">{activeData.subtitle}</p>
              </div>
              <div className="bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 text-right">
                <span className="block text-[10px] font-mono uppercase text-slate-500">Status Sistem</span>
                <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Terhubung ke Database
                </span>
              </div>
            </div>

            {/* --- STATISTIK KARTU --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeData.stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center ${stat.color} border border-slate-800`}>
                      <Icon size={26} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- AKSI UTAMA & MENU CEPAT --- */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                <Settings size={18} className="text-amber-400" /> Menu Kontrol & Navigasi Utama ({currentRole.toUpperCase()})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeData.quickActions.map((action, idx) => {
                  const ActionIcon = action.icon;
                  return (
                    <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                      <div>
                        <div className={`w-12 h-12 rounded-xl ${action.bg} text-white flex items-center justify-center mb-4 shadow-md`}>
                          <ActionIcon size={22} />
                        </div>
                        <h4 className="font-bold text-white text-lg mb-2">{action.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed mb-6">{action.desc}</p>
                      </div>
                      <a href={action.link}>
                        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">
                          Buka Menu <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
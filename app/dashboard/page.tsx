"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  GraduationCap, Users, Briefcase, ShieldCheck, 
  MonitorCheck, Calendar, CheckCircle2, 
  FileText, DollarSign, Activity, UserCheck, Layers, LogOut,
  Video, Upload, Award, MessageSquare, Send, CheckSquare, Clock,
  Settings, Trash2, Edit, UserPlus, Ban, Database, Server, Check,
  BookOpen, PlayCircle, Download, HelpCircle, Bell, TrendingUp, FileCheck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AdminTab = 'pengguna' | 'kelas' | 'kurikulum' | 'keuangan' | 'log';
type TeacherTab = 'kelas' | 'materi' | 'penilaian' | 'komunikasi';
type StudentTab = 'pembelajaran' | 'materi' | 'tugas' | 'konsultasi';
type ParentTab = 'monitoring' | 'keuangan' | 'laporan' | 'komunikasi';

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State khusus Admin
  const [adminTab, setAdminTab] = useState<AdminTab>('pengguna');
  const [usersList, setUsersList] = useState<any[]>([
    { id: 1, fullName: "Fathir Maulana", role: "siswa", email: "fathir@student.com", status: "Aktif" },
    { id: 2, fullName: "Dr. Aris Setiawan", role: "guru", email: "tentor@bimbelsg.edu", status: "Aktif" },
    { id: 3, fullName: "Super Administrator", role: "admin", email: "admin@bimbelsg.edu", status: "Aktif" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserData, setNewUserData] = useState({ fullName: '', email: '', role: 'siswa', status: 'Aktif' });
  const [sppList, setSppList] = useState([
    { id: 1, siswa: "Fathir Maulana", orangTua: "Bapak Hendra", nominal: "Rp 1.500.000", paket: "Karantina UTBK Gold", status: "Pending" },
  ]);

  // State khusus Guru
  const [teacherTab, setTeacherTab] = useState<TeacherTab>('kelas');
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([
    { sender: 'Bapak Hendra (Wali Murid)', message: 'Selamat pagi pak, bagaimana perkembangan Fathir?', time: '08:30' },
    { sender: 'Dr. Aris Setiawan', message: 'Fathir sangat aktif dan menunjukkan progres luar biasa.', time: '08:45' }
  ]);

  // State khusus Siswa
  const [studentTab, setStudentTab] = useState<StudentTab>('pembelajaran');
  const [studentChatMsg, setStudentChatMsg] = useState('');
  const [studentChatList, setStudentChatList] = useState([
    { sender: 'Dr. Aris Setiawan (Master Teacher)', message: 'Halo Fathir, ada kendala pada soal matriks kemarin?', time: 'Kemarin' },
    { sender: 'Fathir Maulana (Anda)', message: 'Ada pak, saya masih sedikit bingung di bagian invers matriks ordo 3x3.', time: 'Kemarin' },
  ]);

  // State khusus Orang Tua (Wali Murid)
  const [parentTab, setParentTab] = useState<ParentTab>('monitoring');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [parentChatMsg, setParentChatMsg] = useState('');
  const [parentChatList, setParentChatList] = useState([
    { sender: 'Dr. Aris Setiawan (Master Teacher)', message: 'Selamat pagi Pak Hendra, Fathir menunjukkan peningkatan skor tryout yang sangat signifikan bulan ini.', time: 'Kemarin' },
    { sender: 'Bapak Hendra (Anda)', message: 'Alhamdulillah, terima kasih banyak atas bimbingannya pak selama di Bimbel SG.', time: 'Baru saja' },
  ]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('sg_logged_in_user');
    if (loggedIn) {
      setCurrentUser(JSON.parse(loggedIn));
      setLoading(false);
    } else {
      router.push('/login');
    }

    const savedUsers = localStorage.getItem('sg_admin_users');
    if (savedUsers) {
      setUsersList(JSON.parse(savedUsers));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sg_logged_in_user');
    router.push('/login');
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...usersList, { id: Date.now(), ...newUserData }];
    setUsersList(updated);
    localStorage.setItem('sg_admin_users', JSON.stringify(updated));
    setShowAddModal(false);
    setNewUserData({ fullName: '', email: '', role: 'siswa', status: 'Aktif' });
  };

  const handleDeleteUser = (id: number) => {
    const updated = usersList.filter(u => u.id !== id);
    setUsersList(updated);
    localStorage.setItem('sg_admin_users', JSON.stringify(updated));
  };

  const handleToggleStatus = (id: number) => {
    const updated = usersList.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Aktif' ? 'Nonaktif' : 'Aktif' };
      }
      return u;
    });
    setUsersList(updated);
    localStorage.setItem('sg_admin_users', JSON.stringify(updated));
  };

  const handleValidateSPP = (id: number) => {
    const updated = sppList.map(s => s.id === id ? { ...s, status: 'Lunas' } : s);
    setSppList(updated);
  };

  const handleSendParentChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentChatMsg.trim()) return;
    setParentChatList([...parentChatList, { sender: 'Bapak Hendra (Anda)', message: parentChatMsg, time: 'Baru saja' }]);
    setParentChatMsg('');
  };

  if (loading || !currentUser) {
    return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-500 font-serif">Memverifikasi Hak Akses Sistem...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans pt-24 pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. DASHBOARD ADMIN ================= */}
        {currentUser.role === 'admin' && (
          <div className="space-y-8">
            <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Admin Central Control Center</span>
                <h1 className="font-serif text-3xl font-bold">Dashboard Pengelola Sistem</h1>
                <p className="text-slate-300 text-sm font-light">Kendali penuh atas operasional website, manajemen pengguna, keuangan, dan kurikulum.</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-white/30 text-white px-4 py-3 rounded-xl relative z-10">Keluar</Button>
            </div>

            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
              {[
                { id: 'pengguna', label: '1. Manajemen Pengguna', icon: UserCheck },
                { id: 'kelas', label: '2. Kelas & Mapel', icon: Calendar },
                { id: 'kurikulum', label: '3. Konten & Kurikulum', icon: Layers },
                { id: 'keuangan', label: '4. Keuangan & SPP', icon: DollarSign },
                { id: 'log', label: '5. Log Aktivitas', icon: Activity },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = adminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAdminTab(tab.id as AdminTab)}
                    className={`flex-1 min-w-[160px] py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isActive ? 'bg-[#1E3A8A] text-[#D4AF37] shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={15} /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              {adminTab === 'pengguna' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Manajemen Akun Pengguna (CRUD)</h3>
                    <Button onClick={() => setShowAddModal(true)} className="bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5">
                      <UserPlus size={16} /> Tambah Akun
                    </Button>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase font-mono text-slate-500">
                        <th className="py-3 px-4">Nama</th><th className="py-3 px-4">Email</th><th className="py-3 px-4">Role</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {usersList.map((u: any) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="py-4 px-4 font-bold text-[#1E3A8A]">{u.fullName}</td>
                          <td className="py-4 px-4 text-slate-600 text-xs">{u.email}</td>
                          <td className="py-4 px-4"><span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-amber-50 text-[#D4AF37] border border-amber-200">{u.role}</span></td>
                          <td className="py-4 px-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${u.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{u.status}</span></td>
                          <td className="py-4 px-4 text-center space-x-2">
                            <button onClick={() => handleToggleStatus(u.id)} className="p-2 bg-slate-100 hover:bg-amber-100 text-amber-800 rounded-lg"><Ban size={15} /></button>
                            <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg"><Trash2 size={15} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {adminTab === 'kelas' && <div className="space-y-4"><h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Manajemen Kelas & Mapel</h3><p className="text-xs text-slate-600">Pengaturan jadwal kelas dan plot guru aktif.</p></div>}
              {adminTab === 'kurikulum' && <div className="space-y-4"><h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Konten & Kurikulum</h3><p className="text-xs text-slate-600">Pengelolaan bank soal utama dan silabus nasional.</p></div>}
              {adminTab === 'keuangan' && <div className="space-y-4"><h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Keuangan & SPP</h3><p className="text-xs text-slate-600">Validasi pembayaran orang tua siswa.</p></div>}
              {adminTab === 'log' && <div className="space-y-4"><h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Log Aktivitas Sistem</h3><p className="text-xs text-slate-600">Pemantauan rekam jejak sistem server.</p></div>}
            </div>

            {showAddModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
                  <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Tambah Akun</h3>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <input type="text" required value={newUserData.fullName} onChange={(e) => setNewUserData({...newUserData, fullName: e.target.value})} className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="Nama..." />
                    <input type="email" required value={newUserData.email} onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="Email..." />
                    <select value={newUserData.role} onChange={(e) => setNewUserData({...newUserData, role: e.target.value})} className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
                      <option value="siswa">Siswa</option><option value="guru">Guru</option><option value="admin">Admin</option><option value="ortu">Orang Tua</option>
                    </select>
                    <div className="flex gap-3 pt-4"><Button type="button" onClick={() => setShowAddModal(false)} variant="outline" className="w-full">Batal</Button><Button type="submit" className="w-full bg-[#D4AF37] text-slate-950 font-bold">Simpan</Button></div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 2. DASHBOARD GURU / PENGAJAR ================= */}
        {currentUser.role === 'guru' && (
          <div className="space-y-8">
            <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Portal Master Teacher</span>
                <h1 className="font-serif text-3xl font-bold">Dashboard Guru: {currentUser.fullName}</h1>
                <p className="text-slate-300 text-sm font-light">Spesialis Bidang Studi: Matematika & Penalaran</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-white/30 text-white px-4 py-3 rounded-xl relative z-10">Keluar</Button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Kelas & Absensi Hari Ini</h3>
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1E3A8A]">Kelas XII MIPA 1 - UTBK Intensif</h4>
                  <p className="text-xs text-slate-500">15 Siswa Terdaftar • Ruang Lab CBT 01</p>
                </div>
                <Button className="bg-[#1E3A8A] text-white text-xs px-4 py-2 rounded-xl">Mulai Sesi Mengajar</Button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. DASHBOARD ORANG TUA (WALI MURID) LENGKAP ================= */}
        {currentUser.role === 'ortu' && (
          <div className="space-y-8">
            
            {/* Banner Ortu */}
            <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="space-y-2 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Portal Wali Murid (Read-Only Access)</span>
                <h1 className="font-serif text-3xl font-bold">Dashboard Orang Tua: {currentUser.fullName || 'Bapak Hendra'}</h1>
                <p className="text-slate-300 text-sm font-light">Monitoring Prestasi Anak: <strong className="text-white">Fathir Maulana (Kelas 12 MIPA)</strong></p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-white/30 text-white px-4 py-3 rounded-xl relative z-10">Keluar</Button>
            </div>

            {/* Navigasi Tab Orang Tua */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
              {[
                { id: 'monitoring', label: '1. Monitoring Anak', icon: TrendingUp },
                { id: 'keuangan', label: '2. Manajemen Keuangan & SPP', icon: DollarSign },
                { id: 'laporan', label: '3. Rapor & Laporan Berkala', icon: FileCheck },
                { id: 'komunikasi', label: '4. Konsultasi & Chat Guru', icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = parentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setParentTab(tab.id as ParentTab)}
                    className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isActive ? 'bg-[#1E3A8A] text-[#D4AF37] shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* KONTEN TAB ORANG TUA */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              
              {/* MODUL 1: MONITORING ANAK (Grafik Nilai, Absensi, Evaluasi) */}
              {parentTab === 'monitoring' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Monitoring Perkembangan Akademik & Absensi</h3>
                    <p className="text-xs text-slate-500">Pemantauan nilai tryout berkala, rekap kehadiran di kelas, dan catatan evaluasi dari pengajar.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-2">
                      <div className="text-xs text-slate-500 uppercase font-mono">Skor Tryout Terbaru</div>
                      <div className="text-3xl font-black text-[#1E3A8A] font-serif">785 <span className="text-xs text-emerald-600 font-bold">+45 Poin</span></div>
                      <p className="text-xs text-slate-600">Peringkat 5 Besar Cabang Bimbel SG.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-2">
                      <div className="text-xs text-slate-500 uppercase font-mono">Riwayat Absensi Kehadiran</div>
                      <div className="text-3xl font-black text-emerald-600 font-serif">100% Hadir</div>
                      <p className="text-xs text-slate-600">Tidak pernah alpa atau terlambat bulan ini.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-2">
                      <div className="text-xs text-slate-500 uppercase font-mono">Status Kedisiplinan</div>
                      <div className="text-3xl font-black text-[#D4AF37] font-serif">Sangat Disiplin</div>
                      <p className="text-xs text-slate-600">Rekomendasi lolos Fakultas Kedokteran PTN.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-3">
                    <h4 className="font-bold text-sm text-[#1E3A8A]">Catatan Evaluasi Terbaru dari Guru</h4>
                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      &ldquo;Fathir menunjukkan pemahaman konsep matematika yang luar biasa. Pertahankan kedisiplinan dan tingkatkan latihan soal penalaran umum untuk persiapan UTBK SNBT mendatang.&rdquo;
                      <div className="mt-2 text-[11px] font-bold text-[#1E3A8A]">— Dr. Aris Setiawan, M.Sc. (Master Teacher)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODUL 2: MANAJEMEN KEUANGAN (Tagihan & Upload Bukti) */}
              {parentTab === 'keuangan' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Tagihan Biaya Bimbel & Riwayat Pembayaran</h3>
                    <p className="text-xs text-slate-500">Lihat tagihan bulanan SPP, unggah bukti transfer pembayaran, dan unduh kuitansi lunas.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-4">
                      <h4 className="font-bold text-sm text-[#1E3A8A]">Tagihan Aktif Bulan Ini</h4>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>SPP Periode Juni 2026</span>
                          <span className="text-amber-600">Belum Diverifikasi</span>
                        </div>
                        <div className="text-slate-500">Paket: Karantina UTBK Gold • Nominal: <strong>Rp 1.500.000</strong></div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase">Unggah Bukti Transfer Pembayaran</label>
                        <input type="file" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500" />
                        <Button onClick={() => setUploadSuccess(true)} className="w-full bg-[#1E3A8A] text-white text-xs py-3 rounded-xl">
                          {uploadSuccess ? "✅ Bukti Transfer Berhasil Diunggah (Menunggu Validasi Admin)" : "Kirim Bukti Pembayaran"}
                        </Button>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-4">
                      <h4 className="font-bold text-sm text-[#1E3A8A]">Riwayat Transaksi Lunas</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                          <div>
                            <div className="font-bold text-[#1E3A8A]">SPP Mei 2026</div>
                            <div className="text-slate-500 font-mono">Rp 1.500.000 • Lunas</div>
                          </div>
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-md">Terverifikasi</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                          <div>
                            <div className="font-bold text-[#1E3A8A]">SPP April 2026</div>
                            <div className="text-slate-500 font-mono">Rp 1.500.000 • Lunas</div>
                          </div>
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-md">Terverifikasi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODUL 3: KOMUNIKASI & LAPORAN (Rapor Digital Berkala) */}
              {parentTab === 'laporan' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Rapor Digital Berkala & Laporan Resmi</h3>
                    <p className="text-xs text-slate-500">Unduh rapor bulanan dan semester resmi yang diterbitkan oleh manajemen Bimbel SG.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm text-[#1E3A8A]">Rapor Bulanan Akademik — Mei 2026</h4>
                        <p className="text-xs text-slate-500">Diterbitkan oleh: Manajemen Akademik Bimbel SG</p>
                      </div>
                      <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5">
                        <Download size={14} /> Unduh Rapor PDF
                      </Button>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm text-[#1E3A8A]">Rapor Evaluasi Semester Genap 2025/2026</h4>
                        <p className="text-xs text-slate-500">Diterbitkan oleh: Manajemen Akademik Bimbel SG</p>
                      </div>
                      <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5">
                        <Download size={14} /> Unduh Rapor PDF
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODUL 4: KONSULTASI & CHAT DENGAN GURU ATAU ADMIN */}
              {parentTab === 'komunikasi' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Konsultasi & Diskusi dengan Guru / Admin</h3>
                    <p className="text-xs text-slate-500">Hubungi pengajar secara langsung untuk konsultasi perkembangan psikologis dan akademik anak.</p>
                  </div>

                  <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-slate-200 space-y-4">
                    <div className="h-64 overflow-y-auto space-y-3 pr-2">
                      {parentChatList.map((chat, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="font-bold text-[#1E3A8A]">{chat.sender} <span className="text-[10px] text-slate-400 font-normal ml-2">{chat.time}</span></div>
                          <p className="text-slate-700">{chat.message}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendParentChat} className="flex gap-2">
                      <input 
                        type="text" 
                        value={parentChatMsg}
                        onChange={(e) => setParentChatMsg(e.target.value)}
                        placeholder="Kirim pesan konsultasi kepada guru atau admin pusat..." 
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                      <Button type="submit" className="bg-[#D4AF37] text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center gap-1">
                        Kirim Pesan <Send size={14} />
                      </Button>
                    </form>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================= 4. DASHBOARD SISWA ================= */}
        {currentUser.role === 'siswa' && (
          <div className="space-y-8">
            <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="space-y-2 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Portal Belajar Siswa</span>
                <h1 className="font-serif text-3xl font-bold">Halo, {currentUser.fullName}! 👋</h1>
                <p className="text-slate-300 text-sm font-light">Program Pilihan: <strong className="text-white uppercase">{currentUser.jenjang || 'UTBK SNBT'}</strong></p>
              </div>
              <div className="flex gap-3 relative z-10">
                <Link href="/cbt">
                  <Button className="bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg">
                    Mulai Ujian CBT <MonitorCheck size={16} className="inline ml-1" />
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="border-white/30 text-white px-4 py-3 rounded-xl">Keluar</Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Riwayat Pengerjaan & Perolehan Nilai Anda</h3>
              <div className="space-y-3">
                {currentUser.riwayatPengerjaan && currentUser.riwayatPengerjaan.length > 0 ? (
                  currentUser.riwayatPengerjaan.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#1E3A8A]">{item.judul}</h4>
                        <p className="text-xs text-slate-500">Tanggal: {item.tanggal} • Status: {item.status}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-[#1E3A8A] font-serif">{item.nilai}</span>
                        <span className="block text-[10px] bg-amber-50 text-[#D4AF37] px-2 py-0.5 rounded font-bold">{item.predikat}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-500 text-xs">Belum ada riwayat pengerjaan tercatat.</div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
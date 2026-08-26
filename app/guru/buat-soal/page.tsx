"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen, Plus, Trash2, Save, Settings2, 
  CheckCircle2, UploadCloud, Info, X, Key, Layers, FileText, Calendar
} from 'lucide-react';

interface Soal {
  id: string;
  pertanyaan: string;
  opsi: string[];
  jawabanBenar: number;
}

interface PublishedExam {
  id: string;
  judul: string;
  mataPelajaran: string;
  kelas: string;
  durasi: string;
  token: string;
  totalSoal: number;
  tanggal: string;
  soal: Soal[];
}

export default function BuatSoalPage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  // State untuk menyimpan daftar semua ujian yang sudah diterbitkan
  const [publishedExams, setPublishedExams] = useState<PublishedExam[]>([]);

  // --- STATE POP-UP MODAL KUSTOM (GURU) ---
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({ isOpen: false, title: '', message: '' });

  const showAlert = (title: string, message: string) => {
    setPopup({ isOpen: true, title, message });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateRandomToken = () => {
    return 'SG' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const [pengaturan, setPengaturan] = useState({
    judul: 'Tryout SNBT 2026',
    mataPelajaran: 'Penalaran Umum (TPS)',
    kelas: '12 SMA',
    durasi: '120',
    token: 'SG2026'
  });

  const [daftarSoal, setDaftarSoal] = useState<Soal[]>([
    { id: Date.now().toString(), pertanyaan: '', opsi: ['', '', '', '', ''], jawabanBenar: 0 }
  ]);

  // Muat data riwayat ujian dari localStorage saat pertama kali dibuka
  useEffect(() => {
    const savedExams = localStorage.getItem('cbt_published_exams');
    const savedPengaturan = localStorage.getItem('cbt_pengaturan');
    
    if (savedExams) {
      setPublishedExams(JSON.parse(savedExams));
    }
    if (savedPengaturan) {
      setPengaturan(JSON.parse(savedPengaturan));
    }
  }, []);

  // --- ENGINE PARSER WORD (.DOCX) ---
  const handleImportWord = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const mammothModule = await import('mammoth');
      const mammoth = mammothModule.default ? mammothModule.default : mammothModule;
      
      const arrayBuffer = await file.arrayBuffer();
      const extract = mammoth.extractRawText || (mammoth as any).default?.extractRawText;
      
      if (!extract) throw new Error("Fungsi ekstrak tidak ditemukan.");

      const result = await extract({ arrayBuffer });
      const text = result.value;
      const lines = text.split(/\r?\n/).map((l: string) => l.trim()).filter((l: string) => l.length > 0);
      
      const newSoalList: Soal[] = [];
      let currentSoal: Partial<Soal> | null = null;
      let opsi: string[] = ['', '', '', '', ''];

      for (const line of lines) {
        const matchQ = line.match(/^Q\s*:(.*)/i);
        const matchA = line.match(/^A\s*:(.*)/i);
        const matchB = line.match(/^B\s*:(.*)/i);
        const matchC = line.match(/^C\s*:(.*)/i);
        const matchD = line.match(/^D\s*:(.*)/i);
        const matchE = line.match(/^E\s*:(.*)/i);
        const matchKunci = line.match(/^KUNCI\s*:(.*)/i);

        if (matchQ) {
          if (currentSoal && currentSoal.pertanyaan) {
            newSoalList.push({
              id: Date.now().toString() + newSoalList.length,
              pertanyaan: currentSoal.pertanyaan.trim(),
              opsi: [...opsi],
              jawabanBenar: currentSoal.jawabanBenar || 0
            });
          }
          currentSoal = { pertanyaan: matchQ[1].trim(), jawabanBenar: 0 };
          opsi = ['', '', '', '', ''];
        } 
        else if (currentSoal) {
          if (matchA) opsi[0] = matchA[1].trim();
          else if (matchB) opsi[1] = matchB[1].trim();
          else if (matchC) opsi[2] = matchC[1].trim();
          else if (matchD) opsi[3] = matchD[1].trim();
          else if (matchE) opsi[4] = matchE[1].trim();
          else if (matchKunci) {
            const k = matchKunci[1].trim().toUpperCase();
            const idx = k.charCodeAt(0) - 65;
            currentSoal.jawabanBenar = Math.max(0, Math.min(4, idx));
          } 
          else if (opsi.every(o => o === '')) {
            currentSoal.pertanyaan += '\n' + line;
          }
        }
      }

      if (currentSoal && currentSoal.pertanyaan) {
        newSoalList.push({
          id: Date.now().toString() + newSoalList.length,
          pertanyaan: currentSoal.pertanyaan.trim(),
          opsi: [...opsi],
          jawabanBenar: currentSoal.jawabanBenar || 0
        });
      }

      if (newSoalList.length > 0) {
        setDaftarSoal(newSoalList);
        showAlert("Berhasil Import", `Sukses! Berhasil membaca dan mengimpor ${newSoalList.length} soal.`);
      } else {
        showAlert("Format Tidak Sesuai", "Gagal membaca soal. Pastikan menggunakan awalan Q:, A:, B:, C:, D:, E:, dan KUNCI:");
      }
    } catch (error) {
      console.error("Error reading docx:", error);
      showAlert("Gagal Membaca File", "Terjadi kesalahan sistem saat membaca file Word (.docx).");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const tambahSoal = () => setDaftarSoal([...daftarSoal, { id: Date.now().toString(), pertanyaan: '', opsi: ['', '', '', '', ''], jawabanBenar: 0 }]);
  
  const hapusSoal = (id: string) => {
    if (daftarSoal.length > 1) setDaftarSoal(daftarSoal.filter(soal => soal.id !== id));
    else showAlert("Peringatan", "Minimal harus ada 1 soal!");
  };

  const updateSoal = (id: string, field: keyof Soal, value: any, opsiIndex?: number) => {
    setDaftarSoal(daftarSoal.map(soal => {
      if (soal.id === id) {
        if (field === 'opsi' && opsiIndex !== undefined) {
          const opsiBaru = [...soal.opsi];
          opsiBaru[opsiIndex] = value;
          return { ...soal, opsi: opsiBaru };
        }
        return { ...soal, [field]: value };
      }
      return soal;
    }));
  };

  // --- FUNGSI TERBITKAN, MASUKKAN KE LIST, RESET FORM & GANTI TOKEN ---
  const handleSimpan = () => {
    if (daftarSoal.some(s => s.pertanyaan.trim() === '')) {
      showAlert("Data Belum Lengkap", "Terdapat pertanyaan yang masih kosong!"); 
      return;
    }
    setIsPublishing(true);
    
    // Buat objek ujian baru
    const newExam: PublishedExam = {
      id: Date.now().toString(),
      judul: pengaturan.judul,
      mataPelajaran: pengaturan.mataPelajaran,
      kelas: pengaturan.kelas,
      durasi: pengaturan.durasi,
      token: pengaturan.token,
      totalSoal: daftarSoal.length,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      soal: [...daftarSoal]
    };

    // Gabungkan dengan daftar yang sudah ada
    const updatedExams = [newExam, ...publishedExams];
    setPublishedExams(updatedExams);

    // Simpan ke localStorage untuk dibaca siswa & riwayat guru
    localStorage.setItem('cbt_published_exams', JSON.stringify(updatedExams));
    localStorage.setItem('cbt_soal', JSON.stringify(daftarSoal)); // Aktif saat ini untuk siswa
    localStorage.setItem('cbt_pengaturan', JSON.stringify(pengaturan));

    setTimeout(() => { 
      setIsPublishing(false); 
      setIsSuccess(true); 
      
      // RESET FORMULIR MENJADI KOSONG
      setDaftarSoal([
        { id: Date.now().toString(), pertanyaan: '', opsi: ['', '', '', '', ''], jawabanBenar: 0 }
      ]);
      
      // TOKEN BERGANTI BARU OTOMATIS
      const newToken = generateRandomToken();
      setPengaturan(prev => ({ ...prev, token: newToken }));

      setTimeout(() => setIsSuccess(false), 3500); 
    }, 1500);
  };

  // Fungsi Hapus Ujian dari Daftar Terbit
  const handleHapusUjianTerbit = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus ujian yang sudah diterbitkan ini?")) {
      const filtered = publishedExams.filter(e => e.id !== id);
      setPublishedExams(filtered);
      localStorage.setItem('cbt_published_exams', JSON.stringify(filtered));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
      
      {/* POP-UP MODAL KUSTOM */}
      <AnimatePresence>
        {popup.isOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl text-center border border-gray-100"
            >
              <div className="w-16 h-16 bg-trustBlue-50 text-trustBlue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-energeticOrange-500" />
              </div>
              <h3 className="text-2xl font-black text-trustBlue-900 mb-2">{popup.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{popup.message}</p>
              <Button 
                onClick={() => setPopup(prev => ({ ...prev, isOpen: false }))} 
                className="w-full bg-trustBlue-900 hover:bg-trustBlue-800 text-white"
              >
                Mengerti
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL PANDUAN FORMAT WORD */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-8 rounded-3xl max-w-xl w-full shadow-2xl relative">
              <button onClick={() => setShowTemplateModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-trustBlue-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-energeticOrange-500" /> Format Penulisan Word
              </h2>
              <p className="text-gray-600 mb-6">Ketik soal di Microsoft Word Anda seperti format di bawah ini:</p>
              
              <div className="bg-gray-900 p-6 rounded-xl text-gray-300 font-mono text-sm leading-relaxed mb-8 shadow-inner">
                Q: Siapa presiden pertama Indonesia?<br/>
                A: Soeharto<br/>
                B: B.J. Habibie<br/>
                C: Ir. Soekarno<br/>
                D: Joko Widodo<br/>
                E: Megawati<br/>
                KUNCI: C
              </div>
              <Button onClick={() => setShowTemplateModal(false)} className="w-full h-12 bg-trustBlue-900 hover:bg-trustBlue-800 text-white">Saya Mengerti</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="bg-trustBlue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-energeticOrange-400" />
            <h1 className="font-bold text-xl hidden sm:block">Dashboard Guru SG</h1>
          </div>
          <div className="flex items-center gap-4">
             <input type="file" accept=".docx" ref={fileInputRef} onChange={handleImportWord} className="hidden" />
             
             <button onClick={() => setShowTemplateModal(true)} className="text-trustBlue-200 hover:text-white transition-colors p-2" title="Panduan">
               <Info className="w-6 h-6" />
             </button>
             
             <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="border-green-400 text-green-400 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 h-10 py-0 shadow-sm">
               <UploadCloud className="w-4 h-4" /> Import Word (.docx)
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-10">
        
        {/* --- DAFTAR UJIAN YANG SUDAH DITERBITKAN (RIWAYAT UJIAN) --- */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-trustBlue-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-energeticOrange-500" /> Daftar Ujian Terbit ({publishedExams.length})
            </h2>
            <span className="text-xs text-gray-500 font-medium">Ujian aktif yang dapat diakses siswa</span>
          </div>

          {publishedExams.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="font-semibold">Belum ada ujian yang diterbitkan.</p>
              <p className="text-xs text-gray-400">Buat soal di bawah dan klik "Terbitkan ke CBT".</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {publishedExams.map((exam) => (
                <motion.div 
                  key={exam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase">Aktif</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> {exam.tanggal}</span>
                    </div>
                    <h3 className="text-xl font-bold text-trustBlue-900">{exam.judul}</h3>
                    <p className="text-sm text-gray-600">
                      Kelas: <b>{exam.kelas}</b> | Mata Pelajaran: <b>{exam.mataPelajaran}</b> | Total: <b>{exam.totalSoal} Soal</b> | Durasi: <b>{exam.durasi} Menit</b>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                    <div className="bg-trustBlue-50 px-4 py-2 rounded-xl text-center border border-trustBlue-100">
                      <span className="block text-[10px] font-bold text-trustBlue-600 uppercase">Token Siswa</span>
                      <span className="font-mono text-xl font-black text-energeticOrange-600 tracking-wider">{exam.token}</span>
                    </div>
                    <button 
                      onClick={() => handleHapusUjianTerbit(exam.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Hapus Ujian"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <hr className="border-gray-200 mb-12" />

        {/* PENGATURAN PEMBUATAN SOAL BARU */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 grid md:grid-cols-3 gap-4">
          <div className="col-span-3 flex items-center gap-2 border-b pb-2 mb-2">
            <Settings2 className="w-5 h-5 text-trustBlue-600" /> <h2 className="font-bold text-trustBlue-900">Form Buat & Terbitkan Ujian Baru</h2>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Judul Tryout</label>
            <input type="text" className="w-full p-3 rounded-lg border bg-gray-50 mt-1 focus:ring-2 focus:ring-trustBlue-500 outline-none" value={pengaturan.judul} onChange={e => setPengaturan({...pengaturan, judul: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Durasi (Menit)</label>
            <input type="number" className="w-full p-3 rounded-lg border bg-gray-50 mt-1 focus:ring-2 focus:ring-trustBlue-500 outline-none" value={pengaturan.durasi} onChange={e => setPengaturan({...pengaturan, durasi: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Key className="w-3 h-3 text-energeticOrange-500"/> Token Ujian (Auto-Refresh)</label>
            <input type="text" className="w-full p-3 rounded-lg border bg-gray-50 mt-1 font-mono font-bold uppercase text-energeticOrange-600 focus:ring-2 focus:ring-energeticOrange-500 outline-none" maxLength={6} value={pengaturan.token} onChange={e => setPengaturan({...pengaturan, token: e.target.value.toUpperCase()})} />
          </div>
        </section>

        {/* DAFTAR SOAL YANG SEDANG DIBUAT */}
        <div className="space-y-6">
          <AnimatePresence>
            {daftarSoal.map((soal, index) => (
              <motion.div key={soal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg bg-trustBlue-100 text-trustBlue-900 px-4 py-1 rounded-full">Soal No. {index + 1}</h3>
                  <button onClick={() => hapusSoal(soal.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg text-sm flex gap-1 items-center font-bold transition-colors"><Trash2 className="w-4 h-4"/> Hapus</button>
                </div>
                
                <textarea rows={3} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-trustBlue-500 outline-none mb-6 font-medium whitespace-pre-wrap" placeholder="Ketik pertanyaan..." value={soal.pertanyaan} onChange={e => updateSoal(soal.id, 'pertanyaan', e.target.value)} />
                
                <div className="space-y-3 mb-6 pl-2 border-l-2 border-trustBlue-100">
                  {soal.opsi.map((opsi, idxOpsi) => (
                    <div key={idxOpsi} className="flex items-center gap-3">
                      <span className="font-black text-gray-400 w-6 text-right">{String.fromCharCode(65 + idxOpsi)}.</span>
                      <input type="text" className="flex-1 p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-trustBlue-500 outline-none" placeholder={`Opsi ${String.fromCharCode(65 + idxOpsi)}`} value={opsi} onChange={e => updateSoal(soal.id, 'opsi', e.target.value, idxOpsi)} />
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-sm font-bold text-gray-600">Pilih Kunci Jawaban Benar:</span>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <button key={idx} onClick={() => updateSoal(soal.id, 'jawabanBenar', idx)} className={`w-10 h-10 rounded-xl font-black transition-all ${soal.jawabanBenar === idx ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 transform scale-110' : 'bg-white border border-gray-300 text-gray-400 hover:bg-gray-100'}`}>
                        {String.fromCharCode(65 + idx)}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* STICKY BOTTOM ACTIONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 sticky bottom-6 z-30">
          <Button variant="outline" onClick={tambahSoal} className="flex items-center justify-center gap-2 w-full sm:w-auto border-trustBlue-600 text-trustBlue-700 h-12 bg-white">
            <Plus className="w-5 h-5" /> Tambah Soal Manual
          </Button>
          <Button onClick={handleSimpan} disabled={isPublishing} className={`flex items-center justify-center gap-2 h-12 px-8 text-lg w-full sm:w-auto transition-colors ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-energeticOrange-500 hover:bg-energeticOrange-600'}`}>
            {isPublishing ? (
               <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Menyimpan...</span>
            ) : isSuccess ? (
               <><CheckCircle2 className="w-5 h-5" /> Sukses Terbit & Form Dikosongkan!</>
            ) : (
               <><Save className="w-5 h-5" /> Terbitkan ke CBT</>
            )}
          </Button>
        </div>

      </main>
    </div>
  );
}
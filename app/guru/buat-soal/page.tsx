"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen, Plus, Trash2, Save, Settings2, 
  CheckCircle2, UploadCloud, Info, X, Key, Layers, FileText, Calendar
} from 'lucide-react';
import { supabase } from '@/utils/supabase';

interface Soal {
  id: string;
  pertanyaan: string;
  opsi: string[];
  jawabanBenar: number;
}

interface PublishedExam {
  id: number;
  judul: string;
  mata_pelajaran: string;
  kelas: string;
  durasi: number;
  token: string;
  created_at: string;
}

export default function BuatSoalPage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  const [publishedExams, setPublishedExams] = useState<PublishedExam[]>([]);

  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });
  const showAlert = (title: string, message: string) => setPopup({ isOpen: true, title, message });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateRandomToken = () => 'SG' + Math.random().toString(36).substring(2, 6).toUpperCase();

  const [pengaturan, setPengaturan] = useState({
    judul: 'Tryout SNBT 2026',
    mataPelajaran: 'Penalaran Umum (TPS)',
    kelas: '12 SMA',
    durasi: '120',
    token: generateRandomToken()
  });

  const [daftarSoal, setDaftarSoal] = useState<Soal[]>([
    { id: Date.now().toString(), pertanyaan: '', opsi: ['', '', '', '', ''], jawabanBenar: 0 }
  ]);

  // Ambil riwayat ujian dari Supabase saat load
  useEffect(() => {
    fetchExamsFromSupabase();
  }, []);

  const fetchExamsFromSupabase = async () => {
    const { data, error } = await supabase
      .from('ujian')
      .select('*')
      .order('id', { ascending: false });

    if (!error && data) {
      setPublishedExams(data);
    }
  };

  // Word Parser
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
        showAlert("Berhasil Import", `Sukses! Mengimpor ${newSoalList.length} soal dari Word.`);
      } else {
        showAlert("Format Salah", "Pastikan format awalan Q:, A:, B:, C:, D:, E:, dan KUNCI:");
      }
    } catch (error) {
      console.error(error);
      showAlert("Error", "Gagal membaca file Word .docx.");
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

  // Kirim ke Supabase
  const handleSimpan = async () => {
    if (daftarSoal.some(s => s.pertanyaan.trim() === '')) {
      showAlert("Belum Lengkap", "Terdapat pertanyaan yang masih kosong!"); 
      return;
    }
    setIsPublishing(true);

    try {
      // 1. Insert Ujian
      const { data: ujianData, error: ujianError } = await supabase
        .from('ujian')
        .insert([{
          judul: pengaturan.judul,
          mata_pelajaran: pengaturan.mataPelajaran,
          kelas: pengaturan.kelas,
          durasi: parseInt(pengaturan.durasi),
          token: pengaturan.token
        }])
        .select()
        .single();

      if (ujianError) throw ujianError;

      // 2. Insert Bank Soal
      const soalFormatted = daftarSoal.map(s => ({
        ujian_id: ujianData.id,
        pertanyaan: s.pertanyaan,
        opsi: s.opsi,
        jawaban_benar: s.jawabanBenar
      }));

      const { error: soalError } = await supabase.from('bank_soal').insert(soalFormatted);
      if (soalError) throw soalError;

      setIsSuccess(true);
      setDaftarSoal([{ id: Date.now().toString(), pertanyaan: '', opsi: ['', '', '', '', ''], jawabanBenar: 0 }]);
      setPengaturan(prev => ({ ...prev, token: generateRandomToken() }));
      fetchExamsFromSupabase();

      setTimeout(() => setIsSuccess(false), 3500);
    } catch (err: any) {
      console.error(err);
      showAlert("Gagal Terbit", err.message || "Terjadi kesalahan database.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleHapusUjianTerbit = async (id: number) => {
    if (confirm("Hapus ujian ini dari database Supabase?")) {
      const { error } = await supabase.from('ujian').delete().eq('id', id);
      if (!error) {
        fetchExamsFromSupabase();
      } else {
        showAlert("Gagal Hapus", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
      
      {/* Pop-up Modal */}
      <AnimatePresence>
        {popup.isOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
              <Info className="w-10 h-10 text-energeticOrange-500 mx-auto mb-3" />
              <h3 className="text-2xl font-black text-trustBlue-900 mb-2">{popup.title}</h3>
              <p className="text-gray-600 mb-6">{popup.message}</p>
              <Button onClick={() => setPopup(prev => ({ ...prev, isOpen: false }))} className="w-full">Mengerti</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Format Word */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl max-w-xl w-full relative">
              <button onClick={() => setShowTemplateModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><X className="w-6 h-6"/></button>
              <h2 className="text-2xl font-bold text-trustBlue-900 mb-4">Format Word (.docx)</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-gray-300 font-mono text-sm leading-relaxed mb-6">
                Q: Pertanyaan soal di sini?<br/>
                A: Opsi pertama<br/>
                B: Opsi kedua<br/>
                C: Opsi ketiga<br/>
                D: Opsi keempat<br/>
                E: Opsi kelima<br/>
                KUNCI: C
              </div>
              <Button onClick={() => setShowTemplateModal(false)} className="w-full">Tutup</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="bg-trustBlue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-energeticOrange-400" />
            <h1 className="font-bold text-xl">Dashboard Guru SG (Supabase)</h1>
          </div>
          <div className="flex items-center gap-4">
            <input type="file" accept=".docx" ref={fileInputRef} onChange={handleImportWord} className="hidden" />
            <button onClick={() => setShowTemplateModal(true)} className="text-trustBlue-200 hover:text-white p-2"><Info className="w-6 h-6"/></button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="border-green-400 text-green-400 hover:bg-green-50 flex gap-2">
              <UploadCloud className="w-4 h-4" /> Import Word
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-10">
        
        {/* Riwayat Ujian dari Supabase */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-trustBlue-900 mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-energeticOrange-500" /> Daftar Ujian Terbit Cloud ({publishedExams.length})
          </h2>

          {publishedExams.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="font-semibold">Belum ada ujian di Supabase.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {publishedExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-2xl p-6 shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase">Online (Cloud)</span>
                    <h3 className="text-xl font-bold text-trustBlue-900 mt-1">{exam.judul}</h3>
                    <p className="text-sm text-gray-600">Kelas: <b>{exam.kelas}</b> | Mapel: <b>{exam.mata_pelajaran}</b> | Durasi: <b>{exam.durasi} Menit</b></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-trustBlue-50 px-4 py-2 rounded-xl text-center border">
                      <span className="block text-[10px] font-bold text-trustBlue-600 uppercase">Token</span>
                      <span className="font-mono text-xl font-black text-energeticOrange-600">{exam.token}</span>
                    </div>
                    <button onClick={() => handleHapusUjianTerbit(exam.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <hr className="border-gray-200 mb-12" />

        {/* Form Pembuatan Soal Baru */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border mb-8 grid md:grid-cols-3 gap-4">
          <div className="col-span-3 flex items-center gap-2 border-b pb-2 mb-2">
            <Settings2 className="w-5 h-5 text-trustBlue-600" /> <h2 className="font-bold text-trustBlue-900">Form Buat & Terbitkan</h2>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Judul Tryout</label>
            <input type="text" className="w-full p-3 rounded-lg border bg-gray-50 mt-1" value={pengaturan.judul} onChange={e => setPengaturan({...pengaturan, judul: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Durasi (Menit)</label>
            <input type="number" className="w-full p-3 rounded-lg border bg-gray-50 mt-1" value={pengaturan.durasi} onChange={e => setPengaturan({...pengaturan, durasi: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Key className="w-3 h-3 text-energeticOrange-500"/> Token Aktif</label>
            <input type="text" className="w-full p-3 rounded-lg border bg-gray-50 mt-1 font-mono font-bold uppercase text-energeticOrange-600" value={pengaturan.token} onChange={e => setPengaturan({...pengaturan, token: e.target.value.toUpperCase()})} />
          </div>
        </section>

        <div className="space-y-6">
          {daftarSoal.map((soal, index) => (
            <div key={soal.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg bg-trustBlue-100 text-trustBlue-900 px-4 py-1 rounded-full">Soal No. {index + 1}</h3>
                <button onClick={() => hapusSoal(soal.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg text-sm flex gap-1 items-center font-bold"><Trash2 className="w-4 h-4"/> Hapus</button>
              </div>
              
              <textarea rows={3} className="w-full p-4 rounded-xl border bg-gray-50 mb-6" placeholder="Pertanyaan..." value={soal.pertanyaan} onChange={e => updateSoal(soal.id, 'pertanyaan', e.target.value)} />
              
              <div className="space-y-3 mb-6 pl-2 border-l-2 border-trustBlue-100">
                {soal.opsi.map((opsi, idxOpsi) => (
                  <div key={idxOpsi} className="flex items-center gap-3">
                    <span className="font-black text-gray-400 w-6 text-right">{String.fromCharCode(65 + idxOpsi)}.</span>
                    <input type="text" className="flex-1 p-3 rounded-xl border bg-gray-50" placeholder={`Opsi ${String.fromCharCode(65 + idxOpsi)}`} value={opsi} onChange={e => updateSoal(soal.id, 'opsi', e.target.value, idxOpsi)} />
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm font-bold text-gray-600">Kunci Jawaban Benar:</span>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <button key={idx} onClick={() => updateSoal(soal.id, 'jawabanBenar', idx)} className={`w-10 h-10 rounded-xl font-black transition-all ${soal.jawabanBenar === idx ? 'bg-green-500 text-white shadow-lg' : 'bg-white border text-gray-400'}`}>
                      {String.fromCharCode(65 + idx)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border sticky bottom-6 z-30">
          <Button variant="outline" onClick={tambahSoal} className="border-trustBlue-600 text-trustBlue-700 h-12"><Plus className="w-5 h-5 mr-2" /> Tambah Manual</Button>
          <Button onClick={handleSimpan} disabled={isPublishing} className="bg-energeticOrange-500 hover:bg-energeticOrange-600 text-white h-12 px-8 text-lg">
            {isPublishing ? 'Menyimpan Cloud...' : isSuccess ? 'Sukses Terbit!' : 'Terbitkan ke CBT'}
          </Button>
        </div>
      </main>
    </div>
  );
}
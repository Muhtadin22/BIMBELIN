"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  AlertTriangle, Monitor, Timer, Camera, 
  ShieldAlert, CheckSquare, Maximize, XCircle, 
  ChevronLeft, ChevronRight, CheckCircle2, Lock, Flag, Info
} from 'lucide-react';

interface Soal {
  id: string;
  pertanyaan: string;
  opsi: string[];
  jawabanBenar: number;
}

export default function CBTSystemPage() {
  // --- STATE KEAMANAN & SISTEM ---
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cheatWarnings, setCheatWarnings] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [showWarningOverlay, setShowWarningOverlay] = useState(false);
  const MAX_WARNINGS = 3;

  const [tokenInput, setTokenInput] = useState('');

  // --- STATE POP-UP MODAL KUSTOM ---
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
  }>({ isOpen: false, title: '', message: '', type: 'alert' });

  const showAlert = (title: string, message: string) => {
    setPopup({ isOpen: true, title, message, type: 'alert' });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setPopup({ isOpen: true, title, message, type: 'confirm', onConfirm });
  };

  // --- STATE DATA UJIAN ---
  const [questions, setQuestions] = useState<Soal[]>([]);
  const [pengaturan, setPengaturan] = useState({ judul: 'Ujian CBT Bimbel SG', durasi: '120' });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [raguRagu, setRaguRagu] = useState<Record<string, boolean>>({});
  
  const [timeLeft, setTimeLeft] = useState(7200);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // --- INISIALISASI DATA ---
  useEffect(() => {
    const savedSoal = localStorage.getItem('cbt_soal');
    const savedPengaturan = localStorage.getItem('cbt_pengaturan');
    const draftAnswers = localStorage.getItem('cbt_draft_answers');
    const draftRagu = localStorage.getItem('cbt_draft_ragu');
    
    if (savedSoal) setQuestions(JSON.parse(savedSoal));
    else {
      setQuestions([{ id: '1', pertanyaan: 'Data ujian belum tersedia.', opsi: ['A', 'B', 'C', 'D', 'E'], jawabanBenar: 0 }]);
    }
    
    if (savedPengaturan) {
      const parsedConfig = JSON.parse(savedPengaturan);
      setPengaturan(parsedConfig);
      setTimeLeft(parseInt(parsedConfig.durasi) * 60);
    }

    if (draftAnswers) setAnswers(JSON.parse(draftAnswers));
    if (draftRagu) setRaguRagu(JSON.parse(draftRagu));
  }, []);

  // --- AUTO-SAVE ---
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('cbt_draft_answers', JSON.stringify(answers));
    }
    if (Object.keys(raguRagu).length > 0) {
      localStorage.setItem('cbt_draft_ragu', JSON.stringify(raguRagu));
    }
  }, [answers, raguRagu]);

  // --- TIMER ---
  const handleAutoSubmit = useCallback(() => {
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.jawabanBenar) correctCount++; });
    setScore(Math.round((correctCount / questions.length) * 100));
    setIsFinished(true);
    if (document.fullscreenElement) document.exitFullscreen();
  }, [answers, questions]);

  useEffect(() => {
    if (!isExamStarted || isFinished || isDisqualified) return;
    
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isExamStarted, isFinished, isDisqualified, handleAutoSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- FUNGSI UTAMA UJIAN ---
  const startExam = async () => {
    if (tokenInput.trim() === '') { 
      showAlert("Token Kosong", "Silakan masukkan Token Ujian terlebih dahulu!"); 
      return; 
    }
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setIsExamStarted(true);
      }
    } catch (err) {
      showAlert("Kesalahan Tampilan", "Browser Anda tidak mendukung Layar Penuh.");
    }
  };

  const handleNext = () => { if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1); };
  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (raguRagu[questionId]) toggleRagu(questionId);
  };

  const toggleRagu = (questionId: string) => {
    setRaguRagu(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleManualFinish = () => {
    showConfirm(
      "Konfirmasi Selesai",
      "Apakah Anda yakin ingin menyelesaikan ujian sekarang? Sisa waktu Anda masih ada.",
      () => handleAutoSubmit()
    );
  };

  // --- ENGINE ANTI-CHEAT ---
  useEffect(() => {
    if (!isExamStarted || isDisqualified || isFinished) return;
    const triggerWarning = () => {
      setCheatWarnings((prev) => {
        const newCount = prev + 1;
        if (newCount >= MAX_WARNINGS) {
          setIsDisqualified(true);
          if (document.fullscreenElement) document.exitFullscreen();
        } else setShowWarningOverlay(true);
        return newCount;
      });
    };

    const handleVisibilityChange = () => { if (document.hidden) triggerWarning(); };
    const handleFullscreenChange = () => { if (!document.fullscreenElement) { setIsFullscreen(false); triggerWarning(); } };
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleCopyPaste = (e: ClipboardEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'p'))) e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExamStarted, isDisqualified, isFinished]);


  return (
    <div className="min-h-screen bg-gray-100 select-none relative font-sans">
      
      {/* --- KOMPONEN POP-UP MODAL KUSTOM (SISWA) --- */}
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

              <div className="flex gap-3 justify-center">
                {popup.type === 'confirm' ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => setPopup(prev => ({ ...prev, isOpen: false }))} 
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button 
                      onClick={() => { popup.onConfirm?.(); setPopup(prev => ({ ...prev, isOpen: false })); }} 
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Ya, Lanjutkan
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setPopup(prev => ({ ...prev, isOpen: false }))} 
                    className="w-full bg-trustBlue-900 hover:bg-trustBlue-800 text-white"
                  >
                    Mengerti
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. DISKUALIFIKASI */}
      {isDisqualified && (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4 select-none absolute inset-0 z-40">
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg border-2 border-red-500">
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-black text-red-600 mb-4">UJIAN DIHENTIKAN!</h1>
            <p className="text-gray-700 mb-6">Anda terdeteksi melakukan pelanggaran (keluar layar / pindah tab) sebanyak 3 kali.</p>
            <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50" onClick={() => window.location.href = '/'}>Kembali</Button>
          </div>
        </div>
      )}

      {/* 2. HASIL UJIAN */}
      {isFinished && (
        <div className="min-h-screen bg-trustBlue-50 flex items-center justify-center p-4 select-none absolute inset-0 z-40">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-trustBlue-900 mb-2">Ujian Selesai!</h1>
            <p className="text-gray-600 mb-8">{pengaturan.judul}</p>
            
            <div className="bg-trustBlue-50 rounded-2xl p-6 mb-8 border border-trustBlue-100">
              <p className="text-sm font-bold text-trustBlue-600 mb-1">Skor Akhir Anda:</p>
              <h2 className="text-6xl font-black text-trustBlue-900">{score}</h2>
            </div>
            
            <Button className="w-full h-14 text-lg" onClick={() => {
              localStorage.removeItem('cbt_draft_answers');
              localStorage.removeItem('cbt_draft_ragu');
              window.location.href = '/';
            }}>Kembali ke Beranda</Button>
          </motion.div>
        </div>
      )}

      {/* 3. LOBBY INPUT TOKEN */}
      {!isExamStarted && (
        <div className="min-h-screen bg-trustBlue-900 flex items-center justify-center p-4 absolute inset-0 z-30">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl w-full text-center">
            <ShieldAlert className="w-16 h-16 text-energeticOrange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-trustBlue-900 mb-2">Portal Ujian SG</h1>
            <p className="text-gray-500 mb-8">Token Wajib untuk Akses Ujian</p>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
              <label className="block font-bold text-gray-700 mb-4 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Masukkan Token Ujian
              </label>
              <input 
                type="text" 
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                className="w-full p-4 rounded-xl border border-gray-300 text-center font-mono text-3xl font-bold tracking-[0.3em] uppercase focus:ring-2 focus:ring-energeticOrange-500 outline-none"
                placeholder="XXXXXX"
                maxLength={6}
              />
            </div>

            <Button onClick={startExam} className="w-full h-14 text-lg bg-trustBlue-900 hover:bg-trustBlue-800 text-white">
              Mulai Ujian & Masuk Layar Penuh
            </Button>
          </motion.div>
        </div>
      )}

      {/* Peringatan Anti-Cheat Overlay */}
      <AnimatePresence>
        {showWarningOverlay && (
          <div className="fixed inset-0 z-50 bg-red-600/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl text-center max-w-lg shadow-2xl">
              <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-black text-red-600 mb-2">PERINGATAN {cheatWarnings}/{MAX_WARNINGS}!</h2>
              <p className="text-gray-700 mb-8 font-medium">Sistem mendeteksi perpindahan aplikasi/tab. Harap kembali fokus ke ujian.</p>
              <Button className="bg-red-600 hover:bg-red-700 text-white w-full h-14 font-bold" onClick={async () => { 
                setShowWarningOverlay(false); 
                if (!document.fullscreenElement) { try { await document.documentElement.requestFullscreen(); } catch (e) {} } 
              }}>Lanjutkan Ujian</Button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER BAR */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="font-bold text-xl text-trustBlue-900 hidden sm:block">{pengaturan.judul}</div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold border transition-colors ${timeLeft < 300 ? 'bg-red-100 text-red-600 border-red-200 animate-pulse' : 'bg-trustBlue-50 text-trustBlue-700 border-trustBlue-100'}`}>
            <Timer className="w-5 h-5" /> Sisa Waktu: {formatTime(timeLeft)}
          </div>
          <Button variant="outline" onClick={handleManualFinish} className="border-red-500 text-red-500 hover:bg-red-50 font-bold hidden md:flex">
            Selesaikan
          </Button>
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* KIRI: SOAL */}
        <div className="lg:col-span-3 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[75vh]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-800">Soal No. {currentIndex + 1}</h2>
            <label className="flex items-center gap-2 cursor-pointer bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-full border border-yellow-200 transition-colors">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-yellow-500 focus:ring-yellow-500 rounded" 
                checked={!!raguRagu[questions[currentIndex]?.id]}
                onChange={() => toggleRagu(questions[currentIndex]?.id)}
              />
              <span className="font-bold text-yellow-700 flex items-center gap-1"><Flag className="w-4 h-4"/> Ragu-ragu</span>
            </label>
          </div>
          
          <div className="text-lg text-gray-800 mb-10 font-medium whitespace-pre-wrap leading-relaxed">
            {questions[currentIndex]?.pertanyaan}
          </div>

          <div className="space-y-4 overflow-y-auto pr-2 flex-1 mb-8">
            {questions[currentIndex]?.opsi.map((opsi, idx) => (
              <label 
                key={idx} 
                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${answers[questions[currentIndex].id] === idx ? 'border-trustBlue-500 bg-trustBlue-50 shadow-sm' : 'border-gray-100 hover:border-trustBlue-200 hover:bg-gray-50'}`}
              >
                <input 
                  type="radio" 
                  name={`soal-${questions[currentIndex].id}`} 
                  className="w-5 h-5 text-trustBlue-600 focus:ring-trustBlue-500" 
                  checked={answers[questions[currentIndex].id] === idx}
                  onChange={() => selectAnswer(questions[currentIndex].id, idx)}
                />
                <span className={`font-bold ${answers[questions[currentIndex].id] === idx ? 'text-trustBlue-700' : 'text-gray-400'}`}>{String.fromCharCode(65 + idx)}.</span>
                <span className="text-lg text-gray-700">{opsi}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-auto pt-6 border-t border-gray-100">
            <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0} className="px-6 h-12 flex items-center gap-2 font-bold text-gray-600">
              <ChevronLeft className="w-5 h-5"/> Sebelumnya
            </Button>
            <Button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="px-8 h-12 bg-trustBlue-900 text-white hover:bg-trustBlue-800 flex items-center gap-2 font-bold">
              Selanjutnya <ChevronRight className="w-5 h-5"/>
            </Button>
          </div>
        </div>

        {/* KANAN: NAVIGASI */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl aspect-video relative flex items-center justify-center shadow-lg border-4 border-gray-800">
            <Camera className="w-10 h-10 text-gray-600 absolute" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold text-white tracking-widest">REC</span>
            </div>
            <span className="absolute bottom-3 text-xs text-gray-500">Proctoring Aktif</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-trustBlue-600" /> Navigasi Soal
            </h3>
            
            <div className="grid grid-cols-5 gap-2 max-h-[30vh] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                let btnColor = 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-200';
                if (idx === currentIndex) btnColor = 'bg-trustBlue-900 text-white shadow-md transform scale-110';
                else if (raguRagu[q.id]) btnColor = 'bg-yellow-400 text-yellow-900 border border-yellow-500 hover:bg-yellow-500';
                else if (answers[q.id] !== undefined) btnColor = 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200';
                
                return (
                  <button 
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full aspect-square rounded-lg font-bold text-sm transition-all ${btnColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 text-xs font-medium text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-green-100 border border-green-200 rounded-sm"></div> Terjawab</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded-sm"></div> Ragu-ragu</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded-sm"></div> Kosong</div>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleManualFinish} className="w-full border-red-500 text-red-500 hover:bg-red-50 font-bold md:hidden">
            Selesaikan Ujian
          </Button>
        </div>

      </div>
    </div>
  );
}
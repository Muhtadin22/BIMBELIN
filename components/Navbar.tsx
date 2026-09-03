"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/Button';
import { Menu, X, BookOpen, MonitorCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Deteksi scroll untuk efek glassmorphism dinamis
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pilih Jenjang", href: "/jenjang" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Kisah Sukses", href: "/testimoni" },
    { name: "CBT", href: "/cbt" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 font-sans ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/80 py-3' 
          : 'bg-white/70 backdrop-blur-md border-b border-slate-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-[#1E3A8A] rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1E3A8A] transition-all duration-300 shadow-md transform group-hover:rotate-6">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#1E3A8A] font-serif">BIMBEL SG.</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Elite Learning Center</span>
            </div>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    link.name === 'CBT' 
                      ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center gap-1.5' 
                      : isActive 
                        ? 'text-white bg-[#1E3A8A] shadow-md' 
                        : 'text-slate-600 hover:text-[#1E3A8A] hover:bg-white/80'
                  }`}
                >
                  {link.name === 'CBT' && <MonitorCheck className="w-4 h-4 animate-pulse" />}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="px-5 py-2.5 text-[#1E3A8A] border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5 flex items-center gap-2 text-xs font-bold rounded-xl transition-all">
                <Lock size={14} /> Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold rounded-xl shadow-md shadow-[#D4AF37]/20 transition-all text-xs tracking-wide">
                Daftar Sekarang
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1E3A8A] focus:outline-none hover:bg-slate-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Framer Motion Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-full bg-white/95 backdrop-blur-2xl border-t border-slate-200 p-6 flex flex-col gap-4 shadow-2xl overflow-y-auto"
          >
            <div className="space-y-2 pt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className={`flex items-center justify-between p-4 rounded-2xl font-bold text-base transition-all ${
                      isActive 
                        ? 'bg-[#1E3A8A] text-[#D4AF37] shadow-md' 
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.name === 'CBT' && <MonitorCheck className="w-5 h-5 text-[#D4AF37]" />}
                      {link.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">→</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-3">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full h-12 text-sm border-slate-300 text-[#1E3A8A] flex items-center justify-center gap-2 font-bold rounded-xl">
                  <Lock size={16} /> Login Akun
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-13 text-sm bg-[#D4AF37] hover:bg-[#C29F2E] text-slate-950 font-bold rounded-xl shadow-lg shadow-[#D4AF37]/30">
                  Daftar Program Sekarang
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Menu, X, BookOpen, MonitorCheck, Lock } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pilih Jenjang", href: "/jenjang" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Kisah Sukses", href: "/testimoni" },
    { name: "CBT", href: "/cbt" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-200 shadow-sm transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="bg-[#1A365D] p-2.5 rounded-xl group-hover:bg-[#ED8936] transition-colors shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#1A365D]">BIMBEL SG.</span>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-slate-600 font-semibold text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors py-2 ${link.name === 'CBT' ? 'flex items-center gap-1 text-[#ED8936] hover:text-[#DD6B20] font-bold' : 'hover:text-[#2B6CB0]'}`}
              >
                {link.name === 'CBT' && <MonitorCheck className="w-4 h-4" />}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="px-5 py-2.5 text-[#1A365D] border-slate-300 hover:bg-slate-100 flex items-center gap-2 text-sm font-bold rounded-xl">
                <Lock size={15} /> Login
              </Button>
            </Link>
            <Link href="/login">
              {/* Tombol CTA Utama menggunakan Oranye Aksen #ED8936 */}
              <Button className="px-6 py-2.5 bg-[#ED8936] hover:bg-[#DD6B20] text-white font-bold rounded-xl shadow-lg shadow-[#ED8936]/30">
                Daftar Sekarang
              </Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-3xl border-t p-6 flex flex-col gap-6 absolute w-full shadow-2xl h-screen">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={`font-bold text-xl transition-colors ${link.name === 'CBT' ? 'text-[#ED8936] flex items-center gap-2' : 'text-slate-900 hover:text-[#2B6CB0]'}`}
            >
              {link.name === 'CBT' && <MonitorCheck className="w-5 h-5" />}
              {link.name}
            </Link>
          ))}
          
          <hr className="border-slate-200" />
          
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full h-12 text-base border-slate-300 text-slate-900 flex items-center justify-center gap-2 font-bold rounded-xl">
              <Lock size={16} /> Login
            </Button>
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full h-14 text-lg bg-[#ED8936] hover:bg-[#DD6B20] text-white font-bold rounded-xl shadow-lg">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Menu, X, BookOpen, MonitorCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Menambahkan link CBT dan Dashboard Guru
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pilih Jenjang", href: "/jenjang" },
    { name: "Kenapa Pilih SG", href: "/keunggulan" },
    { name: "Cabang", href: "/cabang" },
    { name: "Kisah Sukses", href: "/testimoni" },
    { name: "CBT", href: "/cbt" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-trustBlue-900 p-2 rounded-xl group-hover:bg-energeticOrange-500 transition-colors">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-trustBlue-900">BIMBEL SG.</span>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-gray-600 font-semibold text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors py-2 ${link.name === 'CBT' ? 'flex items-center gap-1 text-energeticOrange-500 hover:text-energeticOrange-600' : 'hover:text-energeticOrange-500'}`}
              >
                {link.name === 'CBT' && <MonitorCheck className="w-4 h-4" />}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Tautan khusus untuk Guru membuat soal */}
            <Link href="/guru/buat-soal" className="text-sm font-semibold text-trustBlue-600 hover:text-trustBlue-800">
              Portal Guru
            </Link>
            <Link href="/kontak">
              <Button className="px-6 py-2 shadow-lg shadow-orange-500/20">Kontak Kami</Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2">
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
              className={`font-bold text-xl transition-colors ${link.name === 'CBT' ? 'text-energeticOrange-500 flex items-center gap-2' : 'text-gray-900 hover:text-energeticOrange-500'}`}
            >
              {link.name === 'CBT' && <MonitorCheck className="w-5 h-5" />}
              {link.name}
            </Link>
          ))}
          
          <hr className="border-gray-200" />
          
          <Link href="/guru/buat-soal" onClick={() => setIsOpen(false)} className="text-trustBlue-600 font-bold text-xl">
            Portal Guru
          </Link>
          <Link href="/kontak" onClick={() => setIsOpen(false)}>
            <Button className="w-full mt-2 h-14 text-lg">Kontak Kami</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Shield, Lock } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-trustBlue-950 text-white fixed top-0 left-0 right-0 z-50 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
            SG
          </div>
          <span>Bimbel SG & Lawfirm</span>
        </Link>

        {/* Menu Navigasi Utama */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-amber-400 transition-colors">Beranda</Link>
          <Link href="/practice-areas" className="hover:text-amber-400 transition-colors">Layanan</Link>
          <Link href="/about" className="hover:text-amber-400 transition-colors">Tentang Kami</Link>
          <Link href="/cbt" className="hover:text-amber-400 transition-colors">Ujian CBT</Link>
        </div>

        {/* Tombol Login Universal (Menggantikan Portal Guru) */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm transition-all">
              <Lock size={15} /> Login / Masuk
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
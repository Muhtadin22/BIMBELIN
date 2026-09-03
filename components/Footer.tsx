"use client";
import Link from 'next/link';
import { BookOpen, MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Ambient Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Col (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-slate-950 flex items-center justify-center font-bold shadow-md">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Bimbel SG.</span>
            </div>
            <p className="text-sm text-slate-300 max-w-sm font-light leading-relaxed">
              Institusi bimbingan belajar terdepan dengan kurikulum adaptif, Master Teacher berdedikasi, dan sistem penilaian CBT berbasis IRT untuk mengantar ribuan siswa menembus PTN impian.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram Icon */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 transition-all flex items-center justify-center text-white" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* YouTube Icon */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 transition-all flex items-center justify-center text-white" aria-label="YouTube">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              {/* Globe / Website Icon */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 transition-all flex items-center justify-center text-white" aria-label="Website">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="space-y-4">
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase font-mono">Eksplorasi</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-light">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda Utama</Link></li>
              <li><Link href="/jenjang" className="hover:text-[#D4AF37] transition-colors">Pilih Jenjang</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">Tentang Kami</Link></li>
              <li><Link href="/testimoni" className="hover:text-[#D4AF37] transition-colors">Kisah Sukses</Link></li>
              <li><Link href="/cbt" className="hover:text-[#D4AF37] transition-colors">Simulasi CBT</Link></li>
            </ul>
          </div>

          {/* Program Jenjang */}
          <div className="space-y-4">
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase font-mono">Program Belajar</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-light">
              <li><Link href="/jenjang" className="hover:text-[#D4AF37] transition-colors">Bimbel Tingkat SD</Link></li>
              <li><Link href="/jenjang" className="hover:text-[#D4AF37] transition-colors">Bimbel Tingkat SMP</Link></li>
              <li><Link href="/jenjang" className="hover:text-[#D4AF37] transition-colors">SMA MIPA & Saintek</Link></li>
              <li><Link href="/jenjang" className="hover:text-[#D4AF37] transition-colors">SMA IPS & Soshum</Link></li>
              <li><Link href="/jenjang" className="hover:text-[#D4AF37] transition-colors">Karantina UTBK SNBT</Link></li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div className="space-y-4">
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase font-mono">Kantor & Kontak</h4>
            <ul className="space-y-3 text-sm text-slate-300 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-1" />
                <span>Jl. Margonda Raya No. 123, Depok, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#D4AF37] shrink-0" />
                <span>support@bimbelsg.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#D4AF37] shrink-0" />
                <span>+62 811 9876 5432</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#D4AF37]" />
            <span>© 2026 Bimbel SG. Seluruh Hak Cipta Dilindungi Undang-Undang. Terakreditasi A.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Bantuan / FAQ</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
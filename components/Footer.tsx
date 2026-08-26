import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-energeticOrange-500" />
            <span className="font-bold text-xl text-white">Bimbelin.</span>
          </div>
          <p className="text-sm text-gray-400 max-w-sm">Membantu ribuan siswa mencapai kampus impian melalui pendekatan belajar yang adaptif dan terstruktur.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-energeticOrange-500">Beranda</Link></li>
            <li><Link href="/program" className="hover:text-energeticOrange-500">Program</Link></li>
            <li><Link href="/testimoni" className="hover:text-energeticOrange-500">Kisah Sukses</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Kontak</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Jl. Pendidikan No. 123, Jakarta</li>
            <li>halo@bimbelin.com</li>
            <li>+62 812 3456 7890</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
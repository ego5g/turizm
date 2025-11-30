import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-12 pb-6 border-t border-gray-800 dark:border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-georgianRed mb-4">turizm.ge</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate guide to exploring the hidden gems, mountains, and culture of Georgia.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Regions</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Tbilisi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Adjara</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Svaneti</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kakheti</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-900 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} turizm.ge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

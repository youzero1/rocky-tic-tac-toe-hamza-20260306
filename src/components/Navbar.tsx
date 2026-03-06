'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DEFAULT_USER_ID } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [coins, setCoins] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 15000);
    return () => clearInterval(interval);
  }, [pathname]);

  async function fetchCoins() {
    try {
      const res = await fetch(`/api/user?userId=${DEFAULT_USER_ID}`);
      const data = await res.json();
      if (data.success && data.data) setCoins(data.data.coins);
    } catch {}
  }

  const navLinks = [
    { href: '/', label: '🏠 Home' },
    { href: '/game', label: '⚔️ Play' },
    { href: '/shop', label: '🛒 Shop' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-rocky-darker border-b border-rocky-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🥊</span>
          <span className="font-rocky font-bold text-rocky-gold uppercase tracking-wider text-lg hidden sm:block">
            Rocky TTT
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                pathname === link.href
                  ? 'bg-rocky-gold text-black'
                  : 'text-rocky-gray-light hover:text-white hover:bg-rocky-card'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Coins Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-rocky-card border border-rocky-border rounded-lg px-3 py-1">
            <span className="text-lg">🪙</span>
            <span className="text-rocky-gold font-bold text-sm">
              {coins !== null ? coins : '...'}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-rocky-darker border-t border-rocky-border py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 font-semibold text-sm transition-all ${
                pathname === link.href
                  ? 'text-rocky-gold bg-rocky-card'
                  : 'text-rocky-gray-light hover:text-white hover:bg-rocky-card'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-rocky-dark flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <div className={`text-center mb-12 transition-all duration-700 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="text-8xl mb-4 animate-bounce-in">🥊</div>
        <h1 className="text-5xl md:text-7xl font-bold font-rocky uppercase text-rocky-gold text-glow-gold mb-4 tracking-wider">
          Rocky
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wide">
          Tic Tac Toe
        </h2>
        <p className="text-rocky-gray-light text-lg md:text-xl max-w-2xl mx-auto mt-4">
          The ultimate Tic Tac Toe arena. Fight for dominance, earn coins, and customize your battle gear in the shop!
        </p>
      </div>

      {/* Feature Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12 transition-all duration-700 delay-200 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="card text-center hover:border-rocky-gold transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl mb-3">⚔️</div>
          <h3 className="text-rocky-gold font-bold text-xl mb-2">Epic Battles</h3>
          <p className="text-rocky-gray-light text-sm">Challenge a friend locally or battle our smart AI opponent</p>
        </div>
        <div className="card text-center hover:border-rocky-gold transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl mb-3">🪙</div>
          <h3 className="text-rocky-gold font-bold text-xl mb-2">Earn Coins</h3>
          <p className="text-rocky-gray-light text-sm">Win games to earn in-app coins and build your fortune</p>
        </div>
        <div className="card text-center hover:border-rocky-gold transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl mb-3">🛒</div>
          <h3 className="text-rocky-gold font-bold text-xl mb-2">Customize</h3>
          <p className="text-rocky-gray-light text-sm">Shop for themes, icons, skins, and victory animations</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <Link
          href="/game"
          className="btn-primary text-xl py-4 px-10 rounded-xl text-center font-rocky uppercase tracking-wide hover:scale-105 transition-transform"
        >
          ⚔️ Play Now!
        </Link>
        <Link
          href="/shop"
          className="btn-secondary text-xl py-4 px-10 rounded-xl text-center font-rocky uppercase tracking-wide hover:scale-105 transition-transform"
        >
          🛒 Visit Shop
        </Link>
      </div>

      {/* Stats Bar */}
      <div className={`mt-16 grid grid-cols-3 gap-8 text-center max-w-lg w-full transition-all duration-700 delay-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div>
          <div className="text-3xl font-bold text-rocky-gold">10</div>
          <div className="text-rocky-gray text-sm">Coins per Win</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-rocky-gold">3</div>
          <div className="text-rocky-gray text-sm">Coins per Draw</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-rocky-gold">9+</div>
          <div className="text-rocky-gray text-sm">Shop Items</div>
        </div>
      </div>

      <div className="mt-16 text-rocky-gray text-sm text-center">
        <p>Built with ❤️ and 🥊 — Rocky Tic Tac Toe v1.0</p>
      </div>
    </div>
  );
}

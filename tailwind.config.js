/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rocky: {
          dark: '#0a0a0a',
          darker: '#111111',
          card: '#1a1a1a',
          border: '#2a2a2a',
          gold: '#FFD700',
          'gold-dark': '#B8860B',
          red: '#DC2626',
          'red-dark': '#991B1B',
          blue: '#1D4ED8',
          'blue-dark': '#1E3A8A',
          gray: '#6B7280',
          'gray-light': '#9CA3AF',
          white: '#F9FAFB',
        },
      },
      fontFamily: {
        rocky: ['Impact', 'Arial Black', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'pulse-gold': 'pulseGold 1s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'win-flash': 'winFlash 0.6s ease-in-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 5px #FFD700' },
          '50%': { boxShadow: '0 0 20px #FFD700, 0 0 40px #FFD700' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        winFlash: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(255, 215, 0, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};

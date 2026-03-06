export function formatCurrency(amount: number): string {
  return `${amount} 🪙`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const DEFAULT_USER_ID = 'default-player-001';
export const DEFAULT_USERNAME = 'Rocky Player';

export const THEME_CONFIGS: Record<string, {
  bg: string;
  board: string;
  x: string;
  o: string;
  line: string;
  cell: string;
  winCell: string;
}> = {
  default: {
    bg: 'bg-rocky-dark',
    board: 'bg-rocky-card border-rocky-border',
    x: 'text-rocky-red',
    o: 'text-rocky-blue',
    line: 'bg-rocky-gold',
    cell: 'bg-rocky-darker border-rocky-border hover:bg-rocky-card',
    winCell: 'bg-rocky-gold/20 border-rocky-gold animate-win-flash',
  },
  neon: {
    bg: 'bg-purple-950',
    board: 'bg-purple-900 border-purple-500',
    x: 'text-pink-400',
    o: 'text-cyan-400',
    line: 'bg-purple-400',
    cell: 'bg-purple-950 border-purple-700 hover:bg-purple-900',
    winCell: 'bg-pink-500/20 border-pink-500',
  },
  'fire-ice': {
    bg: 'bg-gray-950',
    board: 'bg-gray-900 border-gray-600',
    x: 'text-orange-500',
    o: 'text-blue-400',
    line: 'bg-orange-400',
    cell: 'bg-gray-950 border-gray-700 hover:bg-gray-900',
    winCell: 'bg-orange-500/20 border-orange-500',
  },
  gold: {
    bg: 'bg-yellow-950',
    board: 'bg-yellow-900/30 border-yellow-600',
    x: 'text-yellow-300',
    o: 'text-yellow-600',
    line: 'bg-yellow-400',
    cell: 'bg-yellow-950 border-yellow-800 hover:bg-yellow-900/40',
    winCell: 'bg-yellow-400/30 border-yellow-400',
  },
  diamond: {
    bg: 'bg-slate-950',
    board: 'bg-slate-800 border-slate-400',
    x: 'text-slate-200',
    o: 'text-blue-300',
    line: 'bg-slate-300',
    cell: 'bg-slate-900 border-slate-600 hover:bg-slate-800',
    winCell: 'bg-slate-300/20 border-slate-300',
  },
  wood: {
    bg: 'bg-amber-950',
    board: 'bg-amber-900/60 border-amber-700',
    x: 'text-red-400',
    o: 'text-amber-300',
    line: 'bg-amber-500',
    cell: 'bg-amber-950 border-amber-800 hover:bg-amber-900/50',
    winCell: 'bg-amber-400/30 border-amber-400',
  },
};

export const ICON_CONFIGS: Record<string, { x: string; o: string }> = {
  default: { x: 'X', o: 'O' },
  star: { x: '★', o: '☆' },
  emoji: { x: '😎', o: '🤖' },
};

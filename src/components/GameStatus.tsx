'use client';
import { GameMode, GameResult, Player } from '@/types';

interface GameStatusProps {
  winner: GameResult;
  currentPlayer: Player;
  gameOver: boolean;
  isAiThinking: boolean;
  mode: GameMode;
  icons: { x: string; o: string };
  theme: { x?: string; o?: string };
}

export function GameStatus({ winner, currentPlayer, gameOver, isAiThinking, mode, icons, theme }: GameStatusProps) {
  function getStatusContent() {
    if (isAiThinking) {
      return {
        icon: '🤖',
        text: 'AI is thinking...',
        sub: 'Calculating best move',
        color: 'text-rocky-gray-light',
        bg: 'bg-rocky-card border-rocky-border',
      };
    }

    if (winner === 'draw') {
      return {
        icon: '🤝',
        text: "It's a Draw!",
        sub: '+3 coins earned',
        color: 'text-rocky-gold',
        bg: 'bg-rocky-card border-rocky-gold',
      };
    }

    if (winner === 'X' || winner === 'O') {
      const winnerIcon = winner === 'X' ? icons.x : icons.o;
      const winnerColor = winner === 'X' ? (theme.x || 'text-rocky-red') : (theme.o || 'text-blue-400');
      const isPlayer1Win = winner === 'X';
      const label = mode === 'ai' && winner === 'O' ? 'AI Wins! 🤖' : isPlayer1Win ? 'Player 1 Wins!' : 'Player 2 Wins!';
      const coinMsg = winner === 'X' ? '+10 coins earned!' : mode === 'ai' ? 'Better luck next time' : '+10 coins earned!';
      return {
        icon: winnerIcon,
        text: label,
        sub: coinMsg,
        color: `${winnerColor} font-bold text-xl`,
        bg: 'bg-rocky-card border-rocky-gold animate-pulse-gold',
      };
    }

    const playerIcon = currentPlayer === 'X' ? icons.x : icons.o;
    const playerColor = currentPlayer === 'X' ? (theme.x || 'text-rocky-red') : (theme.o || 'text-blue-400');
    const label = mode === 'ai' && currentPlayer === 'O' ? 'AI turn' : `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;

    return {
      icon: playerIcon,
      text: label,
      sub: `Playing as ${currentPlayer}`,
      color: playerColor,
      bg: 'bg-rocky-card border-rocky-border',
    };
  }

  const status = getStatusContent();

  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 mb-4 w-full max-w-xs transition-all duration-300 animate-fade-in ${
        status.bg
      }`}
    >
      <span className="text-2xl">{status.icon}</span>
      <div>
        <div className={`font-bold text-sm ${status.color}`}>{status.text}</div>
        <div className="text-rocky-gray text-xs">{status.sub}</div>
      </div>
    </div>
  );
}

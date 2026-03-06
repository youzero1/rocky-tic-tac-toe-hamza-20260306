'use client';
import { CellValue } from '@/types';

interface SquareProps {
  value: CellValue;
  onClick: () => void;
  isWinner: boolean;
  isDisabled: boolean;
  theme: {
    cell: string;
    winCell: string;
    x?: string;
    o?: string;
  };
  icons: { x: string; o: string };
}

export function Square({ value, onClick, isWinner, isDisabled, theme, icons }: SquareProps) {
  const displayValue = value ? (value === 'X' ? icons.x : icons.o) : null;
  const isX = value === 'X';
  const isO = value === 'O';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex items-center justify-center rounded-xl border-2 text-3xl sm:text-4xl font-bold
        transition-all duration-200 cursor-pointer select-none
        ${isWinner ? theme.winCell : theme.cell}
        ${!isDisabled && !value ? 'hover:scale-105 active:scale-95' : ''}
        ${isDisabled && !value ? 'cursor-not-allowed' : ''}
        ${value ? 'animate-bounce-in' : ''}
      `}
      style={{ minHeight: '70px' }}
    >
      {displayValue && (
        <span
          className={`
            ${isX ? (theme.x || 'text-rocky-red') : isO ? (theme.o || 'text-blue-400') : ''}
            ${isWinner ? 'scale-110' : ''}
            transition-transform duration-200
            drop-shadow-lg
          `}
        >
          {displayValue}
        </span>
      )}
    </button>
  );
}

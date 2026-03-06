'use client';
import { CellValue } from '@/types';
import { Square } from './Square';

interface BoardProps {
  board: CellValue[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  gameOver: boolean;
  theme: {
    board: string;
    cell: string;
    winCell: string;
    line: string;
  };
  icons: { x: string; o: string };
  animatedWin: boolean;
}

export function Board({ board, onCellClick, winningLine, gameOver, theme, icons, animatedWin }: BoardProps) {
  return (
    <div
      className={`grid grid-cols-3 gap-2 p-4 rounded-2xl border-2 transition-all duration-500 w-72 h-72 sm:w-80 sm:h-80 ${
        theme.board
      } ${animatedWin && winningLine ? 'border-glow-gold' : ''}`}
    >
      {board.map((cell, index) => (
        <Square
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinner={winningLine?.includes(index) ?? false}
          isDisabled={gameOver || cell !== null}
          theme={theme}
          icons={icons}
        />
      ))}
    </div>
  );
}

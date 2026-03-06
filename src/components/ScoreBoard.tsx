'use client';

interface ScoreBoardProps {
  scores: { X: number; O: number; draws: number };
  theme: { x?: string; o?: string };
  icons: { x: string; o: string };
}

export function ScoreBoard({ scores, theme, icons }: ScoreBoardProps) {
  return (
    <div className="card">
      <h3 className="text-rocky-gold font-bold uppercase text-sm tracking-wide mb-3">🏆 Score Board</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-3 bg-rocky-darker rounded-lg">
          <div className={`text-2xl font-bold ${theme.x || 'text-rocky-red'}`}>{icons.x}</div>
          <div className="text-3xl font-bold text-white mt-1">{scores.X}</div>
          <div className="text-rocky-gray text-xs mt-1">Player 1</div>
        </div>
        <div className="text-center p-3 bg-rocky-darker rounded-lg">
          <div className="text-2xl">🤝</div>
          <div className="text-3xl font-bold text-rocky-gray mt-1">{scores.draws}</div>
          <div className="text-rocky-gray text-xs mt-1">Draws</div>
        </div>
        <div className="text-center p-3 bg-rocky-darker rounded-lg">
          <div className={`text-2xl font-bold ${theme.o || 'text-blue-400'}`}>{icons.o}</div>
          <div className="text-3xl font-bold text-white mt-1">{scores.O}</div>
          <div className="text-rocky-gray text-xs mt-1">Player 2</div>
        </div>
      </div>
    </div>
  );
}

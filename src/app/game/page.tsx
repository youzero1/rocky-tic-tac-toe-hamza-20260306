'use client';
import { useState, useEffect, useCallback } from 'react';
import { Board } from '@/components/Board';
import { GameStatus } from '@/components/GameStatus';
import { ScoreBoard } from '@/components/ScoreBoard';
import { ThemeSelector } from '@/components/ThemeSelector';
import { CellValue, GameMode, GameResult, Player } from '@/types';
import { checkWinner, getBestMove } from '@/lib/gameLogic';
import { DEFAULT_USER_ID, ICON_CONFIGS, THEME_CONFIGS } from '@/lib/utils';

const INITIAL_BOARD: CellValue[] = Array(9).fill(null);

export default function GamePage() {
  const [board, setBoard] = useState<CellValue[]>(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<GameResult>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [mode, setMode] = useState<GameMode>('pvp');
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [moveHistory, setMoveHistory] = useState<number[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  const [activeIcon, setActiveIcon] = useState('default');
  const [coins, setCoins] = useState(100);
  const [showConfetti, setShowConfetti] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [animatedWin, setAnimatedWin] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchPurchasedItems();
  }, []);

  async function fetchUserData() {
    try {
      const res = await fetch(`/api/user?userId=${DEFAULT_USER_ID}`);
      const data = await res.json();
      if (data.success && data.data) {
        setCoins(data.data.coins);
      }
    } catch (e) {
      console.error('Failed to fetch user data', e);
    }
  }

  async function fetchPurchasedItems() {
    try {
      const res = await fetch(`/api/shop?action=purchases&userId=${DEFAULT_USER_ID}`);
      const data = await res.json();
      if (data.success && data.data) {
        setPurchasedItems(data.data.map((p: { shopItemId: string }) => p.shopItemId));
      }
    } catch (e) {
      console.error('Failed to fetch purchased items', e);
    }
  }

  async function recordGame(result: GameResult, moves: number[]) {
    try {
      const res = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          winner: result,
          mode,
          moves,
          userId: DEFAULT_USER_ID,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.newCoins !== undefined) {
        setCoins(data.data.newCoins);
      }
    } catch (e) {
      console.error('Failed to record game', e);
    }
  }

  const handleCellClick = useCallback(
    async (index: number) => {
      if (board[index] || gameOver || isAiThinking) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      const newHistory = [...moveHistory, index];

      const { winner: w, line } = checkWinner(newBoard);

      setBoard(newBoard);
      setMoveHistory(newHistory);

      if (w) {
        setWinner(w);
        setWinningLine(line);
        setGameOver(true);
        setAnimatedWin(true);
        setShowConfetti(w !== 'draw');
        setTimeout(() => setShowConfetti(false), 3000);
        setScores((prev) => ({
          ...prev,
          ...(w === 'draw' ? { draws: prev.draws + 1 } : { [w]: prev[w] + 1 }),
        }));
        await recordGame(w, newHistory);
        return;
      }

      const nextPlayer: Player = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);

      if (mode === 'ai' && nextPlayer === 'O') {
        setIsAiThinking(true);
        setTimeout(async () => {
          const aiMove = getBestMove(newBoard, 'O');
          if (aiMove !== -1) {
            const aiBoard = [...newBoard];
            aiBoard[aiMove] = 'O';
            const aiHistory = [...newHistory, aiMove];
            const { winner: aiW, line: aiLine } = checkWinner(aiBoard);

            setBoard(aiBoard);
            setMoveHistory(aiHistory);

            if (aiW) {
              setWinner(aiW);
              setWinningLine(aiLine);
              setGameOver(true);
              setAnimatedWin(true);
              setShowConfetti(aiW !== 'draw');
              setTimeout(() => setShowConfetti(false), 3000);
              setScores((prev) => ({
                ...prev,
                ...(aiW === 'draw' ? { draws: prev.draws + 1 } : { [aiW]: prev[aiW as 'X' | 'O'] + 1 }),
              }));
              await recordGame(aiW, aiHistory);
            } else {
              setCurrentPlayer('X');
            }
          }
          setIsAiThinking(false);
        }, 600);
      }
    },
    [board, gameOver, isAiThinking, currentPlayer, mode, moveHistory]
  );

  function resetGame() {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setGameOver(false);
    setMoveHistory([]);
    setIsAiThinking(false);
    setAnimatedWin(false);
    setShowConfetti(false);
  }

  function switchMode(newMode: GameMode) {
    setMode(newMode);
    resetGame();
  }

  const theme = THEME_CONFIGS[activeTheme] || THEME_CONFIGS.default;
  const icons = ICON_CONFIGS[activeIcon] || ICON_CONFIGS.default;

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500 py-8 px-4`}>
      {showConfetti && <Confetti />}

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-rocky text-rocky-gold uppercase tracking-wider">⚔️ Battle Arena</h1>
          <div className="flex justify-center gap-2 mt-2">
            <span className="text-rocky-gray-light text-sm">Your coins:</span>
            <span className="text-rocky-gold font-bold text-sm">🪙 {coins}</span>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => switchMode('pvp')}
            className={`px-6 py-2 rounded-lg font-bold uppercase text-sm transition-all ${
              mode === 'pvp'
                ? 'bg-rocky-gold text-black scale-105'
                : 'bg-rocky-card border border-rocky-border text-white hover:border-rocky-gold'
            }`}
          >
            👥 Player vs Player
          </button>
          <button
            onClick={() => switchMode('ai')}
            className={`px-6 py-2 rounded-lg font-bold uppercase text-sm transition-all ${
              mode === 'ai'
                ? 'bg-rocky-gold text-black scale-105'
                : 'bg-rocky-card border border-rocky-border text-white hover:border-rocky-gold'
            }`}
          >
            🤖 Player vs AI
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="space-y-4">
            <ScoreBoard scores={scores} theme={theme} icons={icons} />
            <ThemeSelector
              activeTheme={activeTheme}
              activeIcon={activeIcon}
              onThemeChange={setActiveTheme}
              onIconChange={setActiveIcon}
              purchasedItems={purchasedItems}
            />
          </div>

          {/* Game Board */}
          <div className="flex flex-col items-center">
            <GameStatus
              winner={winner}
              currentPlayer={currentPlayer}
              gameOver={gameOver}
              isAiThinking={isAiThinking}
              mode={mode}
              icons={icons}
              theme={theme}
            />
            <Board
              board={board}
              onCellClick={handleCellClick}
              winningLine={winningLine}
              gameOver={gameOver}
              theme={theme}
              icons={icons}
              animatedWin={animatedWin}
            />
            <button
              onClick={resetGame}
              className="mt-6 btn-primary w-full max-w-xs font-rocky uppercase tracking-wide text-lg"
            >
              🔄 New Game
            </button>
          </div>

          {/* Right Panel: Move History */}
          <div className="card h-fit">
            <h3 className="text-rocky-gold font-bold mb-3 uppercase text-sm tracking-wide">📜 Move History</h3>
            {moveHistory.length === 0 ? (
              <p className="text-rocky-gray text-sm">No moves yet...</p>
            ) : (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {moveHistory.map((move, idx) => {
                  const player: Player = idx % 2 === 0 ? 'X' : 'O';
                  const row = Math.floor(move / 3) + 1;
                  const col = (move % 3) + 1;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="text-rocky-gray w-6">#{idx + 1}</span>
                      <span className={player === 'X' ? 'text-rocky-red font-bold' : 'text-blue-400 font-bold'}>
                        {icons[player.toLowerCase() as 'x' | 'o'] || player}
                      </span>
                      <span className="text-rocky-gray-light">→ Row {row}, Col {col}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1}s`,
    color: ['#FFD700', '#DC2626', '#1D4ED8', '#10B981', '#8B5CF6'][Math.floor(Math.random() * 5)],
    size: `${Math.random() * 10 + 5}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            animationDelay: p.delay,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}

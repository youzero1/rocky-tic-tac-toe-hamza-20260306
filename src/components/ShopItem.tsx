'use client';
import { ShopItemData } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  theme: '🎨',
  icon: '🔤',
  skin: '🎭',
  animation: '✨',
};

const PREVIEW_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  neon: { bg: 'bg-purple-900', text: 'text-pink-400', border: 'border-purple-500' },
  'fire-ice': { bg: 'bg-gray-900', text: 'text-orange-500', border: 'border-orange-500' },
  gold: { bg: 'bg-yellow-900', text: 'text-yellow-300', border: 'border-yellow-500' },
  star: { bg: 'bg-rocky-darker', text: 'text-yellow-400', border: 'border-yellow-400' },
  emoji: { bg: 'bg-rocky-darker', text: 'text-white', border: 'border-green-500' },
  diamond: { bg: 'bg-slate-900', text: 'text-slate-200', border: 'border-slate-400' },
  wood: { bg: 'bg-amber-900', text: 'text-amber-300', border: 'border-amber-600' },
  confetti: { bg: 'bg-rocky-darker', text: 'text-rainbow', border: 'border-pink-500' },
  fireworks: { bg: 'bg-rocky-darker', text: 'text-yellow-300', border: 'border-red-500' },
  preview: { bg: 'bg-rocky-card', text: 'text-rocky-gold', border: 'border-rocky-gold' },
};

const PREVIEW_CONTENT: Record<string, { x: string; o: string; label: string }> = {
  neon: { x: 'X', o: 'O', label: '✦ Neon' },
  'fire-ice': { x: '🔥', o: '❄️', label: 'Fire / Ice' },
  gold: { x: '⭐', o: '✦', label: '★ Gold' },
  star: { x: '★', o: '☆', label: '★ / ☆' },
  emoji: { x: '😎', o: '🤖', label: '😎 / 🤖' },
  diamond: { x: '◆', o: '◇', label: '◆ Diamond' },
  wood: { x: 'X', o: 'O', label: '🪵 Wood' },
  confetti: { x: '🎉', o: '🎊', label: 'Confetti!' },
  fireworks: { x: '🎆', o: '🎇', label: 'Fireworks!' },
  preview: { x: 'X', o: 'O', label: 'Default' },
};

interface ShopItemProps {
  item: ShopItemData;
  onAddToCart: (item: ShopItemData) => void;
  isPurchased: boolean;
  isInCart: boolean;
  userCoins: number;
}

export function ShopItem({ item, onAddToCart, isPurchased, isInCart, userCoins }: ShopItemProps) {
  const canAfford = userCoins >= item.price;
  const preview = PREVIEW_STYLES[item.preview || ''] || PREVIEW_STYLES.preview;
  const content = PREVIEW_CONTENT[item.preview || ''] || PREVIEW_CONTENT.preview;

  return (
    <div
      className={`card flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
        isPurchased ? 'border-green-600 opacity-90' : isInCart ? 'border-rocky-gold' : 'hover:border-rocky-gold/50'
      }`}
    >
      {/* Preview Area */}
      <div
        className={`rounded-lg h-28 flex items-center justify-center mb-3 border-2 ${
          preview.bg
        } ${preview.border}`}
      >
        <div className="text-center">
          <div className={`text-3xl font-bold ${preview.text} flex gap-3 justify-center`}>
            <span>{content.x}</span>
            <span className="text-rocky-gray">vs</span>
            <span>{content.o}</span>
          </div>
          <div className={`text-xs mt-1 ${preview.text} opacity-70`}>{content.label}</div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{CATEGORY_ICONS[item.category] || '📦'}</span>
          <span className="text-xs text-rocky-gray uppercase tracking-wide">{item.category}</span>
          {isPurchased && (
            <span className="ml-auto text-xs bg-green-700 text-white px-2 py-0.5 rounded-full">✓ Owned</span>
          )}
        </div>
        <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
        <p className="text-rocky-gray text-xs mb-3">{item.description}</p>
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-rocky-border">
        <div className="flex items-center gap-1">
          <span className="text-lg">🪙</span>
          <span className={`font-bold text-lg ${canAfford || isPurchased ? 'text-rocky-gold' : 'text-red-400'}`}>
            {item.price}
          </span>
        </div>

        {isPurchased ? (
          <button disabled className="text-xs bg-green-700/30 text-green-400 border border-green-700 px-3 py-1.5 rounded-lg cursor-not-allowed">
            ✓ Purchased
          </button>
        ) : isInCart ? (
          <button disabled className="text-xs bg-rocky-gold/20 text-rocky-gold border border-rocky-gold px-3 py-1.5 rounded-lg cursor-not-allowed">
            ✓ In Cart
          </button>
        ) : (
          <button
            onClick={() => onAddToCart(item)}
            disabled={!canAfford}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              canAfford
                ? 'bg-rocky-gold text-black hover:bg-rocky-gold-dark active:scale-95'
                : 'bg-rocky-card border border-rocky-border text-rocky-gray cursor-not-allowed'
            }`}
          >
            {canAfford ? 'Add to Cart' : 'Not enough 🪙'}
          </button>
        )}
      </div>
    </div>
  );
}

'use client';
import { CartItem } from '@/types';

interface CartProps {
  items: CartItem[];
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
  userCoins: number;
  onClose: () => void;
}

export function Cart({ items, onRemove, onCheckout, userCoins, onClose }: CartProps) {
  const total = items.reduce((sum, c) => sum + c.item.price, 0);
  const canAfford = userCoins >= total;

  return (
    <div className="card sticky top-20 animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-rocky-gold font-bold uppercase text-sm tracking-wide">🛒 Shopping Cart</h3>
        <button onClick={onClose} className="text-rocky-gray hover:text-white text-lg">✕</button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🛒</div>
          <p className="text-rocky-gray text-sm">Your cart is empty</p>
          <p className="text-rocky-gray text-xs mt-1">Add items from the shop</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className="flex items-center gap-3 p-2 bg-rocky-darker rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{cartItem.item.name}</div>
                  <div className="text-rocky-gray text-xs capitalize">{cartItem.item.category}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-rocky-gold font-bold text-sm">🪙 {cartItem.item.price}</span>
                  <button
                    onClick={() => onRemove(cartItem.item.id)}
                    className="text-rocky-red hover:text-red-400 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-rocky-border pt-3 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-rocky-gray">Your coins:</span>
              <span className="text-rocky-gold font-bold">🪙 {userCoins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rocky-gray-light font-bold">Total:</span>
              <span className={`font-bold text-lg ${canAfford ? 'text-rocky-gold' : 'text-red-400'}`}>
                🪙 {total}
              </span>
            </div>
            {!canAfford && (
              <p className="text-red-400 text-xs text-center">Not enough coins! Win more games to earn coins.</p>
            )}
            <button
              onClick={onCheckout}
              disabled={!canAfford || items.length === 0}
              className={`w-full py-3 rounded-lg font-bold uppercase text-sm transition-all ${
                canAfford
                  ? 'bg-rocky-gold text-black hover:bg-rocky-gold-dark active:scale-95'
                  : 'bg-rocky-card border border-rocky-border text-rocky-gray cursor-not-allowed'
              }`}
            >
              {canAfford ? '✅ Checkout' : '❌ Insufficient Coins'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

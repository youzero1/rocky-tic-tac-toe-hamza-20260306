'use client';
import { useState, useEffect } from 'react';
import { ShopItem } from '@/components/ShopItem';
import { Cart } from '@/components/Cart';
import { CartItem, ShopCategory, ShopItemData } from '@/types';
import { DEFAULT_USER_ID } from '@/lib/utils';

const CATEGORIES: { value: ShopCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Items', icon: '🛍️' },
  { value: 'theme', label: 'Themes', icon: '🎨' },
  { value: 'icon', label: 'Icons', icon: '🔤' },
  { value: 'skin', label: 'Board Skins', icon: '🎭' },
  { value: 'animation', label: 'Animations', icon: '✨' },
];

export default function ShopPage() {
  const [items, setItems] = useState<ShopItemData[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coins, setCoins] = useState(100);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      await Promise.all([fetchItems(), fetchUser(), fetchPurchases()]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchItems() {
    const res = await fetch('/api/shop?action=items');
    const data = await res.json();
    if (data.success) setItems(data.data);
  }

  async function fetchUser() {
    const res = await fetch(`/api/user?userId=${DEFAULT_USER_ID}`);
    const data = await res.json();
    if (data.success && data.data) setCoins(data.data.coins);
  }

  async function fetchPurchases() {
    const res = await fetch(`/api/shop?action=purchases&userId=${DEFAULT_USER_ID}`);
    const data = await res.json();
    if (data.success && data.data) setPurchasedIds(data.data.map((p: { shopItemId: string }) => p.shopItemId));
  }

  function addToCart(item: ShopItemData) {
    if (purchasedIds.includes(item.id)) {
      showNotification('error', 'You already own this item!');
      return;
    }
    if (cart.find((c) => c.item.id === item.id)) {
      showNotification('error', 'Item already in cart!');
      return;
    }
    setCart((prev) => [...prev, { item, quantity: 1 }]);
    showNotification('success', `${item.name} added to cart!`);
  }

  function removeFromCart(itemId: string) {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  }

  async function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, c) => sum + c.item.price, 0);
    if (total > coins) {
      showNotification('error', 'Not enough coins!');
      return;
    }

    try {
      const res = await fetch('/api/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'purchase',
          userId: DEFAULT_USER_ID,
          itemIds: cart.map((c) => c.item.id),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCoins(data.data.newCoins);
        setPurchasedIds((prev) => [...prev, ...cart.map((c) => c.item.id)]);
        setCart([]);
        setCartOpen(false);
        showNotification('success', `Purchase successful! Items unlocked!`);
      } else {
        showNotification('error', data.error || 'Purchase failed');
      }
    } catch (e) {
      showNotification('error', 'Network error. Try again.');
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price, 0);
  const cartCount = cart.length;

  return (
    <div className="min-h-screen bg-rocky-dark py-8 px-4">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg font-bold text-sm animate-slide-in shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-rocky-red text-white'
          }`}
        >
          {notification.type === 'success' ? '✅' : '❌'} {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-rocky text-rocky-gold uppercase tracking-wider">🛒 Rocky Shop</h1>
            <p className="text-rocky-gray-light mt-1">Customize your battle experience</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="card flex items-center gap-2 py-2 px-4">
              <span className="text-2xl">🪙</span>
              <span className="text-rocky-gold font-bold text-xl">{coins}</span>
              <span className="text-rocky-gray text-sm">coins</span>
            </div>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative btn-primary flex items-center gap-2"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rocky-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedCategory === cat.value
                  ? 'bg-rocky-gold text-black scale-105'
                  : 'bg-rocky-card border border-rocky-border text-white hover:border-rocky-gold'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Items Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-5xl animate-spin inline-block">⚙️</div>
                <p className="text-rocky-gray mt-4">Loading shop...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl">📦</div>
                <p className="text-rocky-gray mt-4">No items in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <ShopItem
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    isPurchased={purchasedIds.includes(item.id)}
                    isInCart={!!cart.find((c) => c.item.id === item.id)}
                    userCoins={coins}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          {cartOpen && (
            <div className="w-80 shrink-0">
              <Cart
                items={cart}
                onRemove={removeFromCart}
                onCheckout={checkout}
                userCoins={coins}
                onClose={() => setCartOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

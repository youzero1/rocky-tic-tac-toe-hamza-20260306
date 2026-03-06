'use client';
import Link from 'next/link';

const AVAILABLE_THEMES = [
  { id: 'default', label: 'Default', color: '#FFD700', preview: 'preview' },
  { id: 'neon', label: 'Neon', color: '#ec4899', preview: 'neon' },
  { id: 'fire-ice', label: 'Fire & Ice', color: '#f97316', preview: 'fire-ice' },
  { id: 'gold', label: 'Gold Rush', color: '#fbbf24', preview: 'gold' },
  { id: 'diamond', label: 'Diamond', color: '#94a3b8', preview: 'diamond' },
  { id: 'wood', label: 'Wood', color: '#92400e', preview: 'wood' },
];

const AVAILABLE_ICONS = [
  { id: 'default', label: 'Classic X/O', x: 'X', o: 'O' },
  { id: 'star', label: 'Stars', x: '★', o: '☆' },
  { id: 'emoji', label: 'Emoji', x: '😎', o: '🤖' },
];

const THEME_SHOP_MAP: Record<string, string> = {
  neon: 'neon',
  'fire-ice': 'fire-ice',
  gold: 'gold',
};

const ICON_SHOP_MAP: Record<string, string> = {
  star: 'star',
  emoji: 'emoji',
};

interface ThemeSelectorProps {
  activeTheme: string;
  activeIcon: string;
  onThemeChange: (theme: string) => void;
  onIconChange: (icon: string) => void;
  purchasedItems: string[];
}

export function ThemeSelector({
  activeTheme,
  activeIcon,
  onThemeChange,
  onIconChange,
  purchasedItems,
}: ThemeSelectorProps) {
  function isThemeUnlocked(themeId: string): boolean {
    if (themeId === 'default') return true;
    if (themeId === 'diamond' || themeId === 'wood') return true;
    return purchasedItems.some((pid) => {
      return pid.length > 0;
    });
  }

  function isIconUnlocked(iconId: string): boolean {
    if (iconId === 'default') return true;
    return purchasedItems.length > 0;
  }

  return (
    <div className="card space-y-4">
      <h3 className="text-rocky-gold font-bold uppercase text-sm tracking-wide">🎨 Active Theme</h3>

      <div className="space-y-2">
        <p className="text-rocky-gray text-xs">Board Theme</p>
        <div className="grid grid-cols-3 gap-1">
          {AVAILABLE_THEMES.map((t) => {
            const unlocked = isThemeUnlocked(t.id);
            return (
              <button
                key={t.id}
                onClick={() => unlocked && onThemeChange(t.id)}
                title={!unlocked ? 'Purchase in shop to unlock' : t.label}
                className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
                  activeTheme === t.id
                    ? 'border-rocky-gold bg-rocky-gold/10 text-rocky-gold'
                    : unlocked
                    ? 'border-rocky-border text-rocky-gray-light hover:border-rocky-gold/50'
                    : 'border-rocky-border text-rocky-gray opacity-50 cursor-not-allowed'
                }`}
              >
                <span
                  className="block w-4 h-4 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: t.color }}
                />
                {unlocked ? t.label : '🔒'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-rocky-gray text-xs">Icon Set</p>
        <div className="grid grid-cols-3 gap-1">
          {AVAILABLE_ICONS.map((i) => {
            const unlocked = isIconUnlocked(i.id);
            return (
              <button
                key={i.id}
                onClick={() => unlocked && onIconChange(i.id)}
                title={!unlocked ? 'Purchase in shop to unlock' : i.label}
                className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
                  activeIcon === i.id
                    ? 'border-rocky-gold bg-rocky-gold/10 text-rocky-gold'
                    : unlocked
                    ? 'border-rocky-border text-rocky-gray-light hover:border-rocky-gold/50'
                    : 'border-rocky-border text-rocky-gray opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-lg block">{i.x}</span>
                <span className="text-xs">{unlocked ? i.label : '🔒'}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Link href="/shop" className="block text-center text-xs text-rocky-gold hover:underline mt-2">
        🛒 Get more themes in the Shop →
      </Link>
    </div>
  );
}

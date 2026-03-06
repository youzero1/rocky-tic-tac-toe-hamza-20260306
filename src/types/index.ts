export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameMode = 'pvp' | 'ai';
export type GameResult = 'X' | 'O' | 'draw' | null;
export type ShopCategory = 'theme' | 'icon' | 'skin' | 'animation';

export interface GameState {
  board: CellValue[];
  currentPlayer: Player;
  winner: GameResult;
  gameOver: boolean;
  winningLine: number[] | null;
  mode: GameMode;
  moveHistory: number[];
  scores: { X: number; O: number; draws: number };
}

export interface UserData {
  id: string;
  username: string;
  coins: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShopItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ShopCategory;
  imageUrl: string;
  isActive: boolean;
  preview?: string;
}

export interface PurchaseData {
  id: string;
  userId: string;
  shopItemId: string;
  purchasedAt: string;
  price: number;
  item?: ShopItemData;
}

export interface CartItem {
  item: ShopItemData;
  quantity: number;
}

export interface GameTheme {
  id: string;
  name: string;
  bgColor: string;
  boardColor: string;
  xColor: string;
  oColor: string;
  lineColor: string;
  textColor: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

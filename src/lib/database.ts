import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@/entity/User';
import { GameRecord } from '@/entity/GameRecord';
import { ShopItem } from '@/entity/ShopItem';
import { Purchase } from '@/entity/Purchase';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = process.env.DATABASE_PATH || './data/rocky-tic-tac-toe.sqlite';
const absoluteDbPath = path.isAbsolute(DB_PATH)
  ? DB_PATH
  : path.join(process.cwd(), DB_PATH);

let AppDataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (AppDataSource && AppDataSource.isInitialized) {
    return AppDataSource;
  }

  const fs = await import('fs');
  const dir = path.dirname(absoluteDbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: absoluteDbPath,
    entities: [User, GameRecord, ShopItem, Purchase],
    synchronize: true,
    logging: false,
  });

  await AppDataSource.initialize();
  await seedDatabase(AppDataSource);
  return AppDataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const shopItemRepo = ds.getRepository(ShopItem);
  const count = await shopItemRepo.count();
  if (count > 0) return;

  const initialItems: Omit<ShopItem, 'createdAt'>[] = [
    {
      id: uuidv4(),
      name: 'Neon Nights Theme',
      description: 'A vibrant neon theme with glowing effects on a dark background.',
      price: 50,
      category: 'theme',
      imageUrl: '',
      preview: 'neon',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Fire & Ice Theme',
      description: 'Red hot X vs icy blue O — the ultimate elemental battle.',
      price: 75,
      category: 'theme',
      imageUrl: '',
      preview: 'fire-ice',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Gold Rush Theme',
      description: 'Luxurious gold and black theme fit for a champion.',
      price: 100,
      category: 'theme',
      imageUrl: '',
      preview: 'gold',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Star Icons',
      description: 'Replace X and O with stunning star shapes.',
      price: 30,
      category: 'icon',
      imageUrl: '',
      preview: 'star',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Emoji Icons',
      description: 'Play with fun emoji icons — 😎 vs 🤖.',
      price: 40,
      category: 'icon',
      imageUrl: '',
      preview: 'emoji',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Diamond Board Skin',
      description: 'A sparkling diamond-patterned board skin.',
      price: 60,
      category: 'skin',
      imageUrl: '',
      preview: 'diamond',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Wood Board Skin',
      description: 'Classic wooden board with a rustic feel.',
      price: 45,
      category: 'skin',
      imageUrl: '',
      preview: 'wood',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Confetti Victory',
      description: 'Celebrate your wins with a confetti explosion animation.',
      price: 55,
      category: 'animation',
      imageUrl: '',
      preview: 'confetti',
      isActive: 1,
    },
    {
      id: uuidv4(),
      name: 'Fireworks Victory',
      description: 'Light up the sky with fireworks when you win!',
      price: 80,
      category: 'animation',
      imageUrl: '',
      preview: 'fireworks',
      isActive: 1,
    },
  ];

  for (const item of initialItems) {
    const shopItem = shopItemRepo.create(item);
    await shopItemRepo.save(shopItem);
  }
}

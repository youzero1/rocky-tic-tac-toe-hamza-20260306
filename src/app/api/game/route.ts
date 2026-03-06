import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { GameRecord } from '@/entity/GameRecord';
import { User } from '@/entity/User';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_USER_ID } from '@/lib/utils';

const WIN_REWARD = parseInt(process.env.WIN_REWARD || '10', 10);
const DRAW_REWARD = parseInt(process.env.DRAW_REWARD || '3', 10);

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const gameRepo = ds.getRepository(GameRecord);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEFAULT_USER_ID;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const games = await gameRepo.find({
      where: { userId },
      order: { playedAt: 'DESC' },
      take: limit,
    });

    return NextResponse.json({ success: true, data: games });
  } catch (error) {
    console.error('Game GET error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const gameRepo = ds.getRepository(GameRecord);
    const userRepo = ds.getRepository(User);
    const body = await request.json();
    const { winner, mode, moves, userId } = body;

    const uid = userId || DEFAULT_USER_ID;

    const record = gameRepo.create({
      id: uuidv4(),
      winner: winner || null,
      mode: mode || 'pvp',
      moves: JSON.stringify(moves || []),
      userId: uid,
    });
    await gameRepo.save(record);

    let newCoins: number | undefined;
    let user = await userRepo.findOne({ where: { id: uid } });

    if (!user) {
      user = userRepo.create({
        id: uid,
        username: 'Rocky Player',
        coins: parseInt(process.env.INITIAL_COINS || '100', 10),
      });
      await userRepo.save(user);
    }

    if (winner === 'X') {
      user.coins += WIN_REWARD;
      await userRepo.save(user);
      newCoins = user.coins;
    } else if (winner === 'draw') {
      user.coins += DRAW_REWARD;
      await userRepo.save(user);
      newCoins = user.coins;
    }

    return NextResponse.json({ success: true, data: { record, newCoins } });
  } catch (error) {
    console.error('Game POST error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entity/User';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_USER_ID, DEFAULT_USERNAME } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEFAULT_USER_ID;

    let user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      user = userRepo.create({
        id: userId,
        username: DEFAULT_USERNAME,
        coins: parseInt(process.env.INITIAL_COINS || '100', 10),
      });
      await userRepo.save(user);
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('User GET error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const body = await request.json();

    const user = userRepo.create({
      id: uuidv4(),
      username: body.username || DEFAULT_USERNAME,
      coins: parseInt(process.env.INITIAL_COINS || '100', 10),
    });
    await userRepo.save(user);

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('User POST error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const body = await request.json();
    const { userId, coins } = body;

    let user = await userRepo.findOne({ where: { id: userId || DEFAULT_USER_ID } });
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    user.coins = coins;
    await userRepo.save(user);

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('User PUT error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

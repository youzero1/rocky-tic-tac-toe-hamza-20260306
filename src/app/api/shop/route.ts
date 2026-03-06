import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { ShopItem } from '@/entity/ShopItem';
import { Purchase } from '@/entity/Purchase';
import { User } from '@/entity/User';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_USER_ID } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId') || DEFAULT_USER_ID;

    if (action === 'items') {
      const shopItemRepo = ds.getRepository(ShopItem);
      const items = await shopItemRepo.find({ where: { isActive: 1 } });
      return NextResponse.json({ success: true, data: items });
    }

    if (action === 'purchases') {
      const purchaseRepo = ds.getRepository(Purchase);
      const purchases = await purchaseRepo.find({ where: { userId } });
      return NextResponse.json({ success: true, data: purchases });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Shop GET error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const body = await request.json();
    const { action, userId, itemIds } = body;
    const uid = userId || DEFAULT_USER_ID;

    if (action === 'purchase') {
      const shopItemRepo = ds.getRepository(ShopItem);
      const purchaseRepo = ds.getRepository(Purchase);
      const userRepo = ds.getRepository(User);

      let user = await userRepo.findOne({ where: { id: uid } });
      if (!user) {
        user = userRepo.create({
          id: uid,
          username: 'Rocky Player',
          coins: parseInt(process.env.INITIAL_COINS || '100', 10),
        });
        await userRepo.save(user);
      }

      const items = await shopItemRepo.findByIds(itemIds);
      const total = items.reduce((sum: number, item: ShopItem) => sum + item.price, 0);

      if (user.coins < total) {
        return NextResponse.json({ success: false, error: 'Insufficient coins' }, { status: 400 });
      }

      const existingPurchases = await purchaseRepo.find({ where: { userId: uid } });
      const existingIds = existingPurchases.map((p) => p.shopItemId);
      const newItems = items.filter((item: ShopItem) => !existingIds.includes(item.id));

      if (newItems.length === 0) {
        return NextResponse.json({ success: false, error: 'All items already purchased' }, { status: 400 });
      }

      const newTotal = newItems.reduce((sum: number, item: ShopItem) => sum + item.price, 0);
      user.coins -= newTotal;
      await userRepo.save(user);

      for (const item of newItems) {
        const purchase = purchaseRepo.create({
          id: uuidv4(),
          userId: uid,
          shopItemId: item.id,
          price: item.price,
        });
        await purchaseRepo.save(purchase);
      }

      return NextResponse.json({
        success: true,
        data: { newCoins: user.coins, purchasedCount: newItems.length },
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Shop POST error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

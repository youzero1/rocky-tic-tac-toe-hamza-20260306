import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('shop_items')
export class ShopItem {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'integer' })
  price!: number;

  @Column({ type: 'text' })
  category!: string;

  @Column({ type: 'text', default: '' })
  imageUrl!: string;

  @Column({ type: 'text', default: '' })
  preview!: string;

  @Column({ type: 'integer', default: 1 })
  isActive!: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}

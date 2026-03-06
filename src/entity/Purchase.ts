import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('purchases')
export class Purchase {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text' })
  userId!: string;

  @Column({ type: 'text' })
  shopItemId!: string;

  @Column({ type: 'integer' })
  price!: number;

  @CreateDateColumn({ type: 'datetime' })
  purchasedAt!: Date;
}

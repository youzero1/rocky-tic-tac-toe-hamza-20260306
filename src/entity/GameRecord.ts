import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('game_records')
export class GameRecord {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text', nullable: true })
  winner!: string | null;

  @Column({ type: 'text' })
  mode!: string;

  @Column({ type: 'text' })
  moves!: string;

  @Column({ type: 'text', nullable: true })
  userId!: string | null;

  @CreateDateColumn({ type: 'datetime' })
  playedAt!: Date;
}

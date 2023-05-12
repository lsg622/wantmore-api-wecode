import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  user_id: number;
}

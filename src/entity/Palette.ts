import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity('palettes')
export class Palette extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('int', { default: 0 })
  saves: number;

  @Column('int', { default: 0 })
  views: number;

  @Column('text', { array: true })
  colors: string[];

  @Column('text', { array: true })
  tags: string[];

  @Column('uuid')
  ownerid: string;

  @Column('varchar', { length: 255 })
  ownerusername: string;

  @ManyToOne(() => User, user => user.palettes)
  @JoinColumn({ name: 'ownerid' })
  user: User;
}
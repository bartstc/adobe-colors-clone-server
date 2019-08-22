import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Palette } from './Palette';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  username!: string;

  @Column('varchar', { length: 255 })
  email!: string;

  @Column('text')
  password!: string;

  @OneToMany(() => Palette, palette => palette.user)
  palettes!: Palette[];

  @Column('text', { array: true })
  savedPalettes!: string[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

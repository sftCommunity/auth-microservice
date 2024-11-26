import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  user_id: string;

  @Column('text', { nullable: false })
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('timestamp')
  expires_at: Date;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  user: User;

  @BeforeInsert()
  setExpirationDate() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);
    this.expires_at = expirationDate;
  }
}

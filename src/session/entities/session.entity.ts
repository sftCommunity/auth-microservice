import { User } from 'src/user/entities';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  ip_address: string;

  @Column('text', { nullable: false })
  user_agent: string;

  @Column('boolean', { default: true })
  is_active: boolean;

  @Column('date')
  create_at: Date;

  @Column('date', {
    nullable: true,
  })
  expires_at: Date;

  @ManyToOne(() => User, (user) => user.sessions, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  user_id: string;

  @BeforeInsert()
  setCreateAt() {
    this.create_at = new Date();
  }

  @BeforeInsert()
  setExpiresAt() {
    const DAYS_TO_EXPIRE = 2;
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    this.expires_at = new Date(
      this.create_at.getTime() + DAYS_TO_EXPIRE * MS_PER_DAY,
    );
  }
}

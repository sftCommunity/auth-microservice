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
    this.expires_at = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  }
}

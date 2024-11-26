import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login_attempts')
export class LoginAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  user_id: string;

  @Column('text', { nullable: false })
  ip_address: string;

  @Column('timestamp', { nullable: false })
  created_at: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('password_reset')
export class PasswordReset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  user_id: string;

  @Column('text', { nullable: false })
  token: string;

  @Column('timestamp', { nullable: false })
  expires_at: Date;
}

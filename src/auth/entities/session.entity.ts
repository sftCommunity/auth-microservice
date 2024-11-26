import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('timestamp', { nullable: false })
  expires_at: Date;
}

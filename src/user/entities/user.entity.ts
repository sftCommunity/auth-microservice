import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column('text', { nullable: false })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column('text', { unique: true, nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column('text', { nullable: false, select: false })
  password: string;

  @Column('bool', { default: true })
  @IsBoolean()
  is_active: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}

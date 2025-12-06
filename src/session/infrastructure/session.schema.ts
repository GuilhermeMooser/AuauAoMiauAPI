import { UserSchema } from '@/user/infrastructure/user.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('session')
export class SessionSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'jti' })
  jti: string;

  @Column({ name: 'expiresAt' })
  expiresAt: Date;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => UserSchema, user => user.session)
  user: UserSchema;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}

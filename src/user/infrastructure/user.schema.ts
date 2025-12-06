import { SessionSchema } from '@/session/infrastructure/session.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import { UserRoleSchema } from '@/user-role/infrastructure/user-role.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email', unique: true, length: 150 })
  email: string;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'cpf', unique: true, length: 14 })
  cpf: string;

  @JoinColumn({ name: 'user_role_id' })
  @ManyToOne(() => UserRoleSchema, userRole => userRole.user)
  role: UserRoleSchema;

  @OneToOne(() => SessionSchema, session => session.user)
  session: SessionSchema;
}

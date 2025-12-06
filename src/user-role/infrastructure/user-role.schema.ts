import { UserSchema } from '@/user/infrastructure/user.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role')
export class UserRoleSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => UserSchema, user => user.role)
  user: UserSchema;
}

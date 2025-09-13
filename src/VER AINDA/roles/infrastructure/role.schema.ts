import { PermissionSchema } from '@/VER AINDA/permission/infrastructure/permission.schema';
import { AuditableSchema } from '@/shared/infrastructure/auditable/auditable-schema';
import { UserSchema } from '@/users/infrastructure/user.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('roles')
export class RoleSchema extends AuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => UserSchema, user => user.roles)
  users: UserSchema[];

  @ManyToMany(() => PermissionSchema, permission => permission.roles, {
    eager: true,
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionSchema[];
}

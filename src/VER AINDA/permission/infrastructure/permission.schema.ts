// import { RoleSchema } from '@/VER AINDA/roles/infrastructure/role.schema';
// import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

// @Entity('permissions')
// export class PermissionSchema {
//   @PrimaryGeneratedColumn()
//   id: string;

//   @Column({ unique: true })
//   name: string;

//   @Column()
//   displayName: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column()
//   resource: string;

//   @Column()
//   action: string;

//   @Column({ default: true })
//   active: boolean;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @ManyToMany(() => RoleSchema, role => role.permissions)
//   roles: RoleSchema[];
// }

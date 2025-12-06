import { UserRole } from "./user-role.entity";

export interface UserRoleRepository {

  findByTypeId(id: number): Promise<UserRole>
}
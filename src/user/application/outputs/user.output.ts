import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { UserRoleOutput } from '@/user-role/application/outputs/user-role.output';
import { User } from '@/user/domain/user.entity';
import { Injectable } from '@nestjs/common';

export type UserOutput = {
  id: string;
  name: string;
  // password: string;
  email: string;
  active: boolean;
  cpf: string;
  role: UserRoleOutput;
};
@Injectable()
export class UserOutputMapper extends OutputMapper<User, UserOutput> {
  constructor() {
    super();
  }

  toOutput(entity: User): UserOutput {
    return {
      id: entity.id,
      name: entity.props.name,
      // password: entity.props.password,
      email: entity.props.email,
      active: entity.props.active,
      cpf: entity.props.cpf,
      role: entity.props.role,
    };
  }
}

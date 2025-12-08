import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit } from '@/shared/domain/entity';
import { UserRoleOutput } from '@/user-role/application/outputs/user-role.output';
import { User } from '@/user/domain/user.entity';
import { Injectable } from '@nestjs/common';

export type MinimalUserOutput = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  cpf: string;
  role: UserRoleOutput;
  audit: Audit;
};
@Injectable()
export class MinimalUserOutputMapper extends OutputMapper<
  User,
  MinimalUserOutput
> {
  constructor() {
    super();
  }

  toOutput(entity: User): MinimalUserOutput {
    return {
      id: entity.id,
      name: entity.props.name,
      email: entity.props.email,
      active: entity.props.active,
      cpf: entity.props.cpf,
      role: entity.props.role,
      audit: entity.props.audit,
    };
  }
}

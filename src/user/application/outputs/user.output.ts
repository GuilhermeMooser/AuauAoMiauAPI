import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit, UserAudit } from '@/shared/domain/entity';
import { UserRoleOutput } from '@/user-role/application/outputs/user-role.output';
import { User } from '@/user/domain/user.entity';
import { Injectable } from '@nestjs/common';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  cpf: string;
  role: UserRoleOutput;
  audit: Audit;
  userAudit: UserAudit;
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
      email: entity.props.email,
      active: entity.props.active,
      cpf: entity.props.cpf,
      role: entity.props.role,
      audit: {
        createdAt: entity.props.audit.createdAt,
        updatedAt: entity.props.audit.updatedAt,
        deletedAt: entity.props.audit.deletedAt,
      },
      userAudit: {
        createdByUserId: entity.props.createdByUserId,
        updatedByUserId: entity.props.updatedByUserId,
        deletedByUserId: entity.props.deletedByUserId,
      },
    };
  }
}

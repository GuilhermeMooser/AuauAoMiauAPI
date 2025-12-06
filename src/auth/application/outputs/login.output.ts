import { UserOutput } from '@/shared/application/dtos/user-output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import type { UserRoleOutput } from '@/user-role/application/outputs/user-role.output';
import { User } from '@/user/domain/user.entity';
import { Injectable } from '@nestjs/common';

export type LoginOutput = {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRoleOutput;
    active: boolean;
  };
};

@Injectable()
export class LoginOutputMapper extends OutputMapper<User, LoginOutput> {
  toOutput(entity: User): LoginOutput {
    return {
      user: {
        id: entity.props.id,
        name: entity.props.name,
        email: entity.props.email,
        role: entity.props.role,
        active: entity.props.active,
      },
    };
  }
}

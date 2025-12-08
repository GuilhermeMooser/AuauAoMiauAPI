import type { Audit, UserAudit } from '@/shared/domain/entity';
import { UserRolePresenter } from '@/user-role/infrastructure/presenters/user-role.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty({ description: `Authenticated user's id` })
  id: string;

  @ApiProperty({ description: `Authenticated user's name` })
  name: string;

  @ApiProperty({ description: `Authenticated user's email` })
  email: string;

  @ApiProperty({ description: `Authenticated user's role` })
  role: UserRolePresenter;

  @ApiProperty({
    description: 'Boolean that indicates whether the user is active or not',
  })
  active: boolean;

  @ApiProperty({ description: 'Auditable' })
  audit?: Audit;

  @ApiProperty({ description: 'User Auditable' })
  userAudit?: UserAudit;
}

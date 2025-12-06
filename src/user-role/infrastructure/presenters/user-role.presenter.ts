import { ApiProperty } from '@nestjs/swagger';

export class UserRolePresenter {
  @ApiProperty({ description: `Authenticated user's role id` })
  id: number;

  @ApiProperty({ description: `Authenticated user's role name` })
  name: string;
}

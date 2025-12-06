import { UserPresenter } from '@/user/infrastructure/presenters/user.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPresenter {
  @ApiProperty({
    description: 'Information from the user who performed the authentication',
  })
  user: UserPresenter;
}

import { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { User } from '@/user/domain/user.entity';
import { Injectable, Scope } from '@nestjs/common';

/** Create a new instance of the class for each request */
@Injectable({ scope: Scope.REQUEST })
export class LoggedUserServiceImpl implements LoggedUserService {
  private loggedUser: User;

  getLoggedUser(): User {
    return this.loggedUser;
  }
  setLoggedUser(loggedUser: User): void {
    this.loggedUser = loggedUser;
  }
}

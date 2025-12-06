import { User } from '@/user/domain/user.entity';

export interface LoggedUserService {
  getLoggedUser(): User;
  setLoggedUser(loggedUser: User): void;
}

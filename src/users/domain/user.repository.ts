import { Repository } from '@/shared/domain/repository';
import { User } from './user.entity';

export interface UserRepository extends Repository<User> {}

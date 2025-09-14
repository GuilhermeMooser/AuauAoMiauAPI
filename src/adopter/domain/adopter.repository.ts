import { Repository } from '@/shared/domain/repositories/repository';
import { Adopter } from './adopter.entity';

export interface AdopterRepository extends Repository<Adopter> {
  existsCpf(cpf: string): Promise<boolean>;
  existsEmail(email: string): Promise<boolean>;
}

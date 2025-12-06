import { Encryption } from '@/shared/application/utils/encryption';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '../env-config/env-config.service';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class EncryptionImpl implements Encryption {
  constructor(private readonly envConfigService: EnvConfigService) {}

  compareHash(passwordCompare: string, passwordEncrypted: string): boolean {
    return compareSync(passwordCompare, passwordEncrypted);
  }
  generateHash(password: string): string {
    const salts = this.envConfigService.getEncryptionSalts();
    return hashSync(password, salts);
  }
}

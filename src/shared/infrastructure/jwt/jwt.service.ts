/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  GenerateJwtToken,
  JwtService,
  Options,
  Payload,
} from '@/shared/application/jwt/jwt.service';
import { User } from '@/user/domain/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceImpl implements JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async verifyJwt(jwt: string): Promise<Payload | null> {
    try {
      return await this.jwtService.verifyAsync<Payload>(jwt);
    } catch (error) {
      return null;
    }
  }

  decodeJwt(jwt: string): Payload {
    return this.jwtService.decode<Payload>(jwt);
  }

  async generateJwt(
    user: User,
    { jti, ...options }: Options,
  ): Promise<GenerateJwtToken> {
    const payload = {
      sub: user.id,
      login: user.name,
      role: user.role
        ? {
            id: user.role.id,
            type: user.role.name,
          }
        : null,
      jti: null,
    };

    if (jti) {
      payload.jti = jti;
    }

    const token = await this.jwtService.signAsync(payload, { ...options });

    return { token };
  }
}

import { UserRole } from "@/user-role/domain/user-role.entity";
import { User } from "@/user/domain/user.entity";

export type GenerateJwtToken = {
  token: string;
};

export type Options = {
  secret?: string;
  expiresIn?: number;
  jti?: string;
};

export type Payload = {
  sub: number;
  login: string;
  role: UserRole;
  jti?: string;
  iat: number;
  exp: number;
};

export interface JwtService {
  generateJwt(user: User, options?: Options): Promise<GenerateJwtToken>;
  decodeJwt(jwt: string): Payload;
  verifyJwt(jwt: string): Promise<Payload | null>;
}

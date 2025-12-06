import { User } from '@/user/domain/user.entity';

type SessionProps = {
  id?: number;
  user: User;
  jti: string;
  expiresAt: Date;
};

export class Session {
  id: number;
  user: User;
  jti: string;
  expiresAt: Date;

  constructor(props: SessionProps) {
    Object.assign(this, props);
  }
}

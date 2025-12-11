import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../domain/session.repository';
import { Session } from '../domain/session.entity';
import { Repository } from 'typeorm';
import { SessionSchema } from './session.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from '@/user/infrastructure/mapper/user.mapper';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(
    @InjectRepository(SessionSchema)
    private readonly sessionRepository: Repository<SessionSchema>,
  ) {}

  findByUserId(userId: string): Promise<Session | null> {
    throw new Error('Method not implemented.');
  }

  async findByUserIdAndJti(
    userId: string,
    jti: string,
  ): Promise<Session | null> {
    const session = await this.sessionRepository.findOneBy({
      user: { id: userId },
      jti,
    });

    return { ...session, user: UserMapper.instance.toEntity(session.user) };
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.sessionRepository.delete({
      user: { id: userId },
    });
  }

  async create(entity: Partial<Session>): Promise<Session> {
    const session = await this.sessionRepository.save(entity);
    return session;
  }

  async deleteByJti(jti: string): Promise<void> {
    await this.sessionRepository.delete({ jti });
  }
}

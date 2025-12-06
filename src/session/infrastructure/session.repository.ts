import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../domain/session.repository';
import { Session } from '../domain/session.entity';
import { Repository } from 'typeorm';
import { SessionSchema } from './session.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(
    @InjectRepository(SessionSchema)
    private readonly sessionRepository: Repository<SessionSchema>,
  ) {}

  async create(entity: Partial<Session>): Promise<Session> {
    const session = await this.sessionRepository.save(entity);
    return session;
  }

  findByUserId(userId: number): Promise<Session | null> {
    throw new Error('Method not implemented.');
  }
  findByUserIdAndJti(userId: number, jti: string): Promise<Session | null> {
    throw new Error('Method not implemented.');
  }
  deleteByUserId(userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteByJti(jti: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

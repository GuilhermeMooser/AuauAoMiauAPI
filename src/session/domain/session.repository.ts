import { CreateRepository } from "@/shared/domain/repositories/repository";
import { Session } from "./session.entity";

export interface SessionRepository extends CreateRepository<Session> {
  findByUserId(userId: string): Promise<Session | null>;
  findByUserIdAndJti(userId: string, jti: string): Promise<Session | null>;
  deleteByUserId(userId: string): Promise<void>;
  deleteByJti(jti: string): Promise<void>;
}

import { CreateRepository } from "@/shared/domain/repositories/repository";
import { Session } from "./session.entity";

export interface SessionRepository extends CreateRepository<Session> {
  findByUserId(userId: number): Promise<Session | null>;
  findByUserIdAndJti(userId: number, jti: string): Promise<Session | null>;
  deleteByUserId(userId: number): Promise<void>;
  deleteByJti(jti: string): Promise<void>;
}

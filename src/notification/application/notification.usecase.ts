import { Injectable } from "@nestjs/common";
import { Observable, Subject } from "rxjs";

export type NotificationEvent = {
  adoptersCount: number;
  adopters: { id: string; name: string; email: string, phone: string }[];
}

@Injectable()
export class NotificationUseCase {
  private streams = new Map<string, Subject<MessageEvent>>();
  private pendingAdopters: NotificationEvent['adopters'] = [];

  getStream(userId: string): Observable<MessageEvent> {
    if (!this.streams.has(userId)) {
      this.streams.set(userId, new Subject<MessageEvent>());
    }
    return this.streams.get(userId).asObservable();
  }

  removeStream(userId: string) {
    this.streams.get(userId)?.complete();
    this.streams.delete(userId);
  }

  emitToAll(data: NotificationEvent) {
    this.pendingAdopters.push(...data.adopters);
    this.streams.forEach(subject => subject.next({ data } as MessageEvent));
  }

  getPending() {
    return this.pendingAdopters;
  }

  clearPending() {
    this.pendingAdopters = [];
  }

  removePending(adopterId: string) {
    this.pendingAdopters = this.pendingAdopters.filter(a => a.id !== adopterId);
  }
}
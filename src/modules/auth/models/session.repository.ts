import { Session } from "./session.model";

export interface SessionRepo {
  save(session: Session): Promise<number>;
  getSession(ip: string, userId: number): Promise<Session>;
}

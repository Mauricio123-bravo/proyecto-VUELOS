import { Equal } from "typeorm";
import { AppDataSource } from "../../../data/pg";
import { Session } from "../models/models/session.model";
import { SessionRepo } from "../models/session.repository";
import { SessionEntity } from "./session.entity";
import { InvalidCredentials } from "../models/errors/credential.error";

export class SessionPgRepo implements SessionRepo {
  private repository = AppDataSource.getRepository(SessionEntity);

  async getSession(ip: string, userId: number): Promise<Session> {
    const session = await this.repository.findOne({
      where: {
        ipAddress: Equal(ip),
        user: Equal(userId),
      },
      relations: ["user"],
    });

    if (!session) {
      throw new InvalidCredentials();
    }

    return session;
  }

  async save(session: Session): Promise<number> {
    return (await this.repository.save(session)).id;
  }
}

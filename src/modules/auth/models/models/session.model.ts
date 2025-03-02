import { User } from "../../../users/models/user.model";

export abstract class Session {
  id: number;
  user: User | undefined;
  token: string;
  revoked: boolean = false;
  ipAddress: string;
}

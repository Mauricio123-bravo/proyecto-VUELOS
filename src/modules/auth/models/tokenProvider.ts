import { User } from "../../users/models/user.model";
import { Token } from "./token.model";

export interface TokenProvider {
  /** Return Signed token, expiration is the time in seconds */
  generateToken(user: User | null, expiration: number): string;
  validate(token: string): void;
  getPayload(token: string): Token;
}

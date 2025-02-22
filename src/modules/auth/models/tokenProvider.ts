import { User } from "@users/models/user.model";
import { Token } from "./token";

export interface TokenProvider {
    getToken(user: User): string
    validate(token: string): boolean
    getPayload(token: string): Token
}

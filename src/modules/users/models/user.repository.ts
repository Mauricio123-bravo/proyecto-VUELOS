import { User } from "./user.model";


export interface UserRepo{
    findAll(): Promise<User[]>
}
import { Located } from "./located.model";

export interface LocatedRepo{
    findAll(): Promise<Located[]>
}
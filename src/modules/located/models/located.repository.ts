import { Located } from "./located.model";

export interface LocatedRepo {
    findAll(): Promise<Located[]>
    findAllPaginated(limit: number, offset: number): Promise<{ located: Located[], total: number }>;
}
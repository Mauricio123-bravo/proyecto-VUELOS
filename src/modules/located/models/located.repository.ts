import { Located } from "./located.model";

export interface LocatedRepo {
    findAll(): Promise<Located[]>
    findAllPaginated(limit: number, offset: number): Promise<{ located: Located[], total: number }>;
    findById(id: number): Promise<Located | null>;
    create(located: Located): Promise<Located>;
    update(id: number, located: Partial<Located>): Promise<Located | null>;
    delete(id: number): Promise<boolean>;
}
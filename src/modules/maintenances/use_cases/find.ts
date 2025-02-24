import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";

export class FindMaintenancesUseCase {
  constructor(private readonly repository: MaintenanceRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: Maintenance[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<Maintenance>(response.total, response.maintenances, limit);
  };
}

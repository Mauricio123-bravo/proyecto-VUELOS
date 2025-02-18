import { MaintenancePgRepo } from "./adapters/maintenance.repo";
import { MaintenanceController } from "./adapters/maintenanceController";
import MaintenanceRouter from "./adapters/maintenanceRouter";
import { MaintenanceRepo } from "./models/maintenance.repository";
import { FindMaintenancesUseCase } from "./use_cases/find";

const maintenanceRepository: MaintenanceRepo = new MaintenancePgRepo();
const findMaintenanceUseCase: FindMaintenancesUseCase = new FindMaintenancesUseCase(
    maintenanceRepository,
);
const maintenanceController: MaintenanceController = new MaintenanceController(
    findMaintenanceUseCase,
);
const maintenanceRouter: MaintenanceRouter= new MaintenanceRouter(maintenanceController);

export { maintenanceRouter };

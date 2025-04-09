import { authMiddleware } from "../auth/dependencies";
import { MaintenancePgRepo } from "./adapters/maintenance.repo";
import { MaintenanceController } from "./adapters/maintenanceController";
import MaintenanceRouter from "./adapters/maintenanceRouter";
import { MaintenanceRepo } from "./models/maintenance.repository";
import { CreateMaintenanceUseCase } from "./use_cases/create";
import { DeleteMaintenanceUseCase } from "./use_cases/delete";
import { FindMaintenancesUseCase } from "./use_cases/find";
import { FindAllMaintenanceUseCase } from "./use_cases/findAll";
import { FindMaintenanceByIdUseCase } from "./use_cases/findById";
import { UpdateMaintenanceUseCase } from "./use_cases/update";

const maintenanceRepository: MaintenanceRepo = new MaintenancePgRepo();

const findAllMaintenanceUseCase: FindAllMaintenanceUseCase = new FindAllMaintenanceUseCase(
    maintenanceRepository,
);
const findMaintenanceUseCase: FindMaintenancesUseCase = new FindMaintenancesUseCase(
    maintenanceRepository,
);
const findByIdMaintenanceUseCase: FindMaintenanceByIdUseCase = new FindMaintenanceByIdUseCase(
    maintenanceRepository,
);
const createMaintenanceUseCase: CreateMaintenanceUseCase = new CreateMaintenanceUseCase(
    maintenanceRepository,
);
const updateMaintenanceUseCase: UpdateMaintenanceUseCase = new UpdateMaintenanceUseCase(
    maintenanceRepository,
);
const deleteMaintenanceUseCase: DeleteMaintenanceUseCase = new DeleteMaintenanceUseCase(
    maintenanceRepository,
);

const maintenanceController: MaintenanceController = new MaintenanceController(
    findAllMaintenanceUseCase, findMaintenanceUseCase, findByIdMaintenanceUseCase, createMaintenanceUseCase, updateMaintenanceUseCase, deleteMaintenanceUseCase
);

const maintenanceRouter: MaintenanceRouter = new MaintenanceRouter(maintenanceController, authMiddleware);

export { maintenanceRouter };

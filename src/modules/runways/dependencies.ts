import { authMiddleware } from "../auth/dependencies";
import { RunwaykPgRepo } from "./adapters/runway.repo";
import { RunwayController } from "./adapters/runwayController";
import RunwayRouter from "./adapters/runwayRouter";
import { RunwayRepo } from "./models/runway.repository";
import { CreateRunwayUseCase } from "./use_cases/create";
import { DeleteRunwayUseCase } from "./use_cases/delete";
import { FindRunwayByIdUseCase } from "./use_cases/finById";
import { FindRunwaysUseCase } from "./use_cases/find";
import { UpdateRunwayUseCase } from "./use_cases/update";

const runwayRepository: RunwayRepo = new RunwaykPgRepo();
const findRunwaysUseCase: FindRunwaysUseCase = new FindRunwaysUseCase(
    runwayRepository,
);
const findByIdRunwaysUseCase: FindRunwayByIdUseCase = new FindRunwayByIdUseCase(
    runwayRepository,
);
const createRunwaysUseCase: CreateRunwayUseCase = new CreateRunwayUseCase(
    runwayRepository,
);
const updateRunwaysUseCase: UpdateRunwayUseCase = new UpdateRunwayUseCase(
    runwayRepository,
);
const deleteRunwaysUseCase: DeleteRunwayUseCase = new DeleteRunwayUseCase(
    runwayRepository,
);

const runwayController: RunwayController = new RunwayController(
    findRunwaysUseCase, findByIdRunwaysUseCase, createRunwaysUseCase, updateRunwaysUseCase, deleteRunwaysUseCase
);
const runwayRouter: RunwayRouter = new RunwayRouter(runwayController, authMiddleware);

export { runwayRouter };

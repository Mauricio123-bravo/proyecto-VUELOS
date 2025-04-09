import { authMiddleware } from "../auth/dependencies";
import { PilotPgRepo } from "./adapters/pilot.repo";
import { PilotController } from "./adapters/pilotController";
import PilotRouter from "./adapters/pilotsRouter";
import { PilotRepo } from "./models/pilot.repository";
import { CreatePilotUseCase } from "./use_cases/create";
import { DeletePilotUseCase } from "./use_cases/delete";
import { FindPaginatedPilotsUseCase } from "./use_cases/find";
import { FindAllPilotUseCase } from "./use_cases/findAll";
import { FindPilotByIdUseCase } from "./use_cases/findById";
import { UpdatePilotUseCase } from "./use_cases/update";

const pilotRepository: PilotRepo = new PilotPgRepo();
const findPaginatedPilotsUseCase: FindPaginatedPilotsUseCase = new FindPaginatedPilotsUseCase(
    pilotRepository,
);
const findAllPilotsUseCase: FindAllPilotUseCase = new FindAllPilotUseCase(
    pilotRepository,
);
const findByIdPilotsUseCase: FindPilotByIdUseCase = new FindPilotByIdUseCase(
    pilotRepository,
);
const createPilotsUseCase: CreatePilotUseCase = new CreatePilotUseCase(
    pilotRepository,
);
const updatePilotsUseCase: UpdatePilotUseCase = new UpdatePilotUseCase(
    pilotRepository,
);
const deletePilotsUseCase: DeletePilotUseCase = new DeletePilotUseCase(
    pilotRepository,
);

const pilotController: PilotController = new PilotController(
    findPaginatedPilotsUseCase, findAllPilotsUseCase, findByIdPilotsUseCase, createPilotsUseCase, updatePilotsUseCase, deletePilotsUseCase
);
const pilotRouter: PilotRouter = new PilotRouter(pilotController, authMiddleware);

export { pilotRouter };

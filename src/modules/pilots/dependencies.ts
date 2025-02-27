import { PilotPgRepo } from "./adapters/pilot.repo";
import { PilotController } from "./adapters/pilotController";
import PilotRouter from "./adapters/pilotsRouter";
import { PilotRepo } from "./models/pilot.repository";
import { CreatePilotUseCase } from "./use_cases/create";
import { DeletePilotUseCase } from "./use_cases/delete";
import { FindPilotsUseCase } from "./use_cases/find";
import { FindPilotByIdUseCase } from "./use_cases/findById";
import { UpdatePilotUseCase } from "./use_cases/update";

const pilotRepository: PilotRepo = new PilotPgRepo();
const findPilotsUseCase: FindPilotsUseCase = new FindPilotsUseCase(
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
    findPilotsUseCase, findByIdPilotsUseCase, createPilotsUseCase, updatePilotsUseCase, deletePilotsUseCase
);
const pilotRouter: PilotRouter = new PilotRouter(pilotController);

export { pilotRouter };

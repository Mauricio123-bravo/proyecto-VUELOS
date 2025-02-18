import { PilotPgRepo } from "./adapters/pilot.repo";
import { PilotController } from "./adapters/pilotController";
import PilotRouter from "./adapters/pilotsRouter";
import { PilotRepo } from "./models/pilot.repository";
import { FindPilotsUseCase } from "./use_cases/find";

const pilotRepository: PilotRepo = new PilotPgRepo();
const findPilotsUseCase: FindPilotsUseCase = new FindPilotsUseCase(
    pilotRepository,
);
const pilotController: PilotController = new PilotController(
    findPilotsUseCase,
);
const pilotRouter: PilotRouter= new PilotRouter(pilotController);

export { pilotRouter };

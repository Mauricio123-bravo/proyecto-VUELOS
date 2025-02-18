import { LocatedPgRepo } from "./adapters/located.repo";
import { LocatedController } from "./adapters/locatedController";
import LocatedRouter from "./adapters/locatedRouter";
import { LocatedRepo } from "./models/located.repository";
import { FindLocatedUseCase } from "./use_cases/find";

const locatedRepository: LocatedRepo = new LocatedPgRepo();
const findLocatedUseCase: FindLocatedUseCase = new FindLocatedUseCase(
    locatedRepository,
);
const locatedController: LocatedController = new LocatedController(
    findLocatedUseCase,
);
const locatedRouter: LocatedRouter= new LocatedRouter(locatedController);

export { locatedRouter };

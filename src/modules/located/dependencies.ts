import { authMiddleware } from "../auth/dependencies";
import { LocatedPgRepo } from "./adapters/located.repo";
import { LocatedController } from "./adapters/locatedController";
import LocatedRouter from "./adapters/locatedRouter";
import { LocatedRepo } from "./models/located.repository";
import { CreateLocatedUseCase } from "./use_cases/create";
import { DeleteLocatedUseCase } from "./use_cases/delete";
import { FindLocatedUseCase } from "./use_cases/find";
import { FindAllLocatedUseCase } from "./use_cases/findAll";
import { FindLocatedByIdUseCase } from "./use_cases/findById";
import { UpdateLocatedUseCase } from "./use_cases/update";

const locatedRepository: LocatedRepo = new LocatedPgRepo();

const findAllLocatedUseCase: FindAllLocatedUseCase = new FindAllLocatedUseCase(
    locatedRepository,
);
const findLocatedUseCase: FindLocatedUseCase = new FindLocatedUseCase(
    locatedRepository,
);
const findByIdLocatedUseCase: FindLocatedByIdUseCase = new FindLocatedByIdUseCase(
    locatedRepository,
);
const createLocatedUseCase: CreateLocatedUseCase = new CreateLocatedUseCase(
    locatedRepository,
);
const updateLocatedUseCase: UpdateLocatedUseCase = new UpdateLocatedUseCase(
    locatedRepository,
);
const deleteLocatedUseCase: DeleteLocatedUseCase = new DeleteLocatedUseCase(
    locatedRepository,
);

const locatedController: LocatedController = new LocatedController(
    findAllLocatedUseCase,findLocatedUseCase, findByIdLocatedUseCase, createLocatedUseCase, updateLocatedUseCase, deleteLocatedUseCase
);
const locatedRouter: LocatedRouter = new LocatedRouter(locatedController, authMiddleware);

export { locatedRouter };

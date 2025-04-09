import { AirplaneRepo } from "./models/airplane.repository";
import { AirplanePgRepo } from "./adapters/airplane.repo";
import { FindPaginatedAirplanesUseCase } from "./use_cases/find";
import { AirplaneController } from "./adapters/airplaneController";
import AirplaneRouter from "./adapters/airplaneRouter";
import { FindAirplaneByIdUseCase } from "./use_cases/findById";
import { CreateAirplaneUseCase } from "./use_cases/create";
import { UpdateAirplaneUseCase } from "./use_cases/update";
import { DeleteAirplaneUseCase } from "./use_cases/delete";
import { authMiddleware } from "../auth/dependencies";
import { FindAllAirplaneUseCase } from "./use_cases/findAll";

const airplaneRepository: AirplaneRepo = new AirplanePgRepo();
const findPaginatedAirplanesUseCase: FindPaginatedAirplanesUseCase = new FindPaginatedAirplanesUseCase(
  airplaneRepository,
);
const findAllAirplanesUseCase: FindAllAirplaneUseCase = new FindAllAirplaneUseCase(
  airplaneRepository,
);
const findByIdAirplanesUseCase: FindAirplaneByIdUseCase =
  new FindAirplaneByIdUseCase(airplaneRepository);
const createAirplanesUseCase: CreateAirplaneUseCase = new CreateAirplaneUseCase(
  airplaneRepository,
);
const updateAirplanesUseCase: UpdateAirplaneUseCase = new UpdateAirplaneUseCase(
  airplaneRepository,
);
const deleteAirplanesUseCase: DeleteAirplaneUseCase = new DeleteAirplaneUseCase(
  airplaneRepository,
);

const airplaneController: AirplaneController = new AirplaneController(
  findPaginatedAirplanesUseCase,
  findAllAirplanesUseCase,
  findByIdAirplanesUseCase,
  createAirplanesUseCase,
  updateAirplanesUseCase,
  deleteAirplanesUseCase,
);
const airplaneRouter: AirplaneRouter = new AirplaneRouter(
  airplaneController,
  authMiddleware,
);

export { airplaneRouter };

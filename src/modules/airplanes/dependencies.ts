import { AirplaneRepo } from "./models/airplane.repository";
import { AirplanePgRepo } from "./adapters/airplane.repo";
import { FindAirplanesUseCase } from "./use_cases/find";
import { AirplaneController } from "./adapters/airplaneController";
import AirplaneRouter from "./adapters/airplaneRouter";
import { FindAirplaneByIdUseCase } from "./use_cases/findById";
import { CreateAirplaneUseCase } from "./use_cases/create";
import { UpdateAirplaneUseCase } from "./use_cases/update";
import { DeleteAirplaneUseCase } from "./use_cases/delete";

const airplaneRepository: AirplaneRepo = new AirplanePgRepo();
const findAirplanesUseCase: FindAirplanesUseCase = new FindAirplanesUseCase(
  airplaneRepository,
);
const findByIdAirplanesUseCase: FindAirplaneByIdUseCase = new FindAirplaneByIdUseCase(
  airplaneRepository,
);
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
  findAirplanesUseCase, findByIdAirplanesUseCase, createAirplanesUseCase, updateAirplanesUseCase, deleteAirplanesUseCase
);
const airplaneRouter: AirplaneRouter = new AirplaneRouter(airplaneController);

export { airplaneRouter };

import { AirplaneRepo } from "./models/airplane.repository";
import { AirplanePgRepo } from "./adapters/airplane.repo";
import { FindAirplanesUseCase } from "./use_cases/find";
import { AirplaneController } from "./adapters/airplaneController";
import AirplaneRouter from "./adapters/airplaneRouter";

const airplaneRepository: AirplaneRepo = new AirplanePgRepo();
const findAirplanesUseCase: FindAirplanesUseCase = new FindAirplanesUseCase(
  airplaneRepository,
);
const airplaneController: AirplaneController = new AirplaneController(
  findAirplanesUseCase,
);
const airplaneRouter: AirplaneRouter = new AirplaneRouter(airplaneController);

export { airplaneRouter };

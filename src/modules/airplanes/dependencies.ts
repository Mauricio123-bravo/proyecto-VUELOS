import { AirplaneRepo } from "./models/airplane.repository";
import { AirplanePgRepo } from "./adapters/airplane.repo";
import { FindAirplanesUseCase } from "./use_cases/find";
import { AirplaneController } from "./adapters/airplaneController";

const airplaneRepository: AirplaneRepo = new AirplanePgRepo();
const findAirplanesUseCase: FindAirplanesUseCase = new FindAirplanesUseCase(
  airplaneRepository,
);
const airplaneController: AirplaneController = new AirplaneController(
  findAirplanesUseCase,
);

export { airplaneController };

import { FlightController } from "./flights/adapters/flightController";
import { FlightPgRepo } from "./flights/adapters/flight.repo";
import { FlightRepo } from "./flights/models/flight.repository";
import { FindFlightsUseCase } from "./flights/use_cases/find";
import { AirplaneRepo } from "./airplanes/models/airplane.repository";
import { AirplanePgRepo } from "./airplanes/adapters/airplane.repo";
import { FindAirplanesUseCase } from "./airplanes/use_cases/find";
import { AirplaneController } from "./airplanes/adapters/airplaneController";

const flightRepository: FlightRepo = new FlightPgRepo();
const findFlightsUseCase: FindFlightsUseCase = new FindFlightsUseCase(
  flightRepository,
);
const flightController: FlightController = new FlightController(
  findFlightsUseCase,
);

const airplaneRepository: AirplaneRepo = new AirplanePgRepo();findFlightsUseCase
const findAirplanesUseCase: FindAirplanesUseCase = new FindAirplanesUseCase(
  airplaneRepository,
);
const airplaneController: AirplaneController = new AirplaneController(
findAirplanesUseCase,
);

export { flightController };
export { airplaneController}

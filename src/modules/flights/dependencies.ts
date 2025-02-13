import { FlightController } from "./adapters/flightController";
import { FlightMariaDBRepo } from "./adapters/flightMariadb.repo";
import { FlightRepo } from "./models/flight.repository";
import { FindFlightsUseCase } from "./use_cases/find";

const flightRepository: FlightRepo = new FlightMariaDBRepo();
const findFlightsUseCase: FindFlightsUseCase = new FindFlightsUseCase(
  flightRepository,
);
const flightController: FlightController = new FlightController(
  findFlightsUseCase,
);

export { flightController };

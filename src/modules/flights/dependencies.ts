import { FlightPgRepo } from "./adapters/flight.repo";
import { FlightController } from "./adapters/flightController";
import FlightRouter from "./adapters/flightRouter";
import { FlightRepo } from "./models/flight.repository";
import { FindFlightsUseCase } from "./use_cases/find";

const flightRepository: FlightRepo = new FlightPgRepo();
const findFlightsUseCase: FindFlightsUseCase = new FindFlightsUseCase(
  flightRepository,
);
const flightController: FlightController = new FlightController(
  findFlightsUseCase,
);
const flightRouter: FlightRouter = new FlightRouter(flightController);

export { flightRouter };

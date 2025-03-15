import { authMiddleware } from "../auth/dependencies";
import { RunwaykPgRepo } from "../runways/adapters/runway.repo";
import { RunwayRepo } from "../runways/models/runway.repository";
import { FlightPgRepo } from "./adapters/flight.repo";
import { FlightController } from "./adapters/flightController";
import FlightRouter from "./adapters/flightRouter";
import { FlightRepo } from "./models/flight.repository";
import { CreateFlightUseCase } from "./use_cases/create";
import { DeleteFlightUseCase } from "./use_cases/delete";
import { FindFlightsUseCase } from "./use_cases/find";
import { FindFlightByIdUseCase } from "./use_cases/findById";
import { UpdateFlightUseCase } from "./use_cases/update";

const flightRepository: FlightRepo = new FlightPgRepo();
const runwayRepository: RunwayRepo = new RunwaykPgRepo();
const findFlightsUseCase: FindFlightsUseCase = new FindFlightsUseCase(
  flightRepository,
);
const findByIdFlightsUseCase: FindFlightByIdUseCase = new FindFlightByIdUseCase(
  flightRepository,
);
const createFlightsUseCase: CreateFlightUseCase = new CreateFlightUseCase(
  flightRepository, runwayRepository
);
const updateFlightsUseCase: UpdateFlightUseCase = new UpdateFlightUseCase(
  flightRepository,
);
const deleteFlightsUseCase: DeleteFlightUseCase = new DeleteFlightUseCase(
  flightRepository,
);

const flightController: FlightController = new FlightController(
  findFlightsUseCase, findByIdFlightsUseCase, createFlightsUseCase, updateFlightsUseCase, deleteFlightsUseCase
);
const flightRouter: FlightRouter = new FlightRouter(flightController, authMiddleware);

export { flightRouter };

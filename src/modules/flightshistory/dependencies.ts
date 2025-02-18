import { FlightHistoryPgRepo } from "./adapters/flightHistory.repo";
import { FlightHistoryController } from "./adapters/flightHistoryController";
import FlightHistoryRouter from "./adapters/flightHistoryRouter";
import { FlightHistoryRepo } from "./models/flightHistory.repository";
import { FindFlightsHistoryUseCase } from "./use_cases/find";

const flightHistoryRepository: FlightHistoryRepo = new FlightHistoryPgRepo();
const findFlightsHistoryUseCase: FindFlightsHistoryUseCase = new FindFlightsHistoryUseCase(
    flightHistoryRepository,
);
const flightHistoryController: FlightHistoryController = new FlightHistoryController(
    findFlightsHistoryUseCase,
);
const flightHistoryRouter: FlightHistoryRouter = new FlightHistoryRouter(flightHistoryController);

export { flightHistoryRouter };

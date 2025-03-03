import { UpdateFilter } from "typeorm";
import { FlightHistoryPgRepo } from "./adapters/flightHistory.repo";
import { FlightHistoryController } from "./adapters/flightHistoryController";
import FlightHistoryRouter from "./adapters/flightHistoryRouter";
import { FlightHistoryRepo } from "./models/flightHistory.repository";
import { CreateFlightHistoryUseCase } from "./use_cases/create";
import { FindFlightsHistoryUseCase } from "./use_cases/find";
import { FindFlightHistoryByIdUseCase } from "./use_cases/findById";
import { UpdateFlightHistoryUseCase } from "./use_cases/update";
import { DeleteFlightHistoryUseCase } from "./use_cases/delete";

const flightHistoryRepository: FlightHistoryRepo = new FlightHistoryPgRepo();
const findFlightsHistoryUseCase: FindFlightsHistoryUseCase = new FindFlightsHistoryUseCase(
    flightHistoryRepository,
);
const findByIdFlightsHistoryUseCase: FindFlightHistoryByIdUseCase = new FindFlightHistoryByIdUseCase(
    flightHistoryRepository,
);
const createFlightsHistoryUseCase: CreateFlightHistoryUseCase = new CreateFlightHistoryUseCase(
    flightHistoryRepository,
);
const updateFlightsHistoryUseCase: UpdateFlightHistoryUseCase = new UpdateFlightHistoryUseCase(
    flightHistoryRepository,
);
const deleteFlightsHistoryUseCase: DeleteFlightHistoryUseCase = new DeleteFlightHistoryUseCase(
    flightHistoryRepository,
);

const flightHistoryController: FlightHistoryController = new FlightHistoryController(
    findFlightsHistoryUseCase, findByIdFlightsHistoryUseCase, createFlightsHistoryUseCase, updateFlightsHistoryUseCase, deleteFlightsHistoryUseCase
);
const flightHistoryRouter: FlightHistoryRouter = new FlightHistoryRouter(flightHistoryController);

export { flightHistoryRouter };

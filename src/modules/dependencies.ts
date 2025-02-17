import { FlightController } from "./flights/adapters/flightController";
import { FlightPgRepo } from "./flights/adapters/flight.repo";
import { FlightRepo } from "./flights/models/flight.repository";
import { FindFlightsUseCase } from "./flights/use_cases/find";
import { AirplaneRepo } from "./airplanes/models/airplane.repository";
import { AirplanePgRepo } from "./airplanes/adapters/airplane.repo";
import { FindAirplanesUseCase } from "./airplanes/use_cases/find";
import { AirplaneController } from "./airplanes/adapters/airplaneController";
import { PilotRepo } from "./pilots/models/pilot.repository";
import { PilotPgRepo } from "./pilots/adapters/pilot.repo";
import { FindPilotsUseCase } from "./pilots/use_cases/find";
import { PilotController } from "./pilots/adapters/pilotController";
import { TrackRepo } from "./tracks/models/track.repository";
import { TrackPgRepo } from "./tracks/adapters/track.repo";
import { FindTracksUseCase } from "./tracks/use_cases/find";
import { TrackController } from "./tracks/adapters/trackController";
import { UserPgRepo } from "./users/adapters/user.repo";
import { UserRepo } from "./users/models/user.repository";
import { FindUsersUseCase } from "./users/use_cases/find";
import { UserController } from "./users/adapters/userController";
import { MaintenanceRepo } from "./maintenances/models/maintenance.repository";
import { MaintenancePgRepo } from "./maintenances/adapters/maintenance.repo";
import { FindMaintenancesUseCase } from "./maintenances/use_cases/find";
import { MaintenanceController } from "./maintenances/adapters/maintenanceController";
import { FlightHistoryRepo } from "./flightshistory/models/flightHistory.repository";
import { FlightHistoryPgRepo } from "./flightshistory/adapters/flightHistory.repo";
import { FindFlightsHistoryUseCase } from "./flightshistory/use_cases/find";
import { FlightHistoryController } from "./flightshistory/adapters/flightHistoryController";
import { LocatedRepo } from "./located/models/located.repository";
import { LocatedPgRepo } from "./located/adapters/located.repo";
import { FindLocatedUseCase } from "./located/use_cases/find";
import { LocatedController } from "./located/adapters/locatedController";

const flightRepository: FlightRepo = new FlightPgRepo();
const findFlightsUseCase: FindFlightsUseCase = new FindFlightsUseCase(
  flightRepository,
);
const flightController: FlightController = new FlightController(
  findFlightsUseCase,
);

const airplaneRepository: AirplaneRepo = new AirplanePgRepo();
const findAirplanesUseCase: FindAirplanesUseCase = new FindAirplanesUseCase(
  airplaneRepository,
);
const airplaneController: AirplaneController = new AirplaneController(
  findAirplanesUseCase,
);


const pilotRepository: PilotRepo = new PilotPgRepo();
const findPilotsUseCase: FindPilotsUseCase = new FindPilotsUseCase(
  pilotRepository,
);
const pilotController: PilotController = new PilotController(
  findPilotsUseCase,
);



const trackRepository: TrackRepo = new TrackPgRepo();
const findTracksUseCase: FindTracksUseCase = new FindTracksUseCase(
  trackRepository,
);
const trackController: TrackController = new TrackController(
  findTracksUseCase,
);


const userRepository: UserRepo = new UserPgRepo();
const findUsersUseCase: FindUsersUseCase = new FindUsersUseCase(
  userRepository
);
const userController: UserController = new UserController(
  findUsersUseCase,
);


const maintenanceRepository: MaintenanceRepo = new MaintenancePgRepo();
const findMaintenancesUseCase: FindMaintenancesUseCase = new FindMaintenancesUseCase(
  maintenanceRepository
);
const maintenanceController: MaintenanceController = new MaintenanceController(
  findMaintenancesUseCase
);



const flightHistoryRepository: FlightHistoryRepo = new FlightHistoryPgRepo();
const findFlightsHistoryUseCase: FindFlightsHistoryUseCase = new FindFlightsHistoryUseCase(
  flightHistoryRepository
);

const flightHistoryController: FlightHistoryController = new FlightHistoryController(
  findFlightsHistoryUseCase
)



const locatedRepository: LocatedRepo = new LocatedPgRepo();
const findlocatedHistoryUseCase: FindLocatedUseCase = new FindLocatedUseCase(
  locatedRepository
);

const locatedController: LocatedController = new LocatedController(
  findlocatedHistoryUseCase
)

export { flightController };
export { airplaneController };
export { pilotController };
export { trackController };
export { userController };
export { maintenanceController };
export { flightHistoryController};
export {locatedController};

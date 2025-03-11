import JWTProvider from "../auth/adapters/jwtTokenProvider";
import { TokenProvider } from "../auth/models/providers/tokenProvider";
import { FlightPgRepo } from "../flights/adapters/flight.repo";
import { FlightRepo } from "../flights/models/flight.repository";
import { UserPgRepo } from "../users/adapters/user.repo";
import { UserRepo } from "../users/models/user.repository";
import { UserFlightPgRepo } from "./adapters/userFlight.repo";
import { UserFlightController } from "./adapters/userFlightController";
import UserFlightRouter from "./adapters/userFlightRouter";
import { UserFlightRepo } from "./models/userFlight.repository";
import { BookFlightsUseCase } from "./use_cases/bookFlights";
import { CreateUserFlightsUseCase } from "./use_cases/create";
import { DeleteUserFlightsUseCase } from "./use_cases/delete";
import { FindUserFlightsUseCase } from "./use_cases/find";
import { FindUserFlightByIdUseCase } from "./use_cases/findById";
import { UpdateUserFlightUseCase } from "./use_cases/update";


const userFlightRepository: UserFlightRepo = new UserFlightPgRepo();
const userRepository: UserRepo = new UserPgRepo();
const flightRepository: FlightRepo = new FlightPgRepo();
const token: TokenProvider = new JWTProvider();

const findUserFlightUseCase: FindUserFlightsUseCase = new FindUserFlightsUseCase(
    userFlightRepository,
);
const findByIdUserFlightUseCase: FindUserFlightByIdUseCase = new FindUserFlightByIdUseCase(
    userFlightRepository,
);
const createUserFlightUseCase: CreateUserFlightsUseCase = new CreateUserFlightsUseCase(
    userFlightRepository,
);
const updateUserFlightUseCase: UpdateUserFlightUseCase = new UpdateUserFlightUseCase(
    userFlightRepository,
);
const deleteUserFlightUseCase: DeleteUserFlightsUseCase = new DeleteUserFlightsUseCase(
    userFlightRepository,
);
const bookFlightsUseCase: BookFlightsUseCase = new BookFlightsUseCase(
    userFlightRepository, userRepository, flightRepository, token
);

const userFlightController: UserFlightController = new UserFlightController(
    findUserFlightUseCase, findByIdUserFlightUseCase, createUserFlightUseCase, updateUserFlightUseCase, deleteUserFlightUseCase, bookFlightsUseCase
);
const userFlightRouter: UserFlightRouter = new UserFlightRouter(userFlightController);

export { userFlightRouter };

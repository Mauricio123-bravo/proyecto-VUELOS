import { UserFlightPgRepo } from "./adapters/userFlight.repo";
import { UserFlightController } from "./adapters/userFlightController";
import UserFlightRouter from "./adapters/userFlightRouter";
import { UserFlightRepo } from "./models/userFlight.repository";
import { CreateUserFlightsUseCase } from "./use_cases/create";
import { DeleteUserFlightsUseCase } from "./use_cases/delete";
import { FindUserFlightsUseCase } from "./use_cases/find";
import { FindUserFlightByIdUseCase } from "./use_cases/findById";
import { UpdateUserFlightUseCase } from "./use_cases/update";


const userFlightRepository: UserFlightRepo = new UserFlightPgRepo();
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

const userFlightController: UserFlightController = new UserFlightController(
    findUserFlightUseCase,findByIdUserFlightUseCase,createUserFlightUseCase,updateUserFlightUseCase,deleteUserFlightUseCase
);
const userFlightRouter: UserFlightRouter = new UserFlightRouter(userFlightController);

export { userFlightRouter };

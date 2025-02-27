import { TrackPgRepo } from "./adapters/track.repo";
import { TrackController } from "./adapters/trackController";
import TrackRouter from "./adapters/tracksRouter";
import { TrackRepo } from "./models/track.repository";
import { CreateTrackUseCase } from "./use_cases/create";
import { DeleteTrackUseCase } from "./use_cases/delete";
import { FindTrackByIdUseCase } from "./use_cases/finById";
import { FindTracksUseCase } from "./use_cases/find";
import { UpdateTrackUseCase } from "./use_cases/update";

const trackRepository: TrackRepo = new TrackPgRepo();
const findTracksUseCase: FindTracksUseCase = new FindTracksUseCase(
    trackRepository,
);
const findByIdTracksUseCase: FindTrackByIdUseCase = new FindTrackByIdUseCase(
    trackRepository,
);
const createTracksUseCase: CreateTrackUseCase = new CreateTrackUseCase(
    trackRepository,
);
const updateTracksUseCase: UpdateTrackUseCase = new UpdateTrackUseCase(
    trackRepository,
);
const deleteTracksUseCase: DeleteTrackUseCase = new DeleteTrackUseCase(
    trackRepository,
);

const trackController: TrackController = new TrackController(
    findTracksUseCase, findByIdTracksUseCase, createTracksUseCase, updateTracksUseCase, deleteTracksUseCase
);
const trackRouter: TrackRouter = new TrackRouter(trackController);

export { trackRouter };

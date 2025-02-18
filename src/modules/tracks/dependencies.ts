import { TrackPgRepo } from "./adapters/track.repo";
import { TrackController } from "./adapters/trackController";
import TrackRouter from "./adapters/tracksRouter";
import { TrackRepo } from "./models/track.repository";
import { FindTracksUseCase } from "./use_cases/find";

const trackRepository: TrackRepo = new TrackPgRepo();
const findTracksUseCase: FindTracksUseCase = new FindTracksUseCase(
    trackRepository,
);
const trackController: TrackController = new TrackController(
    findTracksUseCase,
);
const trackRouter: TrackRouter= new TrackRouter(trackController);

export { trackRouter };

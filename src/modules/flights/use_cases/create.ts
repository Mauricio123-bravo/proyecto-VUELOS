import { RunwayRepo } from "../../runways/models/runway.repository";
import { DistanceError } from "../models/errors/distance.error";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";
import { calculateDistance } from "../utils/calculateDistance ";

export class CreateFlightUseCase {
    constructor(private readonly repository: FlightRepo,
        private readonly runwayRepository: RunwayRepo

    ) { }

    public async run(flight: Flight): Promise<Flight> {
        const originRunway = await this.runwayRepository.findById(flight.origin.id);


        const destinationRunway = await this.runwayRepository.findById(flight.destination.id);

        if (!originRunway || !destinationRunway) {
            throw new DistanceError();
        }

        if (!originRunway.location || !destinationRunway.location) {
            throw new Error('Location data is missing for one of the runways');
        }

        const distance = calculateDistance(
            originRunway.location,
            destinationRunway.location

        );

        flight.distance = distance;
        return this.repository.create(flight);
    }
}
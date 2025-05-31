import { RunwayRepo } from "../../runways/models/runway.repository";
import { DistanceError } from "../models/errors/distance.error";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";
import { calculateDistance } from "../utils/calculateDistance ";

export class UpdateFlightUseCase {
    constructor(
        private readonly repository: FlightRepo,
        private readonly runwayRepository: RunwayRepo
    ) { }

    public async run(id: number, flightData: Partial<Flight>): Promise<Flight | null> {
        
        const existingFlight = await this.repository.findById(id);
        if (!existingFlight) {
            return null;
        }

        
        const originChanged = flightData.origin?.id !== existingFlight.origin?.id;
        const destinationChanged = flightData.destination?.id !== existingFlight.destination?.id;

        if (originChanged || destinationChanged) {
            
            const originRunway = await this.runwayRepository.findById(flightData.origin?.id || existingFlight.origin.id);
            const destinationRunway = await this.runwayRepository.findById(flightData.destination?.id || existingFlight.destination.id);

            if (!originRunway || !destinationRunway) {
                throw new DistanceError();
            }

            if (!originRunway.location || !destinationRunway.location) {
                throw new Error('Location data is missing for one of the runways');
            }

            
            const newDistance = calculateDistance(originRunway.location, destinationRunway.location);
            flightData.distance = newDistance;
        }

        
        const updatedFlight = { ...existingFlight, ...flightData };
        return this.repository.update(id, updatedFlight);
    }
}

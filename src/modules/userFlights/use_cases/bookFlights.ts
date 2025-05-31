import { UserFlightRepo } from "../models/userFlight.repository";
import { UserRepo } from "../../users/models/user.repository";
import { FlightRepo } from "../../flights/models/flight.repository";
import { TokenProvider } from "../../auth/models/providers/tokenProvider";
import { UserFlightBadRequestError } from "../models/error/userFlightBadRequest.error";

export class BookFlightsUseCase {
    constructor(
        private readonly repository: UserFlightRepo,
        private readonly userRepository: UserRepo,
        private readonly flightRepository: FlightRepo,
        private readonly tokenAdapter: TokenProvider
    ) { }

    async reserve(token: string, flightId: number, seatNumber: number) {

        const { userId } = this.tokenAdapter.getPayload(token)

        const available = await this.repository.isSeatAvailable(flightId, seatNumber);
        if (!available) throw new UserFlightBadRequestError();


        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error("User not found");


        const flight = await this.flightRepository.findById(flightId);
        if (!flight) throw new Error("Flight not found");


        const booking = await this.repository.bookFlight(user, flight, seatNumber);
        return {
            message: "Flight booked successfully",
            booking: {
                userId: booking.user.id,
                flightId: booking.flight.id,
                seatNumber: booking.numberOfSeats,
            },
        };
    }
}


export class FlightNotFoundError extends Error {
    constructor() {
      super("Flight not found");
      this.name = "Flight not found";
    }
  }
  
  
export class UserFlightBadRequestError extends Error {
    constructor() {
      super("Bad Request");
      this.name = "Bad Request";
    }
  }
  
  
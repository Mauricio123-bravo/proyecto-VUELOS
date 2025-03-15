export class DistanceError extends Error {
    constructor() {
      super("Origin and destination not found");
      this.name = "Origin and destination not found";
    }
  }
  
  
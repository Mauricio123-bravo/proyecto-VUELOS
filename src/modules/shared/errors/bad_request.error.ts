export class BadRequest extends Error {
  constructor() {
    super("Bad Request: Invalid data provided. Please verify your input and try again");
    this.name = "BadRequest Error";
  }
}

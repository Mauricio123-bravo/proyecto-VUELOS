export class InvalidCredentials extends Error {
  constructor() {
    super("Provided credentials are invalid");
    this.name = "Invalid Credentials";
  }
}


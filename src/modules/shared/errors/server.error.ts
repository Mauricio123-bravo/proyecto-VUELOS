export class ServerError extends Error {
  constructor() {
    super("Something goes wrong try again later");
    this.name = "Server Error";
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super("You cannot access to this resource");
    this.name = "Forbidden Error";
  }
}

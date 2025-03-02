export class ExpiredToken extends Error {
  constructor() {
    super("Life time of the token has expired");
    this.name = "Expired Token";
  }
}

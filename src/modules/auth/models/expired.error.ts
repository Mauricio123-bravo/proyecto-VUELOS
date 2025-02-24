export class ExpiredToken implements Error {
  name: string = "Expired Token";
  message: string = "Life time of the token has expired";
  stack?: string | undefined;
}

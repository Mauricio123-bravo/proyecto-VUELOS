import { AppDataSource } from "../data/mariadb";

export class App {
  public static init() {
    AppDataSource.initialize()
      .then(() => {
        console.log("MariaDB driver was successfully connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


import express, { Application } from "express";
import { AppDataSource } from "../data/pg";
import { PORT } from "./vars";

export class App {
  public static init() {
    AppDataSource.initialize()
      .then(() => {
        console.log("PgAdmin driver was successfully connected");
      })
      .catch((err) => {
        
        console.error("Error conecting to data base:", err);
      });

    const app : Application = express();
    app.listen( PORT, ( ) => {
       console.log("Server Started")
    })

    
  }
}

import { Request, Response } from "express";
import { FindAirplanesUseCase } from "../use_cases/find";

export class AirplaneController {
  constructor(private readonly findAllUseCase: FindAirplanesUseCase) {}

  findAll = (req: Request, res: Response) => {
    this.findAllUseCase
      .run()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({
          message: "Something went wrong while getting data, try latter.",
        });
      });
  };
}

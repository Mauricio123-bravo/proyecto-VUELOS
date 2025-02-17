import { FindLocatedUseCase } from "../use_cases/find";
import { Request, Response } from "express";

export class LocatedController {
    constructor(private readonly findAllUseCase: FindLocatedUseCase) { }

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
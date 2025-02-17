import { Request, Response } from "express";
import { FindPilotsUseCase } from "../../pilots/use_cases/find";

export class PilotController {
    constructor(private readonly findAllUseCase: FindPilotsUseCase) { }

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
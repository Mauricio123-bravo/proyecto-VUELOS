import { FindMaintenancesUseCase } from "../use_cases/find";
import { Response, Request } from "express";

export class MaintenanceController {
    constructor(private readonly findAllUseCase: FindMaintenancesUseCase) { }

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
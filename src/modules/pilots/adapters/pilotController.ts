import { Request, Response } from "express";
import { FindPilotsUseCase } from "../../pilots/use_cases/find";

export class PilotController {
  constructor(private readonly findAllUseCase: FindPilotsUseCase) { }

  findAll = async (req: Request, res: Response) => {

    try{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const {pilots,total}= await this.findAllUseCase
      .run(page, limit);
      res.status(200).json({
        data: pilots,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }
    )}
      catch(err) {
        console.log(err);

        res.status(500).json({
          message: "Something went wrong while getting data, try latter.",
        });
      }
  };

}
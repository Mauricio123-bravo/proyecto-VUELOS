import { FindLocatedUseCase } from "../use_cases/find";
import { Request, Response } from "express";

export class LocatedController {
  constructor(private readonly findAllUseCase: FindLocatedUseCase) { }

  findAll = async (req: Request, res: Response) => {

    try {
      const page = parseInt(req.query.page as string) || 1; // Página actual (por defecto 1)
      const limit = parseInt(req.query.limit as string) || 10; // Cantidad de registros por página (por defecto 10)

      const { data, total, totalPages } = await this.findAllUseCase
        .run(page, limit);
      res.status(200).json({
        data,
        total,
        page,
        totalPages
      }
      )
    }
    catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Something went wrong while getting data, try latter.",
      });
    }
  };

}
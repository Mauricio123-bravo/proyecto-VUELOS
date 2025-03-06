import { FindUsersUseCase } from "../use_cases/find";
import { Request, Response } from "express";
import { FindUserByIdUseCase } from "../use_cases/findById";

export class UserController {
  constructor(private readonly findAllUseCase: FindUsersUseCase,
    private readonly findByIdUseCase : FindUserByIdUseCase
  ) { }

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

  findById = async (req: Request, res: Response) => {

    try {
      const id = parseInt(req.params.id);
      const user = await this.findByIdUseCase.run(id);
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the User.",
      });
    }
  };
}


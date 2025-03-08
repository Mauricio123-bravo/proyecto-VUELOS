import { Request, Response } from "express";
import { FindUserFlightsUseCase } from "../use_cases/find";
import { FindUserFlightByIdUseCase } from "../use_cases/findById";
import { CreateUserFlightsUseCase } from "../use_cases/create";
import { UpdateUserFlightUseCase } from "../use_cases/update";
import { DeleteUserFlightsUseCase } from "../use_cases/delete";


export class UserFlightController {
  constructor(private readonly findAllUseCase: FindUserFlightsUseCase,
    private readonly findByIdUseCase: FindUserFlightByIdUseCase,
    private readonly createUseCase: CreateUserFlightsUseCase,
    private readonly updateUseCase: UpdateUserFlightUseCase,
    private readonly deleteUseCase: DeleteUserFlightsUseCase,


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
      const id = req.params.id;
      const userFlight = await this.findByIdUseCase.run(id);
      if (!userFlight) {
        res.status(404).json({ message: "userFlight not found." });
        return;
      }
      res.status(200).json(userFlight);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the userFlight.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const userFlight = await this.createUseCase.run(req.body);
      res.status(201).json(userFlight);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating userFlight." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updateduserFlight = await this.updateUseCase.run(id, req.body);
      if (!updateduserFlight) {
        res.status(404).json({ message: "userFlight not found" });
        return;
      }
      res.status(200).json(updateduserFlight);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating userFlight." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "userFlight not found" });
        return;
      }
      res.status(200).send({ message: "userFlight deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting userFlight." });

    }
  };

}
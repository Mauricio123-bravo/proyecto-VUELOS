import { Request, Response } from "express";
import { FindRunwaysUseCase } from "../use_cases/find";
import { FindRunwayByIdUseCase } from "../use_cases/finById";
import { CreateRunwayUseCase } from "../use_cases/create";
import { UpdateRunwayUseCase } from "../use_cases/update";
import { DeleteRunwayUseCase } from "../use_cases/delete";

export class RunwayController {
  constructor(private readonly findAllUseCase: FindRunwaysUseCase,
    private readonly findByIdUseCase: FindRunwayByIdUseCase,
    private readonly createUseCase: CreateRunwayUseCase,
    private readonly updateUseCase: UpdateRunwayUseCase,
    private readonly deleteUseCase: DeleteRunwayUseCase,

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
      const runway = await this.findByIdUseCase.run(id);
      if (!runway) {
        res.status(404).json({ message: "runway not found." });
        return;
      }
      res.status(200).json(runway);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the runway.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const runway = await this.createUseCase.run(req.body);
      res.status(201).json(runway);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating runway." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedrunway = await this.updateUseCase.run(id, req.body);
      if (!updatedrunway) {
        res.status(404).json({ message: "runway not found" });
        return;
      }
      res.status(200).json(updatedrunway);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating runway." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "runway not found" });
        return;
      }
      res.status(200).send({ message: "runway deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting runway." });

    }
  };

}
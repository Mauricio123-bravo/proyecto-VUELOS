import { FindLocatedUseCase } from "../use_cases/find";
import { Request, Response } from "express";
import { FindLocatedByIdUseCase } from "../use_cases/findById";
import { CreateLocatedUseCase } from "../use_cases/create";
import { UpdateLocatedUseCase } from "../use_cases/update";
import { DeleteLocatedUseCase } from "../use_cases/delete";
import { FindAllLocatedUseCase } from "../use_cases/findAll";

export class LocatedController {
  constructor(private readonly findAllUseCase: FindAllLocatedUseCase,
    private readonly findPaginatedUseCase: FindLocatedUseCase,
    private readonly findByIdUseCase: FindLocatedByIdUseCase,
    private readonly createUseCase: CreateLocatedUseCase,
    private readonly updateUseCase: UpdateLocatedUseCase,
    private readonly deleteUseCase: DeleteLocatedUseCase

  ) { }

  findAll = async (req:Request, res: Response)=>{
    try{
      const located= await this.findAllUseCase.run()
      res.json(located);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error finding located." });
    }
  }

  findAllPaginated = async (req: Request, res: Response) => {

    try {
      const page = parseInt(req.query.page as string) || 1; // Página actual (por defecto 1)
      const limit = parseInt(req.query.limit as string) || 10; // Cantidad de registros por página (por defecto 10)

      const { data, total, totalPages } = await this.findPaginatedUseCase
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
      const located = await this.findByIdUseCase.run(id);
      if (!located) {
        res.status(404).json({ message: "located not found." });
        return;
      }
      res.status(200).json(located);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the located.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const located = await this.createUseCase.run(req.body);
      res.status(201).json(located);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating located." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedlocated = await this.updateUseCase.run(id, req.body);
      if (!updatedlocated) {
        res.status(404).json({ message: "located not found" });
        return;
      }
      res.status(200).json(updatedlocated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating located." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "located not found" });
        return;
      }
      res.status(200).send({ message: "located deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting located." });
    }
  };


}
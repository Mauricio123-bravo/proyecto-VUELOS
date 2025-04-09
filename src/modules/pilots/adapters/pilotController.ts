import { Request, Response } from "express";
import { FindPaginatedPilotsUseCase } from "../../pilots/use_cases/find";
import { FindPilotByIdUseCase } from "../use_cases/findById";
import { CreatePilotUseCase } from "../use_cases/create";
import { UpdatePilotUseCase } from "../use_cases/update";
import { DeletePilotUseCase } from "../use_cases/delete";
import { FindAllPilotUseCase } from "../use_cases/findAll";

export class PilotController {
  constructor(private readonly findAllPaginatedUseCase: FindPaginatedPilotsUseCase,
    private readonly findAllUseCase: FindAllPilotUseCase,
    private readonly findByIdUseCase: FindPilotByIdUseCase,
    private readonly createUseCase: CreatePilotUseCase,
    private readonly updateUseCase: UpdatePilotUseCase,
    private readonly deleteUseCase: DeletePilotUseCase,


  ) { }

  findAll = async (req:Request, res: Response)=>{
    try{
      const pilots= await this.findAllUseCase.run()
      res.json(pilots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error finding pilots." });
    }
  }

  findAllPaginated = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Página actual (por defecto 1)
      const limit = parseInt(req.query.limit as string) || 10; // Cantidad de registros por página (por defecto 10)

      const { data, total, totalPages } = await this.findAllPaginatedUseCase
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
      const pilot = await this.findByIdUseCase.run(id);
      if (!pilot) {
        res.status(404).json({ message: "Pilot not found." });
        return;
      }
      res.status(200).json(pilot);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the pilot.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const pilot = await this.createUseCase.run(req.body);
      res.status(201).json(pilot);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating pilot." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedPilot = await this.updateUseCase.run(id, req.body);
      if (!updatedPilot) {
        res.status(404).json({ message: "Pilot not found" });
        return;
      }
      res.status(200).json(updatedPilot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating pilot." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "Pilot not found" });
        return;
      }
      res.status(200).send({ message: "Pilot deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting pilot." });

    }
  };

}
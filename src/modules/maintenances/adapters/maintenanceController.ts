import { FindMaintenancesUseCase } from "../use_cases/find";
import { Response, Request } from "express";
import { FindMaintenanceByIdUseCase } from "../use_cases/findById";
import { CreateMaintenanceUseCase } from "../use_cases/create";
import { UpdateMaintenanceUseCase } from "../use_cases/update";
import { DeleteMaintenanceUseCase } from "../use_cases/delete";
import { FindAllMaintenanceUseCase } from "../use_cases/findAll";

export class MaintenanceController {
  constructor(private readonly findAllUseCase: FindAllMaintenanceUseCase,
    private readonly findPaginatedUseCase: FindMaintenancesUseCase,
    private readonly findByIdUseCase: FindMaintenanceByIdUseCase,
    private readonly createUseCase: CreateMaintenanceUseCase,
    private readonly updateUseCase: UpdateMaintenanceUseCase,
    private readonly deleteUseCase: DeleteMaintenanceUseCase
  ) { }

  findAll = async (req:Request, res: Response)=>{
    try{
      const pilots= await this.findAllUseCase.run()
      res.json(pilots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error finding maintenances." });
    }
  }

  findPaginated = async (req: Request, res: Response) => {

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
      const maintenance = await this.findByIdUseCase.run(id);
      if (!maintenance) {
        res.status(404).json({ message: "Maintenance not found." });
        return;
      }
      res.status(200).json(maintenance);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the maintenance.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const maintenance = await this.createUseCase.run(req.body);
      res.status(201).json(maintenance);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating maintenance." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedmaintenance = await this.updateUseCase.run(id, req.body);
      if (!updatedmaintenance) {
        res.status(404).json({ message: "maintenance not found" });
        return;
      }
      res.status(200).json(updatedmaintenance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating maintenance." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "maintenance not found" });
        return;
      }
      res.status(200).send({ message: "maintenance deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting maintenance." });
    }
  };


}
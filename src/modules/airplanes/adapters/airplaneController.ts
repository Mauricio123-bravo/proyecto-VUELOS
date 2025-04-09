import { Request, Response } from "express";
import { FindPaginatedAirplanesUseCase } from "../use_cases/find";
import { FindAirplaneByIdUseCase } from "../use_cases/findById";
import { CreateAirplaneUseCase } from "../use_cases/create";
import { UpdateAirplaneUseCase } from "../use_cases/update";
import { DeleteAirplaneUseCase } from "../use_cases/delete";
import { FindAllAirplaneUseCase } from "../use_cases/findAll";

export class AirplaneController {
  constructor(private readonly findAllPaginatedUseCase: FindPaginatedAirplanesUseCase,
    private readonly findAllUseCase: FindAllAirplaneUseCase,
    private readonly findByIdUseCase: FindAirplaneByIdUseCase,
    private readonly createUseCase: CreateAirplaneUseCase,
    private readonly updateUseCase: UpdateAirplaneUseCase,
    private readonly deleteUseCase: DeleteAirplaneUseCase
  ) { }

  findAll = async (req: Request, res: Response) => {

    try {
      const airplanes = await this.findAllUseCase.run()
      res.json(airplanes)
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error finding airplanes" })

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
      const airplane = await this.findByIdUseCase.run(id);
      if (!airplane) {
        res.status(404).json({ message: "airplane not found." });
        return;
      }
      res.status(200).json(airplane);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the airplane.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const airplane = await this.createUseCase.run(req.body);
      res.status(201).json(airplane);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating airplane." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedairplane = await this.updateUseCase.run(id, req.body);
      if (!updatedairplane) {
        res.status(404).json({ message: "airplane not found" });
        return;
      }
      res.status(200).json(updatedairplane);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating airplane." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "airplane not found" });
        return;
      }
      res.status(200).send({ message: "airplane deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting airplane." });
    }
  };
}

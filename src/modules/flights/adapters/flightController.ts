import { Request, Response } from "express";
import { FindPaginatedFlightsUseCase } from "../use_cases/find";
import { FindFlightByIdUseCase } from "../use_cases/findById";
import { CreateFlightUseCase } from "../use_cases/create";
import { UpdateFlightUseCase } from "../use_cases/update";
import { DeleteFlightUseCase } from "../use_cases/delete";
import { FindAllFlightUseCase } from "../use_cases/findAll";

export class FlightController {
  constructor(
    private readonly findAllUseCase: FindAllFlightUseCase,
    private readonly findAPaginatedUseCase: FindPaginatedFlightsUseCase,
    private readonly findByIdUseCase: FindFlightByIdUseCase,
    private readonly createUseCase: CreateFlightUseCase,
    private readonly updateUseCase: UpdateFlightUseCase,
    private readonly deleteUseCase: DeleteFlightUseCase,
  ) {}

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
      const limit = parseInt(req.query.limit as string) || 9; // Cantidad de registros por página (por defecto 10)
      const origin = req.query.origin
        ? parseInt(req.query.origin as string)
        : undefined;
      const destination = req.query.destination
        ? parseInt(req.query.destination as string)
        : undefined;

      const { data, total, totalPages } = await this.findAPaginatedUseCase.run(
        page,
        limit,
        origin,
        destination,
      );
      res.status(200).json({
        data,
        total,
        page,
        totalPages,
        filters: { origin, destination },
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Something went wrong while getting data, try latter.",
      });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const flight = await this.findByIdUseCase.run(id);
      if (!flight) {
        res.status(404).json({ message: "flight not found." });
        return;
      }
      res.status(200).json(flight);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the flight.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const flight = await this.createUseCase.run(req.body);
      res.status(201).json(flight);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating flight." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedflight = await this.updateUseCase.run(id, req.body);
      if (!updatedflight) {
        res.status(404).json({ message: "flight not found" });
        return;
      }
      res.status(200).json(updatedflight);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating flight." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "flight not found" });
        return;
      }
      res.status(200).send({ message: "flight deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting flight." });
    }
  };
}

import { FindFlightsHistoryUseCase } from "../use_cases/find";
import { Request, Response } from "express";
import { FindFlightHistoryByIdUseCase } from "../use_cases/findById";
import { CreateFlightHistoryUseCase } from "../use_cases/create";
import { UpdateFlightHistoryUseCase } from "../use_cases/update";
import { DeleteFlightHistoryUseCase } from "../use_cases/delete";

export class FlightHistoryController {
  constructor(private readonly findAllUseCase: FindFlightsHistoryUseCase,
    private readonly findByIdUseCase: FindFlightHistoryByIdUseCase,
    private readonly createUseCase: CreateFlightHistoryUseCase,
    private readonly updateUseCase: UpdateFlightHistoryUseCase,
    private readonly deleteUseCase: DeleteFlightHistoryUseCase
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
      const flightHistory = await this.findByIdUseCase.run(id);
      if (!flightHistory) {
        res.status(404).json({ message: "flightHistory not found." });
        return;
      }
      res.status(200).json(flightHistory);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the flightHistory.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const flightHistory = await this.createUseCase.run(req.body);
      res.status(201).json(flightHistory);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating flightHistory." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedflightHistory = await this.updateUseCase.run(id, req.body);
      if (!updatedflightHistory) {
        res.status(404).json({ message: "flightHistory not found" });
        return;
      }
      res.status(200).json(updatedflightHistory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating flightHistory." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted) {
        res.status(404).json({ message: "flightHistory not found" });
        return;
      }
      res.status(200).send({ message: "flightHistory deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting flightHistory." });
    }
  };




}
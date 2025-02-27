import { CreateTrackUseCase } from "../use_cases/create";
import { FindTrackByIdUseCase } from "../use_cases/finById";
import { FindTracksUseCase } from "../use_cases/find";
import { Request, Response } from "express";
import { UpdateTrackUseCase } from "../use_cases/update";
import { DeleteTrackUseCase } from "../use_cases/delete";

export class TrackController {
  constructor(private readonly findAllUseCase: FindTracksUseCase,
    private readonly findByIdUseCase: FindTrackByIdUseCase,
    private readonly createUseCase: CreateTrackUseCase,
    private readonly updateUseCase: UpdateTrackUseCase,
    private readonly deleteUseCase: DeleteTrackUseCase,

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
      const track = await this.findByIdUseCase.run(id);
      if (!track) {
        res.status(404).json({ message: "track not found." });
        return;
      }
      res.status(200).json(track);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong while fetching the track.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const track = await this.createUseCase.run(req.body);
      res.status(201).json(track);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating track." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedtrack = await this.updateUseCase.run(id, req.body);
      if (!updatedtrack) {
        res.status(404).json({ message: "track not found" });
        return;
      }
      res.status(200).json(updatedtrack);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating track." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.deleteUseCase.run(id);
      if (!deleted)
        res.status(404).json({ message: "track not found" });
      res.status(200).send({ message: "track deleted" });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting track." });
    }
  };

}
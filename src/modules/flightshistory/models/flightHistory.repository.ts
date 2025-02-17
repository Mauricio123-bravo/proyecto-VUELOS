import { FlightHistory } from "../models/flightHistory.model";

export interface FlightHistoryRepo{
    findAll(): Promise<FlightHistory[]>
}
import { Located } from "../../located/models/located.model";

export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const calculateDistance = (location1: Located, location2: Located): number => {
  const R = 6371.009;
  const dLat = toRadians(location2.latitude - location1.latitude);
  const dLon = toRadians(location2.longitude - location1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(location1.latitude)) * Math.cos(toRadians(location2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

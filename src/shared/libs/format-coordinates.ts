import { Coordinates } from '../types/index.js';

export function formatCoordinates(coordinatesData: string): Coordinates {
  const coords = coordinatesData.split(';');
  return {
    lat: Number.parseFloat(coords[0]),
    long: Number.parseFloat(coords[1])
  };
}

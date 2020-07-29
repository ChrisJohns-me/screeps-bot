import { Coordinates } from "./coordinates";

export interface StrategicLandscape {
  constructedWallLocations: Coordinates[];
  extensionLocations: Coordinates[];
  linkLocations: Coordinates[];
  towerLocations: Coordinates[];
  exitPoints: Coordinates[];
}

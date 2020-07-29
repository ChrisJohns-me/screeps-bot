import { CreepRole } from "enums/creepRole.enum";

export interface TerrainEnergySourcesMemory {
  x: number;
  y: number;
  creepsAssigned: {
    [role in CreepRole]: number;
  };
}

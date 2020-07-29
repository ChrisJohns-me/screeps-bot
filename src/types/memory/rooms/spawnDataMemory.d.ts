import { CreepRole } from "enums/creepRole.enum";

export interface SpawnDataMemory {
  lastSpawnGameTime: {
    creepRole: CreepRole;
    gameTime: number;
  }[];
}

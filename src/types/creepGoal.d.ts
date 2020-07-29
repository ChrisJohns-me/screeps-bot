import { CreepRole } from "enums/creepRole.enum";

export interface CreepGoal {
  type: CreepRole;
  min: number;
  priority: number;
  timeLastSpawned?: number;
}

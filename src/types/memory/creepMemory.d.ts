import { CreepActions } from "enums/creepActions.enum";
import { CreepRole } from "enums/creepRole.enum";
import { CreepEnergySourceMemory } from "./creeps/creepEnergySourceMemory";
import { CreepPathMemory } from "./creeps/creepPathMemory";

// Allows to merge with global types
declare global {
  interface CreepMemory {
    action?: CreepActions;
    energySource?: CreepEnergySourceMemory;
    paths?: Record<string, CreepPathMemory>;
    role: CreepRole;
    roleTargetId?: string;
    room: string;
  }
}

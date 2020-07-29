import { CreepRole } from "enums/creepRole.enum";
import { CreepController } from "../../controllers/creeps/creepController";

export class CreepExtractorController extends CreepController {
  public creepType = CreepRole.CREEP_EXTRACTOR;

  public constructor(creep: Creep) {
    super(creep);
    this.assignEnergySource();
    this.doActions(creep);
  }

  private doActions(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      this.harvestEnergy(creep);
    } else {
      this.distributeEnergy(creep);
    }
  }

  private harvestEnergy(creep: Creep): void {
    if (!creep.memory?.energySource) {
      return;
    }
    const source = Game.getObjectById<Source>(creep.memory.energySource.objectId);

    if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }

  private distributeEnergy(creep: Creep): void {
    // Find close by structures that this creep can drop off energy to
    const myStructures = creep.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
    }) as (StructureContainer | StructureStorage)[];

    // Do the transfer
    for (const target of myStructures) {
      creep.transfer(target, RESOURCE_ENERGY);
    }

    // If there aren't any immediately nearby, just drop the energy.
    // Allows other creeps to pick up the resource.
    if (myStructures.length <= 0) {
      this.creep.say("Energy dump");
      creep.drop(RESOURCE_ENERGY);
    }
  }
}

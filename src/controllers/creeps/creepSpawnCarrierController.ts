import { CreepActions } from "enums/creepActions.enum";
import { CreepRole } from "enums/creepRole.enum";
import { CreepController } from "../../controllers/creeps/creepController";

export class CreepSpawnCarrierController extends CreepController {
  public creepType = CreepRole.CREEP_SPAWN_CARRIER;

  public constructor(creep: Creep) {
    super(creep);
    this.assignEnergySource();
    this.doActions();
  }

  private doActions(): void {
    const newAction = this.determineAction();
    if (newAction) {
      this.creep.memory.action = newAction;
    }

    // Perform the creep's action
    if (this.creep.memory.action === CreepActions.DELIVER) {
      this.deliverEnergy();
    } else if (this.creep.memory.action === CreepActions.FETCH) {
      super.goFetchEnergy();
    }
  }

  /**
   * @returns {CreepActions | undefined} undefined if no new action
   */
  private determineAction(): Optional<CreepActions> {
    if (!this.creep.memory.action) {
      // Set action to fetch by default
      return CreepActions.FETCH;
    }

    // Change creep's action, only under certain circumstances
    if (this.creep.memory.action === CreepActions.FETCH) {
      if (this.creep.store.getFreeCapacity() <= 0) {
        // Carrying capacity is met.
        return CreepActions.DELIVER;
      }
    } else {
      // Not fetching energy (possibly delivering)
      if (this.creep.store.getUsedCapacity() <= 0) {
        // and not carrying anything.
        return CreepActions.FETCH;
      }
    }

    return undefined;
  }

  // TODO: Abstract this into CreepController.
  private deliverEnergy(): void {
    const memSpawn = Memory.rooms[this.creep.room.name].structures?.spawns?.[0];
    const spawn = Game.getObjectById<StructureSpawn>(memSpawn?.id ?? "");
    if (!spawn) {
      console.log(`${this.creep.name} (${this.creepType}) can't deliver; No Spawn in memory`);
      this.creep.say(`Hmmm...`);
      return;
    }

    const creepTransfer = spawn ? this.creep.transfer(spawn, RESOURCE_ENERGY) : ERR_NOT_FOUND;
    let creepMove;

    if (creepTransfer === ERR_NOT_IN_RANGE) {
      creepMove = this.creep.moveTo(spawn);

      if (creepMove !== OK) {
        console.log(`${this.creep.name} could not move, err #${creepMove}`);
      }
    } else if (creepTransfer === ERR_FULL) {
      // TODO: Might be more logic to do here.
      console.log(`${this.creep.name} (${this.creepType}) can't deliver; Structure full`);
    }
  }
}

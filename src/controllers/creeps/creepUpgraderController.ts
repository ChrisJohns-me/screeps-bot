import { CreepController } from "../../controllers/creeps/creepController";

export class CreepUpgraderController extends CreepController {
  public creepType = CreepRole.CREEP_UPGRADER;

  public constructor(creep: Creep) {
    super(creep);
    this.assignEnergySource();
    this.doActions();
  }

  private doActions(): void {
    const newAction = this.determineAction();
    if (newAction) {
      if (newAction === CreepActions.FETCH) {
        this.creep.say("Fetching");
      } else if (newAction === CreepActions.DELIVER) {
        this.creep.say("Delivering");
      }
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
    // Change creep's action, only under certain circumstances
    if (this.creep.memory.action === CreepActions.FETCH) {
      if (this.creep.store.getFreeCapacity() <= 0) {
        // Carrying capacity is met.
        return CreepActions.DELIVER;
      }
    } else {
      // Not fetching energy
      if (this.creep.store.getUsedCapacity() <= 0) {
        // and not carrying anything.
        return CreepActions.FETCH;
      }
    }

    return undefined;
  }

  private deliverEnergy(): void {
    const controllerTarget = Game.getObjectById<StructureController>(
      Memory.rooms[this.creep.room.name]?.structures?.controller?.id ?? ""
    );

    if (controllerTarget && this.creep.upgradeController(controllerTarget) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(controllerTarget);
    }
  }
}

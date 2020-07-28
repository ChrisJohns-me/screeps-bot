import { CreepController } from "../../controllers/creeps/creepController";

export class CreepBuilderController extends CreepController {
  public creepType = CreepRole.CREEP_BUILDER;

  public constructor(creep: Creep) {
    super(creep);
    this.assignEnergySource();
    this.doActions();
  }

  private doActions(): void {
    const newAction = this.determineAction();
    if (newAction) {
      if (newAction === CreepActions.BUILD) {
        this.creep.say("Building");
      } else if (newAction === CreepActions.REPAIR) {
        this.creep.say("Repairing");
      }
      this.creep.memory.action = newAction;
    }

    // Perform the creep's action
    if (this.creep.memory.action === CreepActions.FETCH) {
      super.goFetchEnergy();
    } else if (this.creep.memory.action === CreepActions.BUILD) {
      this.goBuild();
    } else if (this.creep.memory.action === CreepActions.REPAIR) {
      this.goRepair();
    }
  }

  /**
   * @returns {CreepActions | undefined} undefined if no new action
   */
  private determineAction(): Optional<CreepActions> {
    const foundConstructionSite = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

    // Change creep's action, only under certain circumstances
    if (this.creep.memory.action === CreepActions.FETCH) {
      if (this.creep.store.getFreeCapacity() <= 0) {
        // Carrying capacity is met.
        return foundConstructionSite ? CreepActions.BUILD : CreepActions.REPAIR;
      }
    } else {
      // Not fetching energy (possibly building, or repairing)
      if (this.creep.store.getUsedCapacity() <= 0) {
        // and not carrying anything.
        return CreepActions.FETCH;
      }
    }

    return undefined;
  }

  private goBuild(): void {
    // Try to get build target from memory
    let buildTarget = Game.getObjectById<ConstructionSite>(this.creep.memory.roleTargetId ?? "");

    if (!buildTarget) {
      // Can't use/find build target from memory; find a nearby construction site
      buildTarget = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      this.creep.memory.roleTargetId = buildTarget?.id;
    }

    if (buildTarget && this.creep.build(buildTarget) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(buildTarget);
    }
  }

  private goRepair(): void {
    // Try to get repair target from memory
    let repairTarget = Game.getObjectById<Structure>(this.creep.memory.roleTargetId ?? "");

    if (!repairTarget || repairTarget.hits >= repairTarget.hitsMax) {
      // Can't use/find repair target from memory, or no repairs needed on the target; find another repair target
      const repairTargets: Structure[] = this.creep.room.find(FIND_STRUCTURES, {
        filter: (struct: Structure) => struct.hits < struct.hitsMax
      });

      // Get the closest structure in need of repair
      repairTargets.sort((a: Structure, b: Structure) => a.hits - b.hits);
      repairTarget = repairTargets[0];

      this.creep.memory.roleTargetId = repairTarget.id;
    }

    if (this.creep.repair(repairTarget) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(repairTarget);
    }
  }
}

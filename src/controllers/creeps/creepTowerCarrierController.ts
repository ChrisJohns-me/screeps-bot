import { CreepController } from "./creepController";

export class CreepTowerCarrierController extends CreepController {
  public creepType = CreepRole.CREEP_TOWER_CARRIER;

  public constructor(creep: Creep) {
    super(creep);
  }
}

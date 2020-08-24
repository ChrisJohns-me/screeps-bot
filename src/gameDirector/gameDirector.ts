import { EstateAgent } from "interfaces/estateAgent";
import { Mind } from "interfaces/mind";
import { TaskMaster } from "interfaces/taskMaster";
import { UnitOperator } from "interfaces/unitOperator";

export class GameDirector {
  public mind!: Mind;
  public estateAgent!: EstateAgent;
  public unitOperator!: UnitOperator;
  public taskMaster!: TaskMaster;

  public get ownedRooms(): Room[] {
    return this.estateAgent.ownedRooms;
  }

  public get ownedCreeps(): Creep[] {
    return this.unitOperator.ownedCreeps;
  }

  public get ownedPowerCreeps(): PowerCreep[] {
    return this.unitOperator.ownedPowerCreeps;
  }

  public constructor(private game: Game) {}
}

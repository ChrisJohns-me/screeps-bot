import { EstateAgent } from "interfaces/estateAgent";
import { Mind } from "interfaces/mind";
import { UnitOperator } from "interfaces/unitOperator";

interface SetupOptions {
  mind: Mind;
  estateAgent: EstateAgent;
  unitOperator: UnitOperator;
}

export class GameDirector {
  public mind: Mind;
  public estateAgent: EstateAgent;
  public unitOperator: UnitOperator;

  public get ownedRooms(): Room[] {
    return this.estateAgent.ownedRooms;
  }

  public constructor(private game: Game, setupOpts: SetupOptions) {
    this.mind = setupOpts.mind;
    this.estateAgent = setupOpts.estateAgent;
    this.unitOperator = setupOpts.unitOperator;
  }
}

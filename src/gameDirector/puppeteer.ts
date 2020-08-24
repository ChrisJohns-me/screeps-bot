import { Task } from "interfaces/task";
import { UnitOperator } from "interfaces/unitOperator";
import { GameDirector } from "./gameDirector";

export class Puppeteer implements UnitOperator {
  public ownedCreeps: Creep[];
  public ownedPowerCreeps: PowerCreep[];

  public constructor(private gameDirector: GameDirector, creep: Game["creeps"], powerCreeps: Game["powerCreeps"]) {
    this.ownedCreeps = Object.values(creep);
    this.ownedPowerCreeps = Object.values(powerCreeps);
  }

  public assignTasks(tasks: Task[]): void {
    throw new Error("Method not implemented.");
  }

  public assignEnergySources(energySources: Source[]): void {
    throw new Error("Method not implemented.");
  }

  public controlCreep(creep: Creep): void {
    throw new Error("Method not implemented.");
  }
}

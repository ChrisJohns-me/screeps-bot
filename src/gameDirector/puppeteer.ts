import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
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

  @Priority("HIGH")
  @Frequency("CONSTANTLY")
  public assignTasks(tasks: Task[]): void {}

  @Priority("LOW")
  @Frequency("FREQUENTLY")
  public assignEnergySources(energySources: Source[]): void {}

  @Priority("HIGH")
  @Frequency("CONSTANTLY")
  public controlCreep(creep: Creep): void {}
}

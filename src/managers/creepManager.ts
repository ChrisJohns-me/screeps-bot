import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { GameDirector } from "gameDirector";
import { Task } from "tasks/task";

interface CreepManagerDependencies {
  creeps: Game["creeps"];
  powerCreeps: Game["powerCreeps"];
}

export class CreepManager {
  public ownedCreeps: Creep[];
  public ownedPowerCreeps: PowerCreep[];

  public constructor(private gameDirector: GameDirector, dependencies: CreepManagerDependencies) {
    this.ownedCreeps = Object.values(dependencies.creeps);
    this.ownedPowerCreeps = Object.values(dependencies.powerCreeps);
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

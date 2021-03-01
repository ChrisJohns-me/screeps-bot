import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { GameDirector } from "gameDirector";
import { Task } from "tasks/task";

interface CreepManagerDependencies {
  creeps: Game["creeps"];
  powerCreeps: Game["powerCreeps"];
}

export class CreepManager {
  /** Owned creeps, accessible via `ownedCreep[name]` or `ownedCreep.name` */
  public ownedCreep: Game["creeps"];
  /** List of owned creeps in array form */
  public ownedCreeps: Creep[];
  /** Owned power creeps, accessible via `ownedPowerCreep[name]` or `ownedPowerCreep.name` */
  public ownedPowerCreep: Game["powerCreeps"];
  /** List of owned power creeps in array form */
  public ownedPowerCreeps: PowerCreep[];

  public constructor(private gameDirector: GameDirector, dependencies: CreepManagerDependencies) {
    this.ownedCreep = dependencies.creeps;
    this.ownedCreeps = Object.values(dependencies.creeps);
    this.ownedPowerCreep = dependencies.powerCreeps;
    this.ownedPowerCreeps = Object.values(dependencies.powerCreeps);
  }

  @Priority("HIGH")
  @Frequency("CONSTANTLY") // Maybe: FREQUENTLY
  public assignTasks(tasks: Task[]): void {}

  @Priority("LOW")
  @Frequency("FREQUENTLY")
  public assignEnergySources(energySources: Source[]): void {}

  @Priority("HIGH")
  @Frequency("CONSTANTLY")
  public controlCreep(creep: Creep): void {}

  private unassignedCreeps(): Creep[] {
    return [];
  }
}

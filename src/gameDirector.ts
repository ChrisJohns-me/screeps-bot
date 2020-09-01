import { MapManager } from "managers/mapManager";
import { MemoryManager } from "managers/memoryManager";
import { TaskManager } from "managers/taskManager";
import { CreepManager } from "./managers/creepManager";

export class GameDirector {
  public memoryManager!: MemoryManager;
  public mapManager!: MapManager;
  public creepManager!: CreepManager;
  public taskManager!: TaskManager;

  public get ownedRooms(): Room[] {
    return this.mapManager.ownedRooms;
  }

  public get ownedCreeps(): Creep[] {
    return this.creepManager.ownedCreeps;
  }

  public get ownedPowerCreeps(): PowerCreep[] {
    return this.creepManager.ownedPowerCreeps;
  }

  public constructor(private game: Game) {}

  public initialize(): void {}

  public loop(): void {}
}

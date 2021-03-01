import { MapManager } from "managers/mapManager";
import { MemoryManager } from "managers/memoryManager";
import { TaskManager } from "managers/taskManager";
import { CreepManager } from "./managers/creepManager";

export class GameDirector {
  public memoryManager!: MemoryManager;
  public mapManager!: MapManager;
  public creepManager!: CreepManager;
  public taskManager!: TaskManager;

  public get ownedRoom(): MapManager["ownedRoom"] {
    return this.mapManager.ownedRoom;
  }

  public get ownedRooms(): MapManager["ownedRooms"] {
    return this.mapManager.ownedRooms;
  }

  public get ownedCreep(): CreepManager["ownedCreep"] {
    return this.creepManager.ownedCreep;
  }

  public get ownedCreeps(): CreepManager["ownedCreeps"] {
    return this.creepManager.ownedCreeps;
  }

  public get ownedPowerCreep(): CreepManager["ownedPowerCreep"] {
    return this.creepManager.ownedPowerCreep;
  }

  public get ownedPowerCreeps(): CreepManager["ownedPowerCreeps"] {
    return this.creepManager.ownedPowerCreeps;
  }

  public constructor(private game: Game) {}

  public initialize(): void {}

  public loop(): void {}
}

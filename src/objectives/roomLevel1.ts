import { RoomObjective } from "classes/roomObjective";
import { InitializeRoomController } from "../controllers/rooms/initializeRoomController";
import { LandscapeController } from "../controllers/rooms/landscapeController";
import { RunScreepsController } from "../controllers/runScreepsController";
import { SpawnsController } from "../controllers/spawns/spawnsController";

export class RoomLevel1 extends RoomObjective {
  public startRoom(): void {
    InitializeRoomController.initialize(super.roomName);
  }

  public startLandscape(): void {
    LandscapeController.initialize(super.roomName);
  }

  public startSpawns(): void {
    SpawnsController.initialize(super.roomName, [
      { type: CreepRole.CREEP_EXTRACTOR, min: 1, priority: 10 },
      { type: CreepRole.CREEP_BUILDER, min: 0, priority: 0 },
      { type: CreepRole.CREEP_UPGRADER, min: 2, priority: 30 },
      { type: CreepRole.CREEP_SPAWN_CARRIER, min: 1, priority: 15 },
      { type: CreepRole.CREEP_TOWER_CARRIER, min: 0, priority: 0 }
    ]);
  }

  public runCreeps(): void {
    RunScreepsController.initialize(super.roomName);
  }
}

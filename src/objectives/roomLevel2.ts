import { RoomObjective } from "classes/roomObjective";
import { LandscapeController } from "controllers/rooms/landscapeController";
import { CreepRole } from "enums/creepRole.enum";
import { TerrainEnergySourcesMemory } from "types/memory/rooms/terrainEnergySourcesMemory";
import { ConstructionSitesController } from "../controllers/rooms/constructionSitesController";
import { InitializeRoomController } from "../controllers/rooms/initializeRoomController";
import { RunScreepsController } from "../controllers/runScreepsController";
import { SpawnsController } from "../controllers/spawns/spawnsController";

export class RoomLevel2 extends RoomObjective {
  public startRoom(): void {
    InitializeRoomController.initialize(this.roomName);
  }

  public startLandscape(): void {
    LandscapeController.initialize(this.roomName);
  }

  public startSpawns(): void {
    SpawnsController.initialize(this.roomName, [
      { type: CreepRole.CREEP_EXTRACTOR, min: 2, priority: 10 },
      { type: CreepRole.CREEP_BUILDER, min: 2, priority: 45 },
      { type: CreepRole.CREEP_UPGRADER, min: 3, priority: 30 },
      { type: CreepRole.CREEP_SPAWN_CARRIER, min: 1, priority: 15 },
      { type: CreepRole.CREEP_TOWER_CARRIER, min: 0, priority: 0 }
    ]);
  }

  public startConstruction(): void {
    const spawnId = Memory.rooms[this.roomName].structures?.spawns?.[0].id;
    const controllerId = Memory.rooms[this.roomName].structures?.controller?.id;
    const energySources: Optional<{ [objectId: string]: TerrainEnergySourcesMemory }> =
      Memory.rooms[this.roomName].terrainData?.energySources;
    const energySourcesIdArr: string[] = [];

    // Remap the energy object ids to an array
    for (const sourceId in energySources) {
      energySourcesIdArr.push(sourceId);
    }

    if (spawnId && controllerId) {
      ConstructionSitesController.constructPaths(this.roomName, [
        { fromId: spawnId, toIdArr: energySourcesIdArr, priority: 10 },
        { fromId: controllerId, toIdArr: energySourcesIdArr, priority: 20 }
      ]);
    }
  }

  public runCreeps(): void {
    RunScreepsController.initialize(this.roomName);
  }
}

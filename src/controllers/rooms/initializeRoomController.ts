import { StructureMemory } from "types/memory/rooms/structureMemory";
import { TerrainMapping } from "../../classes/rooms/terrainMapping";

export class InitializeRoomController {
  public static initialize(roomName: string): void {
    if (Memory.rooms[roomName]?.isInitialized === true) {
      // Room already initialized
      return;
    } else if (!Memory.rooms || Object.keys(Memory.rooms).length <= 0) {
      // Verify basic rooms memory structure
      Memory.rooms = {};
    }

    const controller = Game.rooms[roomName]?.controller;
    const spawn = Game.rooms[roomName]?.find<StructureSpawn>(FIND_MY_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_SPAWN
    })[0];

    if (!spawn) {
      throw new Error("No spawn structure was found");
    }

    const memController: Optional<StructureMemory> = !!controller
      ? { id: controller.id, x: controller.pos.x, y: controller.pos.y }
      : undefined;
    const memSpawn: Optional<StructureMemory> = !!spawn ? { id: spawn.id, name: spawn.name, x: spawn.pos.x, y: spawn.pos.y } : undefined;

    Memory.rooms[roomName] = {
      structures: {
        controller: memController,
        spawns: memSpawn ? [memSpawn] : []
      },
      terrainData: TerrainMapping.mapTerrain(roomName),
      isInitialized: true
    };
  }
}

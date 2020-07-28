import { TerrainMapping } from "./terrainMapping";

export class Room {
  public static energySources(roomName: string): Source[] {
    // Ensure data structure
    if (!Memory.rooms[roomName].terrainData) {
      Memory.rooms[roomName].terrainData = TerrainMapping.mapTerrain(roomName);
    } else if (!Memory.rooms[roomName].terrainData!.energySources) {
      Memory.rooms[roomName].terrainData!.energySources = {};
    }

    let memoryEnergySources = Memory.rooms[roomName].terrainData!.energySources;
    const energySources: Source[] = [];

    if (Object.keys(memoryEnergySources).length <= 0) {
      memoryEnergySources = TerrainMapping.mapTerrain(roomName).energySources;
      Memory.rooms[roomName].terrainData!.energySources = memoryEnergySources;
    }

    for (const sourceId in memoryEnergySources) {
      const source = Game.getObjectById<Source>(sourceId);
      if (source) {
        energySources.push(source);
      }
    }

    return energySources;
  }
}

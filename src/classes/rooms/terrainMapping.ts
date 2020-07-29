import { TerrainEnergySourcesMemory } from "types/memory/rooms/terrainEnergySourcesMemory";
import { TerrainData } from "types/terrainData";
import { TerrainTotals } from "types/terrainTotals";

export class TerrainMapping {
  public static mapTerrain(roomName: string): TerrainData {
    const area: LookAtResultWithPos[] = TerrainMapping.terrainArea(roomName);
    const energySources: { [objectId: string]: TerrainEnergySourcesMemory } = TerrainMapping.energySources(roomName);
    const totals: TerrainTotals = TerrainMapping.terrainTotals(roomName, area);

    return { area, energySources, totals };
  }

  private static terrainArea(roomName: string): LookAtResultWithPos[] {
    return Game.rooms[roomName].lookAtArea(0, 0, 50, 50, true);
  }

  private static energySources(roomName: string): TerrainData["energySources"] {
    const energySources: TerrainData["energySources"] = {};
    const listRoomEnergySources: Source[] = Game.rooms[roomName].find(FIND_SOURCES);

    for (const source of listRoomEnergySources) {
      energySources[source.id] = {
        x: source.pos.x,
        y: source.pos.y,
        creepsAssigned: {
          creepWorker: 0,
          creepExtractor: 0,
          creepBuilder: 0,
          creepUpgrader: 0,
          creepCarrierSpawn: 0,
          creepCarrierTower: 0
        }
      };
    }

    return energySources;
  }

  private static terrainTotals(roomName: string, area: LookAtResultWithPos[]): TerrainTotals {
    const terrainType: TerrainTotals = { plains: 0, swamps: 0, walls: 0, total: 0 };

    for (const spot of area) {
      if (spot.terrain === "plain") {
        terrainType.plains++;
      } else if (spot.terrain === "swamp") {
        terrainType.swamps++;
      } else if (spot.terrain === "wall") {
        terrainType.walls++;
      }

      terrainType.total++;
    }

    return terrainType;
  }
}

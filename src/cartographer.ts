// interface Coordinates {
//   x: number;
//   y: number;
// }

// interface StrategicLandscape {
//   constructedWallLocations: Coordinates[];
//   extensionLocations: Coordinates[];
//   linkLocations: Coordinates[];
//   towerLocations: Coordinates[];
//   exitPoints: Coordinates[];
// }

interface TerrainEnergySourcesMemory {
  x: number;
  y: number;
  // LEGACY
  // creepsAssigned: {
  //   [role in CreepRole]: number;
  // };
}

interface TerrainData {
  area: LookAtResultWithPos[];
  energySources: { [objectId: string]: TerrainEnergySourcesMemory };
  totals: TerrainTotals;
}

interface TerrainTotals {
  plains: number;
  swamps: number;
  walls: number;
  total: number;
}

export class Cartographer {
  public mapTerrain(roomName: string): TerrainData {
    const area: LookAtResultWithPos[] = this.terrainArea(roomName);
    const energySources: { [objectId: string]: TerrainEnergySourcesMemory } = this.energySources(roomName);
    const totals: TerrainTotals = this.terrainTotals(roomName, area);

    return { area, energySources, totals };
  }

  private terrainArea(roomName: string): LookAtResultWithPos[] {
    return Game.rooms[roomName].lookAtArea(0, 0, 50, 50, true);
  }

  private energySources(roomName: string): TerrainData["energySources"] {
    const energySources: TerrainData["energySources"] = {};
    const listRoomEnergySources: Source[] = Game.rooms[roomName].find(FIND_SOURCES);

    for (const source of listRoomEnergySources) {
      energySources[source.id] = {
        x: source.pos.x,
        y: source.pos.y
        // LEGACY
        // creepsAssigned: {
        //   creepWorker: 0,
        //   creepExtractor: 0,
        //   creepBuilder: 0,
        //   creepUpgrader: 0,
        //   creepCarrierSpawn: 0,
        //   creepCarrierTower: 0
        // }
      };
    }

    return energySources;
  }

  private terrainTotals(roomName: string, area: LookAtResultWithPos[]): TerrainTotals {
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

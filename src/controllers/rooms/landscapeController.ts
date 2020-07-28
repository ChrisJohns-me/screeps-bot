export class LandscapeController {
  /**
   * Sets up pre-defined structure locations around the room.
   */
  public static initialize(roomName: string): void {
    const terrainData = Memory.rooms[roomName].terrainData;

    if (!terrainData) {
      throw new Error(`Unable to obtain terrain data for room ${roomName}`);
    }

    Memory.rooms[roomName].strategicLandscape = {
      constructedWallLocations: this.constructedWallLocations(roomName, terrainData),
      exitPoints: this.exitPoints(roomName, terrainData),
      extensionLocations: this.extensionLocations(roomName, terrainData),
      linkLocations: this.linkLocations(roomName, terrainData),
      towerLocations: this.towerLocations(roomName, terrainData)
    };
  }

  private static constructedWallLocations(roomName: string, terrain: TerrainData): Coordinates[] {
    const TOP = 2;
    const RIGHT = 47;
    const BOTTOM = 47;
    const LEFT = 2;

    let constructedWallLocations: Coordinates[] = [];

    constructedWallLocations = constructedWallLocations.concat(xWall(TOP), yWall(RIGHT), xWall(BOTTOM), yWall(LEFT));

    return constructedWallLocations;

    function xWall(y: number): Coordinates[] {
      const wallSpots = terrain.area.filter(spot => spot.y === y && spot.terrain === "plain");
      return wallSpots.map(spot => ({ x: spot.x, y: spot.y }));
    }

    function yWall(x: number): Coordinates[] {
      const wallSpots = terrain.area.filter(spot => spot.x === x && spot.terrain === "plain");
      return wallSpots.map(spot => ({ x: spot.x, y: spot.y }));
    }
  }

  private static exitPoints(roomName: string, terrainData: TerrainData): Coordinates[] {
    // TODO: Calc exit points...
    console.log(`exitPoints() unimplemented args:`, roomName, terrainData);
    const pos: Coordinates[] = [
      { x: 2, y: 3 },
      { x: 2, y: 3 }
    ];

    return pos;
  }

  /**
   * Outputs the coordinates to where to place extensions
   */
  private static extensionLocations(roomName: string, terrainData: TerrainData): Coordinates[] {
    // TODO: Calc extension locations...
    console.log(`extensionLocations() unimplemented args:`, terrainData);

    const xStartOffset = -5;
    const yStartOffset = -5;
    const xEndOffset = 5;
    const yEndOffset = 5;
    const xSpacing = 2;
    const ySpacing = 1;
    const spawn = Memory.rooms[roomName].structures?.spawns?.[0];
    const extensionLocations: Coordinates[] = [];

    if (!spawn) {
      // Requires a spawn
      return [];
    }

    for (let rowX = spawn.x + xStartOffset; rowX < spawn.x + xEndOffset; rowX += xSpacing) {
      for (let rowY = spawn.y + yStartOffset; rowY < spawn.y + yEndOffset; rowY += ySpacing) {
        extensionLocations.push({ x: Math.clamp(rowX, 0, 50), y: Math.clamp(rowY, 0, 50) });
      }
    }

    return extensionLocations;
  }

  private static linkLocations(roomName: string, terrainData: TerrainData): Coordinates[] {
    // TODO: Calc link locations...
    console.log(`linkLocations() unimplemented args:`, roomName, terrainData);

    const pos: Coordinates[] = [
      { x: 2, y: 3 },
      { x: 2, y: 3 }
    ];

    return pos;
  }

  private static towerLocations(roomName: string, terrainData: TerrainData): Coordinates[] {
    // TODO: Calc tower locations...
    console.log(`towerLocations() unimplemented args:`, roomName, terrainData);

    const pos: Coordinates[] = [
      { x: 2, y: 3 },
      { x: 2, y: 3 }
    ];

    return pos;
  }
}

import { config } from "../../config";

export class ConstructionSitesController {
  /**
   * Draws a path (using `pathGoals`) where construction sites will be placed in the room.
   * @param roomName {string}
   * @param pathGoals {PathGoal[]}
   */
  public static constructPaths(roomName: string, pathGoals: PathGoal[]): void {
    pathGoals.sort((a: PathGoal, b: PathGoal) => a.priority - b.priority);

    // Ensure the memory is instantiated
    if (!Memory.rooms[roomName].structurePaths) {
      Memory.rooms[roomName].structurePaths = [];
    }

    // TODO: Add construction sites to the Memory
    if (!Memory.rooms[roomName].constructionSites) {
      Memory.rooms[roomName].constructionSites = [];
    }

    for (const pathGoal of pathGoals) {
      for (const toId of pathGoal.toIdArr) {
        const fromId = pathGoal.fromId;

        if (!fromId || !toId) {
          return;
        }

        ConstructionSitesController.constructSinglePath(roomName, fromId, toId);
      }
    }
  }

  private static pathIsRoads(roomName: string, serializedPath: string): boolean {
    const pathArr = Room.deserializePath(serializedPath);

    const roadsOnPath = pathArr.filter((path: PathStep) => {
      const lookForAt = Game.rooms[roomName].lookForAt(LOOK_STRUCTURES, path.x, path.y)[0];
      return lookForAt?.structureType === "road";
    });

    return roadsOnPath.length >= pathArr.length - 2; // To/From
  }

  private static constructSinglePath(roomName: string, fromId: string, toId: string): void {
    const fromObj = Game.getObjectById<RoomObject>(fromId);
    const toObj = Game.getObjectById<RoomObject>(toId);
    let pathArr: PathStep[];
    let structurePath: Optional<StructurePathMemory>;
    let structurePathIndex = 0;
    let serializedPath: string;

    if (!fromObj || !toObj) {
      return;
    }

    // Ensure the memory is instantiated
    if (!Memory.rooms[roomName].structurePaths) {
      Memory.rooms[roomName].structurePaths = [];
    }

    // Try to find pathGoal (structurePaths) in memory
    Memory.rooms[roomName].structurePaths?.forEach((memPath, memIndex) => {
      if (
        (memPath.fromId === fromId && memPath.toId === toId) ||
        (memPath.fromId === toId && memPath.toId === fromId)
      ) {
        structurePath = memPath;
        structurePathIndex = memIndex;
        return;
      }
    });

    if (structurePath?.built === true) {
      // Check if cache expired for this structurePath's "built" variable.
      // After a certain amount of time, paths need to be verified that the path is still intact.
      const cacheExpire = Memory.rooms[roomName].structurePaths?.[structurePathIndex]?.cacheExpire;
      if (cacheExpire && Game.time >= cacheExpire) {
        pathArr = fromObj.pos.findPathTo(toObj.pos);
        serializedPath = Room.serializePath(pathArr);

        // Verify whole path is built; if it's not, update the memory
        if (
          !this.pathIsRoads(roomName, serializedPath) &&
          Memory.rooms[roomName].structurePaths?.[structurePathIndex]
        ) {
          Memory.rooms[roomName].structurePaths![structurePathIndex].built = false;
        }
      }

      // Move to next path
      return;
    } else if (structurePath?.built === false) {
      // Check for barely finished paths, and mark them as built (with cache timer)
      if (
        structurePath.serialized &&
        ConstructionSitesController.pathIsRoads(roomName, structurePath.serialized) &&
        Memory.rooms[roomName].structurePaths?.[structurePathIndex]
      ) {
        Memory.rooms[roomName].structurePaths![structurePathIndex].built = true;
        Memory.rooms[roomName].structurePaths![structurePathIndex].cacheExpire =
          Game.time + config.cacheTimeExpire.verifyPaths;
      }
      return;
    }

    // Generate path/road
    pathArr = fromObj.pos.findPathTo(toObj.pos);
    serializedPath = Room.serializePath(pathArr);
    const newPath: StructurePathMemory = {
      fromId,
      toId,
      serialized: serializedPath,
      built: false
    };

    Memory.rooms[roomName].structurePaths!.push(newPath);
    pathArr.forEach((path: PathStep) => Game.rooms[roomName].createConstructionSite(path.x, path.y, STRUCTURE_ROAD));
  }
}

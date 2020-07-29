import { CreepRole } from "enums/creepRole.enum";
import { CreepGoal } from "types/creepGoal";
import { Creeps } from "../../classes/creeps/creeps";

export class SpawnsController {
  public static initialize(roomName: string, creepGoals: CreepGoal[]): void {
    const creepsCount = Creeps.creepsCount(roomName);

    // Remove goals that have been met + prioritize goals
    creepGoals = creepGoals.filter(creepGoal => creepsCount && creepsCount[creepGoal.type] < creepGoal.min);
    creepGoals = SpawnsController.sortCreeps(roomName, creepGoals);

    for (const creepGoal of creepGoals) {
      SpawnsController.createCreep(roomName, creepGoal.type);
    }
  }

  /**
   * @param roomName
   * @param creepRole {CreepRole} Creep role to create/spawn
   * @returns {boolean} if successfully created creep
   */
  private static createCreep(roomName: string, creepRole: CreepRole): boolean {
    const spawn = Game.getObjectById<StructureSpawn>(Memory.rooms[roomName].structures?.spawns?.[0].id ?? "");
    const spawnData = Memory.rooms[roomName].spawnData;
    const bodyParts = Creeps.bodyParts(creepRole);
    const creepMemory: CreepMemory = { role: creepRole, room: roomName };
    const creepName = spawn?.createCreep(bodyParts, undefined, creepMemory);

    if (typeof creepName !== "string") {
      return false;
    }

    Creeps.increaseCreepCount(roomName, creepRole);

    if (spawnData && Memory.rooms[roomName].spawnData?.lastSpawnGameTime) {
      const spawnDataIndex = spawnData.lastSpawnGameTime.map(lastspawn => lastspawn.creepRole).indexOf(creepRole);
      Memory.rooms[roomName].spawnData!.lastSpawnGameTime[spawnDataIndex] = {
        creepRole,
        gameTime: Game.time
      };
    }

    return true;
  }

  /**
   * Attempt to sort the creep goals by priority but also the last spawned type
   * @param roomName
   * @param creepGoals {CreepGoal[]}
   */
  private static sortCreeps(roomName: string, creepGoals: CreepGoal[]): CreepGoal[] {
    return creepGoals.sort((a, b) => {
      let aTimeLastSpawned = 0;
      let bTimeLastSpawned = 0;

      const spawnData = Memory.rooms[roomName]?.spawnData;
      if (spawnData) {
        aTimeLastSpawned = spawnData.lastSpawnGameTime.filter(lastspawn => lastspawn.creepRole === a.type)[0].gameTime;
        bTimeLastSpawned = spawnData.lastSpawnGameTime.filter(lastspawn => lastspawn.creepRole === b.type)[0].gameTime;
      }

      return a.priority / (aTimeLastSpawned - Game.time) - b.priority / (bTimeLastSpawned - Game.time);
    });
  }
}

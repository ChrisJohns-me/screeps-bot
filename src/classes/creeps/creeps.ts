import { CreepController } from "controllers/creeps/creepController";
import { CreepRole } from "enums/creepRole.enum";
import { config } from "../../config";
import { CreepBuilderController } from "../../controllers/creeps/creepBuilderController";
import { CreepExtractorController } from "../../controllers/creeps/creepExtractorController";
import { CreepSpawnCarrierController } from "../../controllers/creeps/creepSpawnCarrierController";
import { CreepTowerCarrierController } from "../../controllers/creeps/creepTowerCarrierController";
import { CreepUpgraderController } from "../../controllers/creeps/creepUpgraderController";
import { CreepWorkerController } from "../../controllers/creeps/creepWorkerController";

// TODO: Implement a check to account for the deaths of creeps
export class Creeps {
  public static creepRoles: CreepRole[] = [
    CreepRole.CREEP_EXTRACTOR,
    CreepRole.CREEP_BUILDER,
    CreepRole.CREEP_UPGRADER,
    CreepRole.CREEP_SPAWN_CARRIER,
    CreepRole.CREEP_TOWER_CARRIER,
    CreepRole.CREEP_WORKER
  ];
  public static creepRolesControllers: { [role in CreepRole]: new (creep: Creep) => CreepController } = {
    [CreepRole.CREEP_EXTRACTOR]: CreepExtractorController,
    [CreepRole.CREEP_BUILDER]: CreepBuilderController,
    [CreepRole.CREEP_UPGRADER]: CreepUpgraderController,
    [CreepRole.CREEP_SPAWN_CARRIER]: CreepSpawnCarrierController,
    [CreepRole.CREEP_TOWER_CARRIER]: CreepTowerCarrierController,
    [CreepRole.CREEP_WORKER]: CreepWorkerController
  };

  public static bodyParts(creepRole?: CreepRole): BodyPartConstant[] {
    let bodyParts: BodyPartConstant[] = [];
    creepRole = creepRole ?? CreepRole.CREEP_WORKER;

    if (creepRole === CreepRole.CREEP_EXTRACTOR) {
      bodyParts = [WORK, MOVE, CARRY];
    } else if (creepRole === CreepRole.CREEP_BUILDER) {
      bodyParts = [WORK, MOVE, CARRY];
    } else if (creepRole === CreepRole.CREEP_UPGRADER) {
      bodyParts = [WORK, MOVE, CARRY];
    } else if (creepRole === CreepRole.CREEP_SPAWN_CARRIER) {
      bodyParts = [CARRY, MOVE];
    } else if (creepRole === CreepRole.CREEP_TOWER_CARRIER) {
      bodyParts = [CARRY, MOVE];
    } else {
      // Default to CREEP_WORKER
      bodyParts = [WORK, MOVE, CARRY];
    }

    return bodyParts;
  }

  // TODO: This does not account for the deaths of creeps.
  public static creepsCount(roomName: string, bustCache = false): RoomMemory["creepsCount"] {
    const creepsCount: RoomMemory["creepsCount"] = {
      creepWorker: 0,
      creepExtractor: 0,
      creepBuilder: 0,
      creepUpgrader: 0,
      creepCarrierSpawn: 0,
      creepCarrierTower: 0
    };
    if (!Game?.creeps) {
      return creepsCount;
    }

    const cacheExpire = Memory.rooms[roomName].creepsCountCacheExpire;
    if (!bustCache && cacheExpire && cacheExpire > Game.time) {
      return Memory.rooms[roomName].creepsCount;
    }

    // Do a quick count
    for (const creepRole of Creeps.creepRoles) {
      creepsCount[creepRole] = _.filter(
        Game.creeps,
        (creep: Creep) => creep.memory.room === roomName && creep.memory.role === creepRole
      ).length;
    }

    if (roomName && Memory.rooms[roomName]) {
      Memory.rooms[roomName].creepsCount = creepsCount;
      Memory.rooms[roomName].creepsCountCacheExpire = Game.time + config.cacheTimeExpire.creepsCount;
    }

    return creepsCount;
  }

  public static increaseCreepCount(roomName: string, increaseCreepType: CreepRole): void {
    // Do a new count of all creeps
    Creeps.creepsCount(roomName, true);
    if (Memory.rooms[roomName].creepsCount) {
      Memory.rooms[roomName].creepsCount![increaseCreepType]++;
    }
  }

  public static decreaseCreepCount(roomName: string, decreaseCreepType: CreepRole): void {
    // Do a new count of all creeps
    Creeps.creepsCount(roomName, true);
    if (Memory.rooms[roomName].creepsCount) {
      Memory.rooms[roomName].creepsCount![decreaseCreepType]--;
    }
  }
}

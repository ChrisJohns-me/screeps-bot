import { Room } from "../../classes/rooms/room";
import { config } from "../../config";

export abstract class CreepController {
  public creep: Creep;
  public creepType?: CreepRole;

  public constructor(creep: Creep) {
    this.creep = creep;
  }

  public assignEnergySource(): void {
    let energySource: Nullable<Source>;
    let energySourceCache: number = Game.time;
    let extractedResource: Nullable<Resource>;
    let extractedResourceCache: number = Game.time;

    if (this.creep.memory?.energySource) {
      // Energy source cache expired
      if (this.creep.memory.energySource?.objectIdCacheExpire < Game.time) {
        energySource = this.getEnergySource();
        energySourceCache = Game.time + config.cacheTimeExpire.creepEnergySource;
      } else {
        energySource = Game.getObjectById(this.creep.memory.energySource.objectId);
        energySourceCache = this.creep.memory.energySource.objectIdCacheExpire;
      }
      this.creep.memory.energySource.objectId = energySource?.id ?? "";
      this.creep.memory.energySource.objectIdCacheExpire = energySourceCache;

      // Extracted resource cache expired
      if (
        !this.creep.memory.energySource?.extractedResourceId ||
        this.creep.memory.energySource?.extractedResourceIdCacheExpire < Game.time
      ) {
        extractedResource = this.getExtractedResource();
        extractedResourceCache = Game.time + config.cacheTimeExpire.creepExtractedResource;
      } else {
        extractedResource = Game.getObjectById(this.creep.memory.energySource?.extractedResourceId);
        extractedResourceCache = this.creep.memory.energySource.extractedResourceIdCacheExpire;
      }
      this.creep.memory.energySource.extractedResourceId = extractedResource?.id ?? "";
      this.creep.memory.energySource.extractedResourceIdCacheExpire = extractedResourceCache;
    }

    // Store energy sources in Terrain
    if (energySource?.id && this.creepType) {
      if (
        Memory.rooms[this.creep.memory.room].terrainData?.energySources[energySource.id]?.creepsAssigned[this.creepType]
      ) {
        Memory.rooms[this.creep.memory.room].terrainData!.energySources[energySource.id].creepsAssigned[
          this.creepType
        ]++;
      } else {
        Memory.rooms[this.creep.memory.room].terrainData!.energySources[energySource.id].creepsAssigned = {
          creepWorker: 0,
          creepExtractor: 0,
          creepBuilder: 0,
          creepUpgrader: 0,
          creepCarrierSpawn: 0,
          creepCarrierTower: 0
        };
        Memory.rooms[this.creep.memory.room].terrainData!.energySources[energySource.id].creepsAssigned[
          this.creepType
        ] = 1;
      }
    }
  }

  public goFetchEnergy(): void {
    let extractedResource: Nullable<Resource>;
    let energySource: Nullable<Source>;

    if (this.creep.memory?.energySource?.extractedResourceId) {
      extractedResource = Game.getObjectById(this.creep.memory.energySource.extractedResourceId);
    }

    if (this.creep.memory?.energySource?.objectId) {
      energySource = Game.getObjectById(this.creep.memory.energySource.objectId);
    }

    if (!extractedResource || !energySource) {
      this.assignEnergySource();
    }

    extractedResource = Game.getObjectById(this.creep.memory?.energySource?.extractedResourceId ?? "");
    energySource = Game.getObjectById(this.creep.memory.energySource?.objectId ?? "");

    if (extractedResource && this.creep.pickup(extractedResource) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(extractedResource);
    } else if (energySource && this.creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(energySource);
    }
  }

  private getEnergySource(): Source {
    let energySources: Source[];

    energySources = Room.energySources(this.creep.room.name);
    energySources = energySources.sort((a: Source, b: Source) => {
      const cntAssignedToA: number = _.filter(Game.creeps, (c: Creep) => c?.memory?.energySource?.objectId === a.id)
        .length;
      const cntAssignedToB: number = _.filter(Game.creeps, (c: Creep) => c?.memory?.energySource?.objectId === b.id)
        .length;
      const creepDistanceToA: number = this.creep.pos.getRangeTo(a.pos);
      const creepDistanceToB: number = this.creep.pos.getRangeTo(b.pos);
      return cntAssignedToA !== cntAssignedToB ? cntAssignedToA - cntAssignedToB : creepDistanceToA - creepDistanceToB;
    });

    return energySources[0];
  }

  private getExtractedResource(): Resource {
    return this.creep.pos.findInRange(FIND_DROPPED_RESOURCES, config.cacheTimeExpire.creepExtractedResource)[0];
  }
}

export interface EstateAgent {
  /** Owned rooms, accessible via `ownedRoom[roomName]` or `ownedRoom.roomName` */
  ownedRoom: Game["rooms"];
  /** List of owned rooms in array form */
  ownedRooms: Room[];

  mapTerrain(room: Room): void;
  auditStructures(room: Room): void;
  prepareEnergySources(room: Room): void;
  energySourcesForCreep(creep: Creep): Source[];
}

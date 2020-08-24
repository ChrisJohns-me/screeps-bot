export interface EstateAgent {
  ownedRooms: Room[];

  mapTerrain(room: Room): void;
  auditStructures(room: Room): void;
  prepareTaskList(room: Room): void;
  prepareEnergySourcesList(room: Room): void;
}

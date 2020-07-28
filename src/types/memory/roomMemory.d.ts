interface RoomMemory {
  constructionSites?: []; // TODO
  creepsCount?: { [role in CreepRole]: number };
  creepsCountCacheExpire?: number;
  isInitialized: boolean;
  structurePaths?: StructurePathMemory[];
  terrainData?: TerrainData;
  spawnData?: SpawnDataMemory;
  strategicLandscape?: StrategicLandscape;
  structures?: {
    containers?: StructureMemory[];
    controller?: StructureMemory;
    extensions?: StructureMemory[];
    extractors?: StructureMemory[];
    keeperlairs?: StructureMemory[];
    labs?: StructureMemory[];
    links?: StructureMemory[];
    nukers?: StructureMemory[];
    observers?: StructureMemory[];
    powerbanks?: StructureMemory[];
    powerspawns?: StructureMemory[];
    portals?: StructureMemory[];
    ramparts?: StructureMemory[];
    roads?: StructureMemory[];
    spawns?: StructureMemory[];
    storages?: StructureMemory[];
    terminals?: StructureMemory[];
    towers?: StructureMemory[];
    walls?: StructureMemory[];
  };
}

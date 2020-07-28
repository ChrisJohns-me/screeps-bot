interface TerrainEnergySourcesMemory {
  x: number;
  y: number;
  creepsAssigned: {
    [role in CreepRole]: number;
  };
}

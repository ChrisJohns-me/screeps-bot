interface TerrainData {
  area: LookAtResultWithPos[];
  energySources: { [objectId: string]: TerrainEnergySourcesMemory };
  totals: TerrainTotals;
}

import { TerrainEnergySourcesMemory } from "./memory/rooms/terrainEnergySourcesMemory";
import { TerrainTotals } from "./terrainTotals";

export interface TerrainData {
  area: LookAtResultWithPos[];
  energySources: { [objectId: string]: TerrainEnergySourcesMemory };
  totals: TerrainTotals;
}

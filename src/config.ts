import { IConfig } from "interfaces/config.interface";

export const config: IConfig = {
  cacheTimeExpire: {
    creepsCount: 250,
    creepEnergySource: 1000,
    creepExtractedResource: 50,
    serializedPaths: 200,
    verifyPaths: 6000
  }
};

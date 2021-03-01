import { GameDirector } from "gameDirector";

export class Architect {
  public constructor(private gameDirector: GameDirector) {}

  public extensions(area: LookAtResultWithPos<LookConstant>[]): STRUCTURE_EXTENSION[] {
    return [];
  }

  public containers(area: LookAtResultWithPos<LookConstant>[]): STRUCTURE_CONTAINER[] {
    return [];
  }

  public walls(area: LookAtResultWithPos<LookConstant>[]): STRUCTURE_WALL[] {
    return [];
  }

  public towers(area: LookAtResultWithPos<LookConstant>[]): STRUCTURE_TOWER[] {
    return [];
  }
}

import { GameDirector } from "gameDirector";

export class Cartographer {
  public constructor(private gameDirector: GameDirector) {}

  public energySources(roomName: string): Source[] {
    return this.gameDirector.ownedRoom[roomName].find(FIND_SOURCES);
  }

  public roads(area: LookAtResultWithPos<LookConstant>[]): void {}

  public exits(roomName: string): RoomPosition[] {
    return this.gameDirector.ownedRoom[roomName].find(FIND_EXIT);
  }

  // Maybe rename this?
  // Also check the perf.
  // private terrainTotals(area: LookAtResultWithPos[]): TerrainTotals {
  //   return {
  //     plains: area.reduce((acc, cur) => (cur.terrain === "plain" ? ++acc : acc), 0),
  //     swamps: area.reduce((acc, cur) => (cur.terrain === "swamp" ? ++acc : acc), 0),
  //     walls: area.reduce((acc, cur) => (cur.terrain === "wall" ? ++acc : acc), 0),
  //     total: area.filter(spot => spot.type === "terrain").length
  //   };
  // }
}

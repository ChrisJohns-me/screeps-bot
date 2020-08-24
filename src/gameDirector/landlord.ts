import { EstateAgent } from "interfaces/estateAgent";

export class Landlord implements EstateAgent {
  public ownedRooms: Room[];

  public constructor(rooms: Game["rooms"]) {
    this.ownedRooms = Object.values(rooms);
  }

  public mapTerrain(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public auditStructures(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public prepareTaskList(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public prepareEnergySourcesList(room: Room): void {
    throw new Error("Method not implemented.");
  }
}

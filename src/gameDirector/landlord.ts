import { EstateAgent } from "interfaces/estateAgent";
import { GameDirector } from "./gameDirector";

export class Landlord implements EstateAgent {
  public ownedRoom: Game["rooms"];
  public ownedRooms: Room[];

  public constructor(private gameDirector: GameDirector, ownedRooms: Game["rooms"]) {
    this.ownedRooms = Object.values(ownedRooms);
    this.ownedRoom = ownedRooms;
  }

  public mapTerrain(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public auditStructures(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public prepareTasks(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public prepareEnergySources(room: Room): void {
    throw new Error("Method not implemented.");
  }

  public energySourcesForCreep(creep: Creep): Source[] {
    throw new Error("Method not implemented.");
  }
}

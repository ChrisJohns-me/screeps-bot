import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { EstateAgent } from "interfaces/estateAgent";
import { GameDirector } from "./gameDirector";

export class Landlord implements EstateAgent {
  public ownedRoom: Game["rooms"];
  public ownedRooms: Room[];

  public constructor(private gameDirector: GameDirector, ownedRooms: Game["rooms"]) {
    this.ownedRooms = Object.values(ownedRooms);
    this.ownedRoom = ownedRooms;
  }

  @Priority("LOW")
  @Frequency("PERMANENTLY")
  public mapTerrain(room: Room): void {}

  @Priority("LOW")
  @Frequency("OCCASIONALLY")
  public auditStructures(room: Room): void {}

  @Priority("HIGH")
  @Frequency("PERIODICALLY")
  public prepareTasks(room: Room): void {}

  @Priority("HIGH")
  @Frequency("FREQUENTLY")
  public prepareEnergySources(room: Room): void {}

  @Priority("LOW")
  @Frequency("FREQUENTLY")
  public energySourcesForCreep(creep: Creep): Source[] {
    return [];
  }
}

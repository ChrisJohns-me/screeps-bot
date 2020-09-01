import { Cartographer } from "cartographer";
import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { GameDirector } from "gameDirector";

interface MapManagerDependencies {
  ownedRooms: Game["rooms"];
  cartographer: Cartographer;
}

export class MapManager {
  /** Owned rooms, accessible via `ownedRoom[roomName]` or `ownedRoom.roomName` */
  public ownedRoom: Game["rooms"];
  /** List of owned rooms in array form */
  public ownedRooms: Room[];

  private cartographer: Cartographer;

  public constructor(private gameDirector: GameDirector, dependencies: MapManagerDependencies) {
    this.ownedRooms = Object.values(dependencies.ownedRooms);
    this.ownedRoom = dependencies.ownedRooms;
    this.cartographer = dependencies.cartographer;
  }

  @Priority("LOW")
  @Frequency("PERMANENTLY")
  public mapTerrain(room: Room): void {
    const todo = this.cartographer.mapTerrain(room.name); // TODO: Something with the output
  }

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

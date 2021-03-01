import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { GameDirector } from "gameDirector";
import { Cartographer } from "managers/mapManager/cartographer";
import { Architect } from "./mapManager/architect";

interface MapManagerDependencies {
  ownedRooms: Game["rooms"];
  cartographer: Cartographer;
  architect: Architect;
}

export class MapManager {
  /** Owned rooms, accessible via `ownedRoom[roomName]` or `ownedRoom.roomName` */
  public ownedRoom: Game["rooms"];
  /** List of owned rooms in array form */
  public ownedRooms: Room[];

  private cartographer: Cartographer;
  private architect: Architect;

  public constructor(private gameDirector: GameDirector, dependencies: MapManagerDependencies) {
    this.ownedRooms = Object.values(dependencies.ownedRooms);
    this.ownedRoom = dependencies.ownedRooms;
    this.cartographer = dependencies.cartographer;
    this.architect = dependencies.architect;
  }

  @Priority("LOW")
  @Frequency("PERMANENTLY")
  public mapTerrain(room: Room): void {
    const area = this.gameDirector.ownedRoom[room.name].lookAtArea(0, 0, 50, 50, true);
    const energySources = this.cartographer.energySources(room.name);
    const roads = this.cartographer.roads(area);
    const exits = this.cartographer.exits(room.name);
    const extensions = this.architect.extensions(area);
    const containers = this.architect.containers(area);
    const walls = this.architect.walls(area);
    const towers = this.architect.towers(area);
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

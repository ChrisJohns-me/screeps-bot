import { RoomObjective } from "classes/roomObjective";
import { RoomLevel1 } from "objectives/roomLevel1";
import { RoomLevel2 } from "objectives/roomLevel2";
import { Timer } from "utilities/timer";

// TODO: Refactor to a better objectives controller,
//       where it merges the current level with lower level objectives.
//       Useful if high levels don't want to change lower level objectives.
export class ObjectivesController {
  private roomObjectives: { [level: number]: new (roomName: string) => RoomObjective } = {
    1: RoomLevel1,
    2: RoomLevel2
  };

  public pursueRoomLevel(roomName: string, roomLevel: number): void {
    const roomObjective = new this.roomObjectives[roomLevel](roomName);
    const roomTimer = new Timer();
    roomTimer.start();

    roomObjective.startRoom();
    roomObjective.startLandscape();
    roomObjective.startSpawns();
    roomObjective.startConstruction();
    roomObjective.runCreeps();

    roomTimer.end();
    roomTimer.watchdog(50, (t: number) => `this.roomObjectives[${roomLevel}][${roomName}]: ${t}ms`);
    roomTimer.watchdog(50);
  }
}

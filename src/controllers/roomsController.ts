import { GameUtilities } from "utilities/gameUtilities";
import { ObjectivesController } from "../controllers/objectivesController";

export class RoomsController {
  public static initialize(): void {
    RoomsController.executeAllRooms();
  }

  public static executeAllRooms(): void {
    const objectivesCtl = new ObjectivesController();
    const ownedRooms = GameUtilities.ownedRooms();

    for (const myRoom in ownedRooms) {
      const level = Game.rooms[myRoom].controller?.level ?? 1;
      objectivesCtl.pursueRoomLevel(myRoom, level);
    }
  }
}

import { GameController } from "controllers/gameController";
import { RoomsController } from "controllers/roomsController";
import { ErrorMapper } from "utilities/errorMapper";
import "./prototypes/mathPrototype";

GameController.initialize();

export const loop = ErrorMapper.wrapLoop(() => {
  // Setup Controllers
  RoomsController.initialize();
});

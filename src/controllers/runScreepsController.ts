import { Timer } from "utilities/timer";
import { Creeps } from "../classes/creeps/creeps";

export class RunScreepsController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static initialize(roomName: string): void {
    RunScreepsController.executeAllCreeps();
  }

  public static executeAllCreeps(): void {
    const ownedCreeps = Game.creeps;
    const creepTimer = new Timer();

    for (const ownedCreep in ownedCreeps) {
      const myCreep = Game.creeps[ownedCreep];

      try {
        creepTimer.start();
        new Creeps.creepRolesControllers[myCreep.memory.role](myCreep);
        creepTimer.end();

        creepTimer.watchdog(5, (t: number) => `"${myCreep.name}" (${myCreep.memory.role}): ${t}ms`);
      } catch (ex) {
        console.exception(`Caught error with "${myCreep.name}" (${myCreep.memory.role})`, ex);
      }
    }
  }
}

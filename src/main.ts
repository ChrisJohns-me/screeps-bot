import { Cartographer } from "cartographer";
import { GameDirector } from "gameDirector";
import { CreepManager } from "managers/creepManager";
import { MapManager } from "managers/mapManager";
import { MemoryManager } from "managers/memoryManager";
import { TaskManager } from "managers/taskManager";
import { ErrorMapper } from "utilities/errorMapper";
import "./prototypes/creepPrototype";
import "./prototypes/mathPrototype";

global.firstBoot = true;

const theGameDirector = new GameDirector(Game);
theGameDirector.memoryManager = new MemoryManager(theGameDirector, {
  memory: Memory
});
theGameDirector.mapManager = new MapManager(theGameDirector, {
  ownedRooms: Game.rooms,
  cartographer: new Cartographer()
});
theGameDirector.creepManager = new CreepManager(theGameDirector, {
  creeps: Game.creeps,
  powerCreeps: Game.powerCreeps
});
theGameDirector.taskManager = new TaskManager(theGameDirector, {});

// Run on Bootstrap
theGameDirector.memoryManager.checkIntegrity();
theGameDirector.memoryManager.collectGarbage();

export const loop = ErrorMapper.wrapLoop(() => {
  // Rooms
  theGameDirector.ownedRooms.forEach(room => {
    theGameDirector.mapManager.mapTerrain(room);
    theGameDirector.mapManager.auditStructures(room);
    theGameDirector.taskManager.prepareTasks(room);
    theGameDirector.mapManager.prepareEnergySources(room);
  });

  // Creeps
  theGameDirector.ownedCreeps.forEach(creep => {
    const tasks = theGameDirector.taskManager.tasks;
    const energySources = theGameDirector.mapManager.energySourcesForCreep(creep);

    theGameDirector.creepManager.assignTasks(tasks);
    theGameDirector.creepManager.assignEnergySources(energySources);
    // theGameDirector.unitOperator.prepareForDeath(); // TODO

    theGameDirector.creepManager.controlCreep(creep);
  });

  // Power Creeps
  // theGameDirector.ownedPowerCreeps.forEach(powerCreep => {}); // TODO
  global.firstBoot = false;
});

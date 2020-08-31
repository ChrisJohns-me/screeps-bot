import { Brain } from "gameDirector/brain";
import { GameDirector } from "gameDirector/gameDirector";
import { Landlord } from "gameDirector/landlord";
import { Puppeteer } from "gameDirector/puppeteer";
import { Tasker } from "gameDirector/tasker";
import { ErrorMapper } from "utilities/errorMapper";
import "./prototypes/creepPrototype";
import "./prototypes/mathPrototype";

const theGameDirector = new GameDirector(Game);

theGameDirector.mind = new Brain(theGameDirector, Memory);
theGameDirector.estateAgent = new Landlord(theGameDirector, Game.rooms);
theGameDirector.unitOperator = new Puppeteer(theGameDirector, Game.creeps, Game.powerCreeps);
theGameDirector.taskMaster = new Tasker(theGameDirector);

// Run on Bootstrap
theGameDirector.mind.checkIntegrity();
theGameDirector.mind.collectGarbage();

export const loop = ErrorMapper.wrapLoop(() => {
  // Rooms
  theGameDirector.ownedRooms.forEach(room => {
    theGameDirector.estateAgent.mapTerrain(room);
    theGameDirector.estateAgent.auditStructures(room);
    theGameDirector.taskMaster.prepareTasks(room);
    theGameDirector.estateAgent.prepareEnergySources(room);
  });

  // Creeps
  theGameDirector.ownedCreeps.forEach(creep => {
    const tasks = theGameDirector.taskMaster.tasks;
    const energySources = theGameDirector.estateAgent.energySourcesForCreep(creep);

    theGameDirector.unitOperator.assignTasks(tasks);
    theGameDirector.unitOperator.assignEnergySources(energySources);
    // theGameDirector.unitOperator.prepareForDeath(); // TODO

    theGameDirector.unitOperator.controlCreep(creep);
  });

  // Power Creeps
  // theGameDirector.ownedPowerCreeps.forEach(powerCreep => {}); // TODO
});

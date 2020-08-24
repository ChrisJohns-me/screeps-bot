import { Brain } from "gameDirector/brain";
import { GameDirector } from "gameDirector/gameDirector";
import { Landlord } from "gameDirector/landlord";
import { Puppeteer } from "gameDirector/puppeteer";
import { ErrorMapper } from "utilities/errorMapper";
import "./prototypes/mathPrototype";

// Build Game Director
const theGameDirector = new GameDirector(Game, {
  mind: new Brain(Memory),
  estateAgent: new Landlord(Game.rooms),
  unitOperator: new Puppeteer([Game.creeps, Game.powerCreeps])
});

// Run on Bootstrap
theGameDirector.mind.checkIntegrity();
theGameDirector.mind.collectGarbage();

export const loop = ErrorMapper.wrapLoop(() => {
  theGameDirector.ownedRooms.forEach(room => {
    theGameDirector.estateAgent.mapTerrain(room);
    theGameDirector.estateAgent.auditStructures(room);
    theGameDirector.estateAgent.prepareTaskList(room);
    theGameDirector.estateAgent.prepareEnergySourcesList(room);
  });
});

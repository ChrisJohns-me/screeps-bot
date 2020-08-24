import { Task } from "./task";

export interface UnitOperator {
  ownedCreeps: Creep[];
  ownedPowerCreeps: PowerCreep[];

  assignTasks(tasks: Task[]): void;
  assignEnergySources(energySources: Source[]): void;
  controlCreep(creep: Creep): void;
}

import { Task } from "interfaces/task";
import { TaskMaster } from "interfaces/taskMaster";
import { GameDirector } from "./gameDirector";

export class Tasker implements TaskMaster {
  public tasks: Task[] = [];

  public constructor(private gameDirector: GameDirector) {}

  public prepareTasks(room: Room): void {}
}

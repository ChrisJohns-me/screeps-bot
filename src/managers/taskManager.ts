import { GameDirector } from "gameDirector";
import { Task } from "tasks/task";

interface TaskManagerDependencies {}

export class TaskManager {
  public tasks: Task[] = [];

  public constructor(private gameDirector: GameDirector, dependencies: TaskManagerDependencies) {}

  public prepareTasks(room: Room): void {}
}

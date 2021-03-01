import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { GameDirector } from "gameDirector";
import { Task } from "tasks/task";
import { TempTask } from "tasks/tempTask";

export class TaskManager {
  /** Tasks by room */
  public roomTask: { [roomName: string]: Task[] } = {};

  private tasks: Task[] = [new TempTask()];

  public constructor(private gameDirector: GameDirector) {}

  @Priority("HIGH")
  @Frequency("PERIODICALLY")
  public prepareTasks(room: Room): void {
    this.tasks.forEach(task => task.evaluate(room));

    this.tasks.sort((a, b) => b.priority - a.priority);
  }
}

import { Task } from "./task";

export interface TaskMaster {
  tasks: Task[];

  prepareTasks(room: Room): void;
}

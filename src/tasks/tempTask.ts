import { Task, TaskPriority } from "./task";

export class TempTask implements Task {
  public id = this.constructor.name;
  public friendlyName = "Temporary";
  public priority!: TaskPriority;
  public bodyPartsRequired: BodyPartConstant[] = [];
  public bodyPartsSuggested: BodyPartConstant[] = [];
  public minCreepsAssigned = 0;
  public maxCreepsAssigned = 3;

  public constructor() {}

  public evaluate(room: Room): void {}

  public doWhile(): boolean {
    return true;
  }

  public runTask(): void {
    console.log("task run.");
  }
}

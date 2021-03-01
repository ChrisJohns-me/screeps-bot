export enum TaskPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = Infinity
}

export interface Task {
  id: string;
  friendlyName: string;
  priority: TaskPriority;
  bodyPartsRequired: BodyPartConstant[];
  bodyPartsSuggested: BodyPartConstant[];
  minCreepsAssigned: number;
  maxCreepsAssigned: number;

  evaluate: (room: Room) => void;
  doWhile: () => boolean;
  runTask: () => void;
}

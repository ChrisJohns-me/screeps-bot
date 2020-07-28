interface CreepGoal {
  type: CreepRole;
  min: number;
  priority: number;
  timeLastSpawned?: number;
}

interface CreepMemory {
  action?: CreepActions;
  energySource?: CreepEnergySourceMemory;
  paths?: Record<string, CreepPathMemory>;
  role: CreepRole;
  roleTargetId?: string;
  room: string;
}

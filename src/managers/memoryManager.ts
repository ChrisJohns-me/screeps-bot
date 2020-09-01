import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { GameDirector } from "gameDirector";

interface MemoryManagerDependencies {
  memory: Memory;
}

export class MemoryManager {
  public memory: Memory;

  public constructor(private gameDirector: GameDirector, dependencies: MemoryManagerDependencies) {
    this.memory = dependencies.memory;
  }

  @Priority("HIGH")
  @Frequency("INTERMITTENT")
  public checkIntegrity(): void {}

  @Priority("LOW")
  @Frequency("INTERMITTENT")
  public collectGarbage(): void {}
}

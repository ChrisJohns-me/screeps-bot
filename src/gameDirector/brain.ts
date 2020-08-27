import { Frequency } from "decorators/frequency";
import { Priority } from "decorators/priority";
import { Mind } from "interfaces/mind";
import { GameDirector } from "./gameDirector";

export class Brain implements Mind {
  @Priority("HIGH")
  @Frequency("INTERMITTENT")
  public checkIntegrity(): void {}

  @Priority("LOW")
  @Frequency("INTERMITTENT")
  public collectGarbage(): void {}

  public constructor(private gameDirector: GameDirector, private memory: Memory) {}
}

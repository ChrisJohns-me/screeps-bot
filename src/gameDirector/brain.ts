import { Priority } from "decorators/priority";
import { Mind } from "interfaces/mind";
import { GameDirector } from "./gameDirector";

export class Brain implements Mind {
  @Priority("HIGH")
  public checkIntegrity(): void {}

  @Priority("LOW")
  public collectGarbage(): void {}

  public constructor(private gameDirector: GameDirector, private memory: Memory) {}
}

import { Mind } from "interfaces/mind";

export class Brain implements Mind {
  public checkIntegrity(): void {}
  public collectGarbage(): void {}

  public constructor(private memory: Memory) {}
}

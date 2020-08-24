import { Unit, UnitOperator } from "interfaces/unitOperator";

export class Puppeteer implements UnitOperator {
  public constructor(private units: Unit[]) {}
}

export abstract class RoomObjective {
  public roomName: string;

  public constructor(roomName: string) {
    this.roomName = roomName;
  }

  public startRoom(): void {
    // To be implemented by child classes
  }

  public startLandscape(): void {
    // To be implemented by child classes
  }

  public startSpawns(): void {
    // To be implemented by child classes
  }

  public startConstruction(): void {
    // To be implemented by child classes
  }

  public runCreeps(): void {
    // To be implemented by child classes
  }
}

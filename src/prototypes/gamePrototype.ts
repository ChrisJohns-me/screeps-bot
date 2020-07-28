interface Game {
  /**
   * Returns an object with a list of rooms owned by you.
   */
  ownedRooms: () => { [roomName: string]: Room };
}

Game.ownedRooms = function (): { [roomName: string]: Room } {
  const roomsList: { [roomName: string]: Room } = Game.rooms;
  const ownedRooms: { [roomName: string]: Room } = {};
  for (const roomName in roomsList) {
    const room: Room = Game.rooms[roomName];
    if (room?.controller?.my) {
      ownedRooms[roomName] = room;
    }
  }

  return ownedRooms;
};

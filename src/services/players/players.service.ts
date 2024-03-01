const players = { one: { id: 'one', name: 'Shalin' }, two: { id: 'two', name: 'Kevin' } };
const vehicles = [
  { id: 'v1', name: 'Merope', playerId: 'one' },
  { id: 'v2', name: 'Gliese-393', playerId: 'one' },
  { id: 'v3', name: 'Vesta', playerId: 'two' },
];

class PlayersService {
  getPlayerVehicles = (id: string) => {
    // Find the player by their Id
    const playerMaybe = players[id];
    if (!playerMaybe) {
      throw new Error(`Player with id ${id} does not exist`);
    }

    // If we don't find the player we will throw an error
    // Then, find all of the vehicles that belong to the player
    const playerVehicles = vehicles.filter((vehicle) => vehicle.playerId === id);
    // Return all the player's vehicles
    return playerVehicles;
  };
}

export default PlayersService;

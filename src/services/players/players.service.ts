import { Player, PlayerSettings, PlayerVehicle } from '../../types/players.types';

const players: { [key: string]: Player } = {
  one: { id: 'one', name: 'Shalin' },
  two: { id: 'two', name: 'Kevin' },
};

const vehicles: PlayerVehicle[] = [
  { id: 'v1', name: 'Merope', playerId: 'one', resaleValue: 15000, paintIndex: 0 },
  { id: 'v2', name: 'Gliese-393', playerId: 'one', resaleValue: 12000, paintIndex: 2 },
  { id: 'v3', name: 'Vesta', playerId: 'two', resaleValue: 10000, paintIndex: 3 },
];

const settings: PlayerSettings[] = [
  { playerId: 'one', soundOn: true, musicOn: true, removeAds: false },
  { playerId: 'two', soundOn: true, musicOn: true, removeAds: true },
];

class PlayersService {
  getPlayer = (id: string) => {
    const playerMaybe = players[id];
    if (!playerMaybe) {
      throw new Error(`Player with id ${id} does not exist`);
    }
    return playerMaybe;
  };

  getPlayerVehicles = (id: string) => {
    const player = this.getPlayer(id);
    // find all of the vehicles that belong to the player
    const playerVehicles = vehicles.filter((vehicle) => vehicle.playerId === player.id);
    // return all the player's vehicles
    return playerVehicles;
  };

  getPlayerSettings = (id: string) => {
    const player = this.getPlayer(id);
    const playerSettings = settings.filter((setting) => setting.playerId === player.id);
    return playerSettings;
  };

  getPlayerData = (id: string) => {
    const player = this.getPlayer(id);
    const playerVehicles = this.getPlayerVehicles(id);
    const playerSettings = this.getPlayerSettings(id);
    return {
      player,
      vehicles: playerVehicles,
      settings: playerSettings,
    };
  };
}

export default PlayersService;

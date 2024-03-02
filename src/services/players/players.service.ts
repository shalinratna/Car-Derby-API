import {
  Player,
  PlayerSettings,
  PlayerVehicle,
  PlayerVehicleUpdate,
  PlayerSettingsUpdate,
} from '../../types/players.types';

import { database } from '../../clients/firebase.client';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

  getAllPlayers = async () => {
    const playersCollectionRef = collection(database, 'players');
    const snapshot = await getDocs(playersCollectionRef);
    const playersList = snapshot.docs.map((doc) => doc.data());

    return playersList;
  };

  getPlayerVehicles = (id: string) => {
    const player = this.getPlayer(id);
    // find all of the vehicles that belong to the player
    const playerVehicles = vehicles.filter((vehicle) => vehicle.playerId === player.id);
    // return all the player's vehicles
    return playerVehicles;
  };

  // This will only return 1 instance of PlayerSettings that matches the player
  // There should be no duplicates
  getPlayerSettings = (id: string) => {
    const player = this.getPlayer(id);
    const playerSettings: PlayerSettings | undefined = settings.find(
      (setting) => setting.playerId === player.id,
    );
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

  updatePlayerVehicle = (id: string, vehicleId: string, update: PlayerVehicleUpdate) => {
    const player = this.getPlayer(id);
    let playerVehicle: PlayerVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId && vehicle.playerId === player.id,
    ) as PlayerVehicle;

    if (playerVehicle) {
      if (update.paintIndex !== undefined) {
        playerVehicle.paintIndex = update.paintIndex;
      }
      if (update.resaleValue !== undefined) {
        playerVehicle.resaleValue = update.resaleValue;
      }
    }

    return playerVehicle;
  };

  updatePlayerSettings = (id: string, update: PlayerSettingsUpdate) => {
    const player = this.getPlayer(id);
    let playerSettings = this.getPlayerSettings(id);

    if (playerSettings !== undefined) {
      if (update.musicOn !== undefined) {
        playerSettings.musicOn = update.musicOn;
      }
      if (update.soundOn !== undefined) {
        playerSettings.soundOn = update.soundOn;
      }
      if (update.removeAds !== undefined) {
        playerSettings.removeAds = update.removeAds;
      }
    }

    return playerSettings;
  };
}

export default PlayersService;

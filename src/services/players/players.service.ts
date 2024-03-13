import {
  Player,
  PlayerSettings,
  PlayerVehicle,
  PlayerVehicleUpdate,
  PlayerSettingsUpdate,
} from '../../types/players.types';

import { database } from '../../clients/firebase.client';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  limit,
  addDoc,
} from 'firebase/firestore';

const vehicles: PlayerVehicle[] = [
  { id: 'v1', name: 'Merope', playerId: 'one', resaleValue: 15000, paintIndex: 0 },
  { id: 'v2', name: 'Gliese-393', playerId: 'one', resaleValue: 12000, paintIndex: 2 },
  { id: 'v3', name: 'Vesta', playerId: 'two', resaleValue: 10000, paintIndex: 3 },
];

// shalin: nchskFoPBYcvKzIz2JpI
// kevin: zPnsbd1TWu0CraQZlCDO

class PlayersService {
  getAllPlayers = async () => {
    const ref = collection(database, 'players');
    const snapshot = await getDocs(ref);
    const playersList = snapshot.docs.map((doc) => doc.data());

    return playersList;
  };

  getPlayer = async (id: string) => {
    const ref = doc(database, 'players', id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error(`Player with id ${id} does not exist`);
    }

    return snapshot.data();
  };

  createPlayer = async (player: Omit<Player, 'id'>) => {
    const ref = collection(database, 'players');
    const newPlayer = await addDoc(ref, player);
    return {
      id: newPlayer.id,
      ...player,
    };
  };

  getPlayerSettings = async (id: string) => {
    const ref = collection(database, 'playerSettings');
    const settingsQuery = query(ref, where('playerId', '==', id), limit(1));
    const snapshot = await getDocs(settingsQuery);

    if (snapshot.empty) {
      throw new Error(`Player settings for player with id "${id}" does not exist`);
    }
    const settings = snapshot.docs[0].data() as PlayerSettings;
    return settings;
  };

  getPlayerVehicles = (id: string) => {
    // const player = this.getPlayer(id);
    // const playerVehicles = vehicles.filter((vehicle) => vehicle.playerId === player.id);
    // return playerVehicles;
  };

  getPlayerData = (id: string) => {
    const player = this.getPlayer(id);
    // const playerVehicles = this.getPlayerVehicles(id);
    const playerSettings = this.getPlayerSettings(id);
    return {
      player,
      // vehicles: playerVehicles,
      settings: playerSettings,
    };
  };

  updatePlayerVehicle = (id: string, vehicleId: string, update: PlayerVehicleUpdate) => {
    // const player = this.getPlayer(id);
    // let playerVehicle: PlayerVehicle = vehicles.find(
    //   (vehicle) => vehicle.id === vehicleId && vehicle.playerId === player.id,
    // ) as PlayerVehicle;
    // if (playerVehicle) {
    //   if (update.paintIndex !== undefined) {
    //     playerVehicle.paintIndex = update.paintIndex;
    //   }
    //   if (update.resaleValue !== undefined) {
    //     playerVehicle.resaleValue = update.resaleValue;
    //   }
    // }
    // return playerVehicle;
  };

  updatePlayerSettings = (id: string, update: PlayerSettingsUpdate) => {
    // const player = this.getPlayer(id);
    // let playerSettings = this.getPlayerSettings(id);
    // if (playerSettings !== undefined) {
    //   if (update.musicOn !== undefined) {
    //     playerSettings.musicOn = update.musicOn;
    //   }
    //   if (update.soundOn !== undefined) {
    //     playerSettings.soundOn = update.soundOn;
    //   }
    //   if (update.removeAds !== undefined) {
    //     playerSettings.removeAds = update.removeAds;
    //   }
    // }
    // return playerSettings;
  };
}

export default PlayersService;

import {
  Player,
  PlayerSettings,
  PlayerVehicleUpdate,
  PlayerSettingsUpdate,
} from '../../types/players.types';

import { VehiclesService } from '../vehicles/vehicles.service';

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

  getPlayerVehicles = async (id: string) => {
    const vehiclesService = new VehiclesService();
    return vehiclesService.getPlayerVehicles(id);
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
    const vehiclesService = new VehiclesService();

    vehiclesService.updatePlayerVehicle(id, vehicleId, update);
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

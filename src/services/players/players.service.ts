import {
  Player,
  PlayerUpdate,
  PlayerVehicleUpdate,
  PlayerCreate,
} from '../../types/players.types';

import { VehiclesService } from '../vehicles/vehicles.service';

import { database } from '../../clients/firebase.client';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// shalin: nchskFoPBYcvKzIz2JpI
// kevin: zPnsbd1TWu0CraQZlCDO

class PlayersService {
  getAllPlayers = async () => {
    const ref = collection(database, 'players');
    const snapshot = await getDocs(ref);
    const playersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Player[];

    return playersList;
  };

  createPlayer = async (playerCreate: PlayerCreate) => {
    const ref = collection(database, 'players');
    const newPlayer = await addDoc(ref, playerCreate);
    const player = {
      id: newPlayer.id,
      ...playerCreate,
    } as Player;
    return player;
  };

  getPlayer = async (id: string) => {
    const ref = doc(database, 'players', id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error(`Player with id ${id} does not exist`);
    }

    const player = {
      id: snapshot.id,
      ...snapshot.data(),
    } as Player;

    return player;
  };

  updatePlayer = async (id: string, playerUpdate: PlayerUpdate) => {
    const ref = doc(database, 'players', id);
    await updateDoc(ref, playerUpdate);
    const player = await this.getPlayer(id);
    return player;
  };

  getPlayerVehicles = async (id: string) => {
    const vehiclesService = new VehiclesService();
    return vehiclesService.getPlayerVehicles(id);
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

  deletePlayer = async (id: string) => {
    const ref = doc(database, 'players', id);
    await deleteDoc(ref);
    return id;
  };
}

export default PlayersService;

// TODO: clean up or re-use

// getPlayerSettings = async (id: string) => {
//   const ref = collection(database, 'playerSettings');
//   const settingsQuery = query(ref, where('playerId', '==', id), limit(1));
//   const snapshot = await getDocs(settingsQuery);

//   if (snapshot.empty) {
//     throw new Error(`Player settings for player with id "${id}" does not exist`);
//   }
//   const settings = snapshot.docs[0].data() as PlayerSettings;
//   return settings;
// };

// const vehicles: PlayerVehicle[] = [
//   { id: 'v1', name: 'Merope', playerId: 'one', resaleValue: 15000, paintIndex: 0 },
//   { id: 'v2', name: 'Gliese-393', playerId: 'one', resaleValue: 12000, paintIndex: 2 },
//   { id: 'v3', name: 'Vesta', playerId: 'two', resaleValue: 10000, paintIndex: 3 },
// ];

// shalin: tYOapjY1fESOY14DHAXg
// kevin: pEj2iLikX8oLaMdrzv0q

import { VehiclesService } from '../vehicles/vehicles.service';
import { Player, PlayerUpdate, PlayerCreate } from '../../types/players.types';
import { PlayerVehicle, PlayerVehicleCreate } from '../../types/vehicles.types';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Firestore,
} from 'firebase/firestore';

class PlayersService {
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  getAll = async () => {
    const ref = collection(this.db, 'players');
    const snapshot = await getDocs(ref);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Player[];

    return list;
  };

  create = async (playerCreate: PlayerCreate) => {
    const ref = collection(this.db, 'players');
    const newPlayer = await addDoc(ref, playerCreate);

    const player = {
      id: newPlayer.id,
      ...playerCreate,
    } as Player;

    return player;
  };

  get = async (id: string) => {
    const ref = doc(this.db, 'players', id);
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

  update = async (id: string, playerUpdate: PlayerUpdate) => {
    const ref = doc(this.db, 'players', id);
    await updateDoc(ref, playerUpdate);
    const player = await this.get(id);
    return player;
  };

  delete = async (id: string) => {
    const ref = doc(this.db, 'players', id);
    await deleteDoc(ref);
    return id;
  };

  addVehicle = async (
    playerId: string,
    vehicleId: string,
    playerVehicleCreate: PlayerVehicleCreate,
  ) => {
    const player = await this.get(playerId);
    player.vehicles = player.vehicles || [];

    const vehiclesService = new VehiclesService(this.db);
    const vehicle = await vehiclesService.get(vehicleId);

    const { resaleValue, paintIndex } = playerVehicleCreate;
    const playerVehicle: PlayerVehicle = {
      ...vehicle,
      resaleValue,
      paintIndex,
    };

    player.vehicles.push(playerVehicle);

    await this.update(playerId, { vehicles: player.vehicles });
  };

  removeVehicle = async (playerId: string, vehicleId: string) => {
    const player = await this.get(playerId);
    player.vehicles = player.vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    await this.update(playerId, { vehicles: player.vehicles });
  };
}

export default PlayersService;

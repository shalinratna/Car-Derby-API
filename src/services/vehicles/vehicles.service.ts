import { Vehicle } from '../../types/vehicles.types';

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
import { debug } from 'console';

// Testing data, do not ship to production
const vehicles: Vehicle[] = [
  {
    id: 'v1',
    playerId: 'one',
    type: 'car',
    name: 'Foo',
    class: 'S1',
    price: 0,
    resaleValue: 15000,
    paintIndex: 0,
  },
  {
    id: 'v2',
    playerId: 'two',
    type: 'car',
    name: 'Camry',
    class: 'S2',
    price: 35,
    resaleValue: 12000,
    paintIndex: 1,
  },
];

export class VehiclesService {
  createPlayerVehicles = async (playerId: string, vehicles: Vehicle[]) => {
    const ref = collection(database, 'vehicles');
    const batch = vehicles.map((vehicle) => {
      return addDoc(ref, vehicle);
    });

    await Promise.all(batch);
  };

  getPlayerVehicles = async (playerId: string) => {
    return vehicles.filter((vehicle) => vehicle.playerId === playerId);
  };

  // Unfinished method, I could use some proper assistance avoiding co-pilot use.
  updatePlayerVehicle = async (playerId: string, vehicleId: string, update: any) => {
    let vehicle = vehicles.find(
      (vehicles) => vehicle.id === vehicleId && vehicle?.playerId === playerId,
    ) as Vehicle;

    if (vehicle) {
      debug('Vehicle found, implement more stuff here');
    }
  };

  deletePlayerVehicle = async (playerId: string, vehicleId: string) => {
    const vehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId && vehicle.playerId === playerId,
    );
    if (!vehicle) {
      throw new Error(
        `Vehicle with id ${vehicleId} does not exist for player with id ${playerId}`,
      );
    }
    vehicles.splice(vehicles.indexOf(vehicle), 1);
  };
}

export default VehiclesService;

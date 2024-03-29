export type VehicleTypeKey = 'car' | 'semi' | 'motorcycle';

export type Vehicle = {
  id: string;
  type: 'car';
  name: string;
  class: string;
  price: number;
};

export type PlayerVehicle = {
  id: string;
  resaleValue: number;
  paintIndex: number;
};

export type ResolvedVehicle = Vehicle & PlayerVehicle;

export interface IVehicleService {
  getPlayerVehicles: (playerId: string) => Promise<Vehicle>;
}

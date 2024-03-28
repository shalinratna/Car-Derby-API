export type VehicleTypeKey = 'car' | 'semi' | 'motorcycle';

export type Vehicle = {
  id: string;
  playerId: string;
  type: 'car';
  name: string;
  class: string;
  price: number;
  resaleValue: number;
  paintIndex: number;
};

export interface IVehicleService {
  getPlayerVehicles: (playerId: string) => Promise<Vehicle>;
}

export type VehicleTypeKey = 'car' | 'semi' | 'motorcycle';

export type Vehicle = {
  id: string;
  type: 'car';
  name: string;
  class: string;
  price: number;
};

export type PlayerVehicle = Vehicle & {
  resaleValue: number;
  paintIndex: number;
};

export type PlayerVehicleCreate = {
  resaleValue: number;
  paintIndex: number;
};

export type PlayerVehicleUpdate = {
  resaleValue?: number;
  paintIndex?: number;
};

import { Vehicle } from './vehicles.types';
export type PlayerSettings = {
  soundOn: boolean;
  musicOn: boolean;
  removeAds: boolean;
};

export type Player = {
  id: string;
  name: string;
  email: string;
  settings: PlayerSettings;
};

export type PlayerCreate = Omit<Player, 'id'>;

export type PlayerUpdate = {
  name?: string;
  email?: string;
  settings?: Partial<PlayerSettings>;
};

export type PlayerData = {
  player: Player;
  vehicles: Vehicle[];
  settings: PlayerSettings;
};

export type PlayerVehicleUpdate = {
  resaleValue?: number;
  paintIndex?: number;
};

export type PlayerVehicle = {
  id: string;
  playerId: string;
  name: string;
  resaleValue: number;
  paintIndex: number;
};

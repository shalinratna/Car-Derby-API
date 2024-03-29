import { ResolvedVehicle } from './vehicles.types';

export type PlayerSettings = {
  soundOn: boolean;
  musicOn: boolean;
  removeAds: boolean;
};

export type Player = {
  id: string;
  name: string;
  email: string;
  vehicles: ResolvedVehicle[];
  settings: PlayerSettings;
};

export type PlayerCreate = Omit<Player, 'id'>;

export type PlayerUpdate = {
  name?: string;
  email?: string;
  settings?: Partial<PlayerSettings>;
};

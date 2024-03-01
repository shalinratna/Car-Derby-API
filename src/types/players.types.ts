export type Player = {
  id: string;
  name: string;
};

export type PlayerVehicle = {
  id: string;
  playerId: string;
  name: string;
  resaleValue: number;
  paintIndex: number;
};

export type PlayerSettings = {
  playerId: string;
  soundOn: boolean;
  musicOn: boolean;
  removeAds: boolean;
};

export type PlayerData = {
  player: Player;
  vehicles: PlayerVehicle[];
  settings: PlayerSettings;
};

export type PlayerVehicleUpdate = {
  resaleValue?: number;
  paintIndex?: number;
};

export type PlayerSettingsUpdate = {
  soundOn?: boolean;
  musicOn?: boolean;
  removeAds?: boolean;
};

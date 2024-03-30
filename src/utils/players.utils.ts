import { PlayerCreate, PlayerUpdate } from '../types/players.types';
import { PlayerVehicleCreate } from '../types/vehicles.types';
import {
  isDefined,
  isBoolean,
  isString,
  isValidEmail,
  isNumber,
} from './validation.utils';

export function validatePlayerCreate(player: any): PlayerCreate {
  if (!isString(player.name)) {
    throw new Error('Player name is missing');
  }

  if (!isValidEmail(player.email)) {
    throw new Error('Player email is missing or invalid');
  }

  if (!isBoolean(player.settings?.soundOn)) {
    throw new Error('Invalid soundOn setting');
  }

  if (!isBoolean(player.settings?.musicOn)) {
    throw new Error('Invalid musicOn setting');
  }

  if (!isBoolean(player.settings?.removeAds)) {
    throw new Error('Invalid removeAds setting');
  }

  return player as PlayerCreate;
}

export function validatePlayerUpdate(player: any): PlayerUpdate {
  if (isDefined(player.name) && !isString(player.name)) {
    throw new Error('Player name is missing');
  }

  if (isDefined(player.email) && !isValidEmail(player.email)) {
    throw new Error('Player email is missing or invalid');
  }

  if (isDefined(player.settings?.soundOn) && !isBoolean(player.settings?.soundOn)) {
    throw new Error('Invalid soundOn setting');
  }

  if (isDefined(player.settings?.musicOn) && !isBoolean(player.settings?.musicOn)) {
    throw new Error('Invalid musicOn setting');
  }

  if (isDefined(player.settings?.removeAds) && !isBoolean(player.settings?.removeAds)) {
    throw new Error('Invalid removeAds setting');
  }

  return player as PlayerUpdate;
}

export function validatePlayerVehicleCreate(playerVehicle: any): PlayerVehicleCreate {
  if (!isNumber(playerVehicle.resaleValue)) {
    throw new Error('Player vehicle resaleValue is missing or invalid');
  }

  if (!isNumber(playerVehicle.paintIndex)) {
    throw new Error('Player vehicle paintIndex is missing or invalid');
  }

  return playerVehicle;
}

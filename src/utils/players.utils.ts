import { PlayerCreate, PlayerUpdate } from '../types/players.types';
import { isDefined, isBoolean, isString, isValidateEmail } from './validation.utils';

export function validatePlayerCreate(player: PlayerCreate) {
  if (!isString(player.name)) {
    throw new Error('Player name is missing');
  }

  if (!isValidateEmail(player.email)) {
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

  return player;
}

export function validatePlayerUpdate(player: PlayerUpdate) {
  if (isDefined(player.name) && !isString(player.name)) {
    throw new Error('Player name is missing');
  }

  if (isDefined(player.email) && !isValidateEmail(player.email)) {
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

  return player;
}

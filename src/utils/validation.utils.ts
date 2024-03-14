export function isDefined(value: any) {
  return value !== undefined;
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isValidateEmail(email: any) {
  if (!isString(email)) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

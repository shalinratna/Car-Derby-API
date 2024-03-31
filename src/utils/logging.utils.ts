export function getAsciiLogo() {
  const logo = [
    '\n',
    '    ______              ____            __         ',
    '   / ____/___ ______   / __ \\___  _____/ /_  __  __',
    '  / /   / __ `/ ___/  / / / / _ \\/ ___/ __ \\/ / / /',
    ' / /___/ /_/ / /     / /_/ /  __/ /  / /_/ / /_/ / ',
    ' \\____/\\__,_/_/     /_____/\\___/_/  /_.___/\\__, /  ',
    '                                          /____/   ',
    '\n',
  ].join('\n');

  return logo;
}

export function getServiceMessage(service: string) {
  return `  ✅ Service instantiated => "${service}"`;
}

export function cdn<S extends string>(s: S) {
  return `https://cdn.discordapp.com${s}`;
}

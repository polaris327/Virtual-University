export default function (state, key) {
  return (typeof state[key] === 'object' && state[key].loaded === true);
}

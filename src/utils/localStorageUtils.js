export function load(key, defaultValue) {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : defaultValue;
}
export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

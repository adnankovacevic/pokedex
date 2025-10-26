export const API_BASE = "https://pokeapi.co/api/v2";

export const POKEMON_LIST = `${API_BASE}/pokemon`;
export const POKEMON_DETAILS = (name: string) => `${API_BASE}/pokemon/${name}`;

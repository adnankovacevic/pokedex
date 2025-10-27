import { api } from "./api";

export async function fetchPokemonList(url: string) {
    const res = await fetch(url);
    return res.json();
}

export async function fetchPokemonDetails(name: string) {
    const res = await api.get(`/pokemon/${name}`);
    return res.data;
}

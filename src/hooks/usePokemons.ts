import { useInfiniteQuery } from "@tanstack/react-query";
import { POKEMON_LIST } from "../constants/urls";
import { fetchPokemonList } from "../services/pokemon.service";

export function usePokemons() {
    return useInfiniteQuery({
        queryKey: ["pokemons"],
        queryFn: ({ pageParam = `${POKEMON_LIST}?limit=20` }) =>
            fetchPokemonList(pageParam as string),
        getNextPageParam: (lastPage: { next?: string | null }) => lastPage.next || null,
        initialPageParam: `${POKEMON_LIST}?limit=20`,
    });
}

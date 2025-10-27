import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../services/pokemon.service";

export function usePokemonDetails(name: string) {
    return useQuery({
        queryKey: ["pokemon-details", name],
        queryFn: () => fetchPokemonDetails(name),
    });
}

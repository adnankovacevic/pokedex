import PokemonCard from "@/src/components/PokemonCard";
import { usePokemons } from "@/src/hooks/usePokemons";
import { POKEMON_COLORS } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function Home() {
    const router = useRouter();
    const { data, fetchNextPage, isFetchingNextPage, refetch, isRefetching } = usePokemons();

    const pokemons = data?.pages.flatMap((page: any) =>
        (page.results ?? []).map((poke: any) => ({
            name: poke.name,
            url: poke.url,
        }))
    ) ?? [];

    return (
        <FlatList
            data={pokemons}
            keyExtractor={(item) => item.name}
            numColumns={2}
            onEndReached={() => fetchNextPage()}
            contentContainerStyle={styles.gridContainer}
            refreshing={isRefetching}
            onRefresh={refetch}
            renderItem={({ item, index }) => (
                <PokemonCard
                    name={item.name}
                    image={item.image}
                    color={POKEMON_COLORS[index % POKEMON_COLORS.length]}
                    onPress={() =>
                        router.push(`/details/${item.name}?color=${POKEMON_COLORS[index % POKEMON_COLORS.length]}`)
                    }
                />
            )}
        />
    );
}


const styles = StyleSheet.create({
    gridContainer: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        justifyContent: "center",
    },
});

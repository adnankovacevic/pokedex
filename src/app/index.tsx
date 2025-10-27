import PokemonCard from "@/src/components/PokemonCard";
import { POKEMON_COLORS } from "@/src/constants/colors";
import { POKEMON_LIST } from "@/src/constants/urls";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Pokemon } from "../models/Pokemon";

export default function Index() {
  const router = useRouter();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(`${POKEMON_LIST}?limit=20`);

  useEffect(() => {
    loadMorePokemons();
  }, []);

  const loadMorePokemons = useCallback(async () => {
    if (!nextUrl) return;

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      setNextUrl(data.next);

      const newPokemons: Pokemon[] = await Promise.all(
        data.results.map(async (poke: { name: string; url: string; }) => {
          const res = await fetch(poke.url);
          const details = await res.json();
          return {
            name: poke.name,
            url: poke.url,
            image: details.sprites.front_default || null,
          };
        })
      );

      setPokemons(prev => [...prev, ...newPokemons]);
    } catch (error) {
      console.error(error);
    }
  }, [nextUrl]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    setNextUrl(`${POKEMON_LIST}?limit=20`);
    setPokemons([]);

    try {
      const response = await fetch(`${POKEMON_LIST}?limit=20`);
      const data = await response.json();
      setNextUrl(data.next);

      const freshPokemons = await Promise.all(
        data.results.map(async (poke: { name: string; url: string }) => {
          const res = await fetch(poke.url);
          const details = await res.json();
          return {
            name: poke.name,
            url: poke.url,
            image: details.sprites.front_default || null,
          };
        })
      );

      setPokemons(freshPokemons);
    } catch (e) {
      console.log(e);
    }

    setRefreshing(false);
  }, []);


  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      onEndReached={loadMorePokemons}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item, index }) => (
        <PokemonCard
          name={item.name}
          image={item.image}
          color={POKEMON_COLORS[index % POKEMON_COLORS.length]}
          onPress={() =>
            router.push({
              pathname: "/details/[name]",
              params: { name: item.name, color: POKEMON_COLORS[index % POKEMON_COLORS.length] },
            })
          }
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    justifyContent: "center",
  },
});

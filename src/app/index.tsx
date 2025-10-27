import PokemonCard from "@/src/components/PokemonCard";
import { POKEMON_COLORS } from "@/src/constants/colors";
import { POKEMON_LIST } from "@/src/constants/urls";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Pokemon } from "../models/Pokemon";

export default function Index() {
  const router = useRouter();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);


  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons(limit = 20) {
    try {
      const response = await fetch(`${POKEMON_LIST}?limit=${limit}`);
      const data = await response.json();

      const pokemonList: Pokemon[] = await Promise.all(
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

      setPokemons(pokemonList);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            image={pokemon.image}
            color={POKEMON_COLORS[index % POKEMON_COLORS.length]}
            onPress={() =>
              router.push({
                pathname: "/details/[name]",
                params: { name: pokemon.name, color: POKEMON_COLORS[index % POKEMON_COLORS.length] },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
});

import { POKEMON_DETAILS } from "@/src/constants/urls";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const TABS = ["About", "Base Stats", "Evolutions", "Moves"] as const;

export default function Details() {
    const { name, color } = useLocalSearchParams<{
        name: string;
        color?: string;
    }>();
    const [pokemon, setPokemon] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<typeof TABS[number]>("About");
    const [isFavorite, setIsFavorite] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    useEffect(() => {
        fetchDetails();
    }, []);

    async function fetchDetails() {
        const response = await fetch(POKEMON_DETAILS(name!));
        const data = await response.json();
        setPokemon(data);
    }

    if (!pokemon) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.body}>

            <View style={styles.appBar}>
                <Pressable onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </Pressable>

                <Text style={styles.appBarTitle}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Text>

                <Pressable onPress={() => setIsFavorite(!isFavorite)}>
                    <FontAwesome
                        name={isFavorite ? "heart" : "heart-o"}
                        size={24}
                        color={isFavorite ? "#ff3562" : "#fff"}
                    />
                </Pressable>
            </View>

            <View style={[styles.header, { backgroundColor: color || "#CBC3E3" }]}>
                <Image
                    source={{ uri: pokemon.sprites.front_default }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.tabRow}>
                {TABS.map((tab) => (
                    <Pressable key={tab} onPress={() => setActiveTab(tab)}>
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>
                            {tab}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.contentWrapper}>
                <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                    {activeTab === "About" && (
                        <>
                            <Text style={styles.subtitle}>Abilities</Text>
                            {pokemon.abilities.map((a: any, index: number) => (
                                <Text key={index} style={styles.text}>
                                    • {a.ability.name}
                                </Text>
                            ))}
                        </>
                    )}

                    {activeTab === "Base Stats" &&
                        pokemon.stats.map((s: any, i: number) => (
                            <Text key={i} style={styles.text}>
                                {s.stat.name}: {s.base_stat}
                            </Text>
                        ))}

                    {activeTab === "Evolutions" && (
                        <Text style={styles.text}>Coming soon… 🧬</Text>
                    )}

                    {activeTab === "Moves" &&
                        pokemon.moves.slice(0, 20).map((m: any, index: number) => (
                            <Text key={index} style={styles.text}>
                                • {m.move.name}
                            </Text>
                        ))}
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    body: { flex: 1, backgroundColor: "#f5f5f5" },
    appBar: {
        position: "absolute",
        top: 70,
        left: 20,
        right: 20,
        zIndex: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    appBarTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { alignItems: "center", paddingTop: 100, paddingBottom: 10 },
    image: { width: 300, height: 300, borderRadius: 150 },
    tabRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    tabText: {
        fontSize: 16,
        opacity: 0.6,
        textTransform: "capitalize",
    },
    activeTab: {
        fontWeight: "bold",
        opacity: 1,
        borderBottomWidth: 2,
        borderColor: "#333",
        paddingBottom: 4,
    },
    contentWrapper: {
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 15,
        overflow: "hidden",
        clip: "rect(0, auto, auto, 0)",
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        textTransform: "capitalize",
    },
    text: {
        fontSize: 18,
        textTransform: "capitalize",
        marginVertical: 4,
    },
});

import { Image, Pressable, StyleSheet, Text } from "react-native";

export default function PokemonCard({ name, image, onPress, color }: any) {
    return (
        <Pressable style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "45%",
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 6,
    },
    image: { width: 70, height: 70 },
    name: { fontSize: 18, textTransform: "capitalize", marginTop: 8, color: "#fff" },
});

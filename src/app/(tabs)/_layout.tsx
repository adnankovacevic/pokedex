import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabItem icon="home-outline" label="Home" focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabItem icon="settings-outline" label="Settings" focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

function TabItem({ icon, label, focused }: { icon: any; label: string; focused: boolean }) {
    return (
        <View style={[styles.item, focused && styles.itemActive]}>
            <Ionicons name={icon} size={22} color={focused ? "#5A3FFF" : "#666"} />
            <Text style={[styles.label, { color: focused ? "#5A3FFF" : "#666" }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
        borderTopWidth: 0,
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    item: {
        height: 40,
        width: 120,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        paddingHorizontal: 12,
        maxWidth: 120,
    },
    itemActive: {
        backgroundColor: "#E9E2FF",
    },
    label: {
        padding: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#5A3FFF",
    },
});

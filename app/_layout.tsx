import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // headerShown:false,
          title: "Pokadex",
        }}
      />
      <Stack.Screen
        name="details/[name]"
        options={{
          // title: "Details",
        }}
      />
    </Stack>
  );
}

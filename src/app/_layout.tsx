import { ThemeProvider } from "@/src/theme/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

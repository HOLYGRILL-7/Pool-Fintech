import "../../global.css";
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Configure the splash screen with a smooth fade-out transition
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

// Keep the splash screen visible while the layout initialises
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Give the splash screen a short moment to be seen, then fade out
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(member)" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(member)/contribute" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="(admin)/create-group" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="(admin)/group-created" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

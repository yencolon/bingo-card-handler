import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { BingoProvider } from '../state/BingoContext';
import Colors from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <BingoProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: true }} />
          <Stack.Screen name="home" options={{
            headerShown: true,
            headerTitle: 'Bingo',
            headerRight: () => (
              <Link href="/camera" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="camera"
                      size={25}
                      color={Colors[(colorScheme ?? 'light') as keyof typeof Colors].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>)
          }} />
          <Stack.Screen name="camera" options={{
            // presentation: 'modal',
            headerTitle: 'Camera',
            headerShown: true
          }} /> 
        </Stack>
      </BingoProvider>
    </ThemeProvider>
  );
}

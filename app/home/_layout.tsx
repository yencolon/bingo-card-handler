import { Button, StyleSheet, Text, Pressable } from "react-native";
import { View } from "../../components/Themed";
import { Link, Slot, Stack } from "expo-router";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="boxes" options={{ 
                headerShown: true, 
                headerRight: () => (
                    <Link href="/modal" asChild>
                      <Pressable>
                        {({ pressed }) => (
                          <FontAwesome
                            name="info-circle"
                            size={25}
                           // color={Colors[(colorScheme ?? 'light') as keyof typeof Color].text}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                          />
                        )}
                      </Pressable>
                    </Link>)
                }}  />
        </Stack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    link: {
        color: "blue"
    }
})


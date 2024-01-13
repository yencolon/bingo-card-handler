import { Button, StyleSheet, Text, Pressable, useColorScheme } from "react-native";
import { View } from "../../components/Themed";
import { Link, Slot, Stack } from "expo-router";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const unstable_settings = {

  initialRouteName: 'boxes',
};

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function HomeLayout() {
   const colorScheme = useColorScheme();
    return (
        <Slot></Slot>
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


import { Link } from "expo-router";
import { View, Text, StyleSheet} from "react-native";

export default function Boxes(){
    return (
        <View style={styles.container}>
            <Text>Boxes</Text>
            <Link href={"/camera/camera"}>
                <Text>Camera</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around", 
        backgroundColor: "red"
    }
})
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet} from "react-native";

export default function Boxes(){
    const [boxes, setBoxes] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return (
        <View style={styles.container}>
            {
                boxes.map((box, index) => (
                    <Link href={`/box/${box}`} key={index}>
                        <Text>{box}</Text>
                    </Link>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around", 
        backgroundColor: "red"
    }
})
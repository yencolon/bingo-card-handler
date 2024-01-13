import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBingoContext } from "../../state/BingoContext";
import BingoCardComponent from "../../components/card/BingoCardComponent";

export default function Boxes() {
    const [boxes, setBoxes] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const bingoContext = useBingoContext()

    return (
        <View style={styles.container}>
            {
                bingoContext?.state.cards.map((card, index) => {
                    return (
                        <BingoCardComponent key={index} cardSymbols={card.boxes} />
                    )
                })
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
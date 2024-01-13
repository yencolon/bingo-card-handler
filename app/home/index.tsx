import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBingoContext } from "../../state/BingoContext";
import BingoCardComponent from "../../components/card/BingoCardComponent";

export default function Boxes() {
  const [boxes, setBoxes] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const bingoContext = useBingoContext();

  return (
    <View style={styles.homeContainer}>
      {bingoContext?.state.cards.map((card, index) => {
        return (
          <View style={{ width: "50%", height: 250 }}>
            <BingoCardComponent key={index} cardSymbols={card.boxes} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: "row",
  }
});

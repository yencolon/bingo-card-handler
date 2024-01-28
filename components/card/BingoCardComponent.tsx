import { StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import hasBingo from "../../utils/bingoChecker";
import { useBingoContext } from "../../state/BingoContext";

export type BingoCardComponentProps = {
  card: BingoCard;
};

export default function BingoCardComponent(props: BingoCardComponentProps) {
  console.log("BingoCardComponent");

  const matrixJSX = props.card.boxes.map((box, index) => (
    <View
      key={box.description}
      style={box.checked ? styles.bingoBoxChecked : styles.bingoBox}
    >
      <Text>{box.description}</Text>
    </View>
  ));

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <View>
        <Text>Bingo</Text>
      </View>
      <View
        style={
          props.card.isBingo
            ? styles.BingoCardContainerHighlighted
            : styles.bingoCardContainer
        }
      >
        {matrixJSX}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bingoCardContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    width: "auto",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
  },
  BingoCardContainerHighlighted: {
    flex: 1,
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    width: "auto",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "green",
  },
  bingoBox: {
    width: "20%",
    height: "20%",
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bingoBoxChecked: {
    width: "20%",
    height: "20%",
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});

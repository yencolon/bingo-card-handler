import { StyleSheet } from "react-native";
import { View, Text } from "../Themed";

export type BingoCardComponentProps = {
  cardSymbols: TextAnnotation[];
};

export default function BingoCardComponent(props: BingoCardComponentProps) {
  const matrixJSX = props.cardSymbols.map((obj, index) => (
    <View key={index} style={styles.bingoBox}>
      <Text>{obj.description}</Text>
    </View>
  ));

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 5}}>
      <View>
        <Text>Bingo</Text>
      </View>
      <View style={styles.bingoCardContainer}>{matrixJSX}</View>
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
  bingoBox: {
    width: "20%",
    height: "20%",
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

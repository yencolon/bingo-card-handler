import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useBingoContext } from "../../state/BingoContext";
import BingoCardComponent from "../../components/card/BingoCardComponent";
import { ScrollView } from "react-native-gesture-handler";

export default function Boxes() {
  const [numberToAdd, setNumber] = useState<string>("");
  const { state, dispatch } = useBingoContext();
  const numbersAdded = state.numbers;

  function addNumber() {
    console.log("addNumber" + numberToAdd);
    if (numberToAdd === "") {
      return;
    }
    dispatch({
      type: "ADD_NUMBER",
      payload: {
        numberToAdd: parseInt(numberToAdd),
      },
    });

    let found = false;
    state.cards.forEach((card) => {
      card.boxes.forEach((box) => {
        if (box.description === numberToAdd) {
          dispatch({
            type: "UPDATE_BOX",
            payload: {
              cardId: card.id,
              box: box,
            },
          });
          found = true;
          return true;
        }
      });
    });

    dispatch({
      type: "UPDATE_NUMBER",
      payload: {
        number: parseInt(numberToAdd),
        found: found,
      },
    });

    setNumber("");
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <View style={styles.inner}>
          <View style={styles.bingoNumbersContainer}>
            <Text>Bingo</Text>
            <ScrollView horizontal>
              <View style={styles.bingoNumbersList}>
                {numbersAdded?.map((numberAdded, index) => {
                  return (
                    <Text
                      key={index}
                      style={
                        numberAdded.found
                          ? styles.numberFoundText
                          : styles.numberText
                      }
                    >
                      {numberAdded.value}
                    </Text>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <ScrollView>
            <View style={styles.homeContainer}>
              {state.cards.map((card, index) => {
                return (
                  <View key={card.id} style={styles.bingoCardContainer}>
                    <BingoCardComponent key={index} cardSymbols={card.boxes} />
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.inputContainer}>
            <Text>Enter a number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNumber(text)}
              value={numberToAdd}
              keyboardType="numeric"
            />
            <Button title="Add" onPress={() => addNumber()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inner: {
    paddingBottom: 100,
    flex: 1,
    justifyContent: "space-around",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  bingoCardContainer: { width: "50%", height: 250 },
  bingoNumbersContainer: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    maxHeight: 100,
  },
  bingoNumbersList: { backgroundColor: "white", flexDirection: "row-reverse" },
  numberText: {
    padding: 5,
    borderWidth: 1,
    minWidth: 30,
    maxWidth: 30,
    textAlign: "center",
  },
  numberFoundText: {
    padding: 5,
    borderWidth: 1,
    minWidth: 30,
    maxWidth: 30,
    textAlign: "center",
    backgroundColor: "green",
  },
});

import { Link } from "expo-router";
import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";

export default function CameraLayout() {
  return (
    <View style={styles.container}>
      <Link href="/home" style={styles.link}>
        <Text style={styles.linkText}>Load New Bingo Card</Text>
      </Link>
      <Link href="/modal" style={styles.link}>
        <Text style={styles.linkText}>See bingo history Card</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

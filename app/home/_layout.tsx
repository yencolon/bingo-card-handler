import { Slot } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const unstable_settings = {
  initialRouteName: "boxes",
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function HomeLayout() {
  return <Slot></Slot>;
}

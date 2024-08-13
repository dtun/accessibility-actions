import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";

export function ItemSeparatorComponent() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );
}

let styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 1,
    alignSelf: "center",
    width: "96%",
  },
  separator: {
    width: "100%",
    height: 1,
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
  },
});

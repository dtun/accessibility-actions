import { Link } from "expo-router";
import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "@/components/Themed";
import { ItemSeparator } from "@/components/ItemSeparator";
import { MyMenuViewItem } from "@/components/MyMenuViewItem";

import type { MenuItem } from "@/types";

export function MyMenuView({ menuData }: { menuData: MenuItem[] }) {
  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={menuData}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <MyMenuViewItem item={item} menuData={menuData} />
      )}
      style={styles.list}
    />
  );
}

function ListHeaderComponent() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Music</Text>
      <Link href="/edit">
        <Text>Edit</Text>
      </Link>
    </View>
  );
}

function ListFooterComponent() {
  return <View style={styles.footer}></View>;
}

let styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    minWidth: "100%",
    paddingTop: 20,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android
  },
  listContent: {
    width: "100%",
  },
  footer: {
    backgroundColor: "transparent",
    height: 40,
  },
});

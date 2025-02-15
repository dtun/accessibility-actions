import { Link } from "expo-router";
import { StyleSheet, FlatList } from "react-native";

import { getItemData } from "@/utils";
import { Text, View } from "@/components/Themed";
import { ItemSeparator } from "@/components/ItemSeparator";
import { MyMenuViewItem } from "@/components/MyMenuViewItem";

import type { MenuItem } from "@/types";

export function MyMenuView({
  headerTitle,
  menuData,
}: {
  headerTitle: string;
  menuData: MenuItem[];
}) {
  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={menuData}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={<View style={styles.footer} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Link href="/edit">
            <Text>Edit</Text>
          </Link>
        </View>
      }
      renderItem={({ item }) => (
        <MyMenuViewItem item={item} meta={getItemData(item.id, menuData)} />
      )}
      style={styles.list}
    />
  );
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

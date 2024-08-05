import { Link } from "expo-router";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";

import { getItemData } from "@/utils";
import { Text, View, Icon } from "@/components/Themed";

import type { MenuItem } from "@/types";

export function MyMenuView({ menuData }: { menuData: MenuItem[] }) {
  let renderItem: ListRenderItem<MenuItem> = ({
    item: { icon, id, title },
  }) => {
    let { isFirst, isLast } = getItemData(id, menuData);

    return (
      <View
        accessible
        accessibilityLabel={title}
        style={[
          styles.listItem,
          isFirst && styles.listItemTop,
          isLast && styles.listItemBottom,
        ]}
      >
        <View style={styles.iconContainer}>
          <Icon name={icon} style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={menuData}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
      style={styles.list}
    />
  );
}

function ItemSeparatorComponent() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
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
  title: {
    fontSize: 20,
    flexGrow: 1,
  },
  listContent: {
    width: "100%",
  },
  icon: {
    padding: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    width: "96%",
    alignSelf: "center",
    height: 48,
    padding: 4,
  },
  listItemTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listItemBottom: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
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
  footer: {
    backgroundColor: "transparent",
    height: 40,
  },
});

import { StyleSheet } from "react-native";

import { Text, View, Icon } from "@/components/Themed";

import type { MenuItemMeta, MenuItem } from "@/types";

export function MyMenuViewItem({
  item: { icon, title },
  meta: { isFirst, isLast },
}: {
  item: MenuItem;
  meta: MenuItemMeta;
}) {
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
}

let styles = StyleSheet.create({
  title: {
    fontSize: 20,
    flexGrow: 1,
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
});

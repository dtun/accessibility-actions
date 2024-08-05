import { StyleSheet } from "react-native";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";

import { red } from "@/constants";
import { getItemData } from "@/utils";
import { Text, Icon, View, Pressable } from "@/components/Themed";

import type { MenuItem, MenuData } from "@/types";

export function MyMenuEdit({
  menuData,
  moveMenuItem,
  setMenuData,
  toggleMenuItem,
}: {
  menuData: MenuData;
  moveMenuItem: (id: string, direction: "up" | "down") => void;
  setMenuData: (data: MenuData) => void;
  toggleMenuItem: (id: string) => void;
}) {
  let renderItem: RenderItem<MenuItem> = ({
    drag: onLongPress,
    isActive,
    item: { icon, id, checked, title },
  }) => {
    let { isFirst, isLast } = getItemData(id, menuData);

    return (
      <Pressable
        accessible
        accessibilityActions={[
          { name: "activate", label: "Toggle checked state" },
          { name: "moveUp", label: "Move item up" },
          { name: "moveDown", label: "Move item down" },
        ]}
        accessibilityHint="Double tap to toggle, swipe up or down for more actions"
        accessibilityLabel={title}
        accessibilityState={{ checked }}
        onAccessibilityAction={({ nativeEvent: { actionName } }) => {
          switch (actionName) {
            case "activate":
              toggleMenuItem(id);
              break;
            case "moveUp":
              moveMenuItem(id, "up");
              break;
            case "moveDown":
              moveMenuItem(id, "down");
              break;
          }
        }}
        onLongPress={onLongPress}
        onPress={() => toggleMenuItem(id)}
        style={[
          styles.listItem,
          isFirst && styles.listItemTop,
          isLast && styles.listItemBottom,
          isActive && styles.listItemActive,
        ]}
      >
        <View style={styles.iconContainer}>
          <Icon
            color={red}
            name={checked ? "radio-button-on" : "radio-button-off"}
            style={styles.iconRadio}
          />
          <Icon name={icon} style={styles.icon} />
        </View>
        <Text accessible={false} style={styles.title}>
          {title}
        </Text>
        <Icon color={red} name="menu" style={styles.iconRadio} />
      </Pressable>
    );
  };

  return (
    <DraggableFlatList
      contentContainerStyle={styles.listContent}
      data={menuData}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={({ id }) => id}
      onDragEnd={({ data }) => setMenuData(data)}
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

let styles = StyleSheet.create({
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
  iconRadio: {
    padding: 8,
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    width: "96%",
    alignSelf: "center",
    height: 48,
    padding: 4,
  },
  listItemActive: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
});

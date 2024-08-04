import { StyleSheet } from "react-native";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";

import { red } from "@/constants";
import { getItemData } from "@/utils";
import { Text, Icon, View, Pressable } from "@/components/Themed";

import type { MenuItem, MenuData } from "@/types";

export function MyMenuEdit({
  menuData,
  setMenuData,
  toggleMenuItem,
}: {
  menuData: MenuData;
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
        accessibilityLabel={title}
        accessibilityState={{ checked }}
        onLongPress={onLongPress}
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
            onPress={() => toggleMenuItem(id)}
            style={styles.iconRadio}
          />
          <Icon name={icon} style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
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
    padding: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconRadio: {
    padding: 16,
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    width: "96%",
    alignSelf: "center",
    height: 64,
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
    width: "80%",
    height: 1,
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
  },
});

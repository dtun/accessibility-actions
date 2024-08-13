import { StyleSheet } from "react-native";
import DraggableFlatList, {
  ShadowDecorator,
} from "react-native-draggable-flatlist";

import { red } from "@/constants";
import { useEvent } from "@/hooks";
import { getItemData } from "@/utils";
import { Text, Icon, View, Pressable } from "@/components/Themed";
import { ItemSeparator } from "@/components/ItemSeparator";

import type { AccessibilityActionEvent } from "react-native";
import type { RenderItemParams } from "react-native-draggable-flatlist";
import type { Direction, MenuItem, MenuData, Position } from "@/types";

let toggleAction = { name: "activate", label: "Toggle checked state" };
let upAction = { name: "up", label: "Move item up" };
let downAction = { name: "down", label: "Move item down" };
let topAction = { name: "top", label: "Move item to top" };
let bottomAction = { name: "bottom", label: "Move item to bottom" };

export function MyMenuEdit({
  menuData,
  moveMenuItem,
  setMenuData,
  toggleMenuItem,
}: {
  menuData: MenuData;
  moveMenuItem: (id: string, direction: Direction | Position) => void;
  setMenuData: (data: MenuData) => void;
  toggleMenuItem: (id: string) => void;
}) {
  return (
    <DraggableFlatList
      contentContainerStyle={styles.listContent}
      data={menuData}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      onDragEnd={({ data }) => setMenuData(data)}
      renderItem={(params) => (
        <ShadowDecorator>
          <RenderMenuItem
            {...params}
            menuData={menuData}
            moveMenuItem={moveMenuItem}
            toggleMenuItem={toggleMenuItem}
          />
        </ShadowDecorator>
      )}
      style={styles.list}
    />
  );
}

function RenderMenuItem({
  drag: onLongPress,
  item: { icon, id, checked, title },
  menuData,
  toggleMenuItem,
  moveMenuItem,
}: RenderItemParams<MenuItem> & {
  menuData: MenuData;
  toggleMenuItem: (id: string) => void;
  moveMenuItem: (id: string, direction: Direction | Position) => void;
}) {
  let { isFirst, isLast } = getItemData(id, menuData);
  let onAccessibilityAction = useOnAccessibilityAction({
    id,
    moveMenuItem,
    toggleMenuItem,
  });

  return (
    <Pressable
      accessible
      accessibilityActions={[
        toggleAction,
        upAction,
        downAction,
        topAction,
        bottomAction,
      ]}
      accessibilityHint="Double tap to toggle, swipe up or down for more actions"
      accessibilityLabel={title}
      accessibilityState={{ checked }}
      onAccessibilityAction={onAccessibilityAction}
      onLongPress={onLongPress}
      onPress={() => toggleMenuItem(id)}
      style={[
        styles.listItem,
        isFirst && styles.listItemTop,
        isLast && styles.listItemBottom,
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
}

function useOnAccessibilityAction({
  id,
  moveMenuItem,
  toggleMenuItem,
}: {
  id: string;
  moveMenuItem: (id: string, direction: Direction | Position) => void;
  toggleMenuItem: (id: string) => void;
}) {
  return useEvent(function (e: AccessibilityActionEvent) {
    let actionName = e.nativeEvent.actionName;

    switch (actionName) {
      case toggleAction.name:
        toggleMenuItem(id);
        break;
      case upAction.name:
        moveMenuItem(id, "up");
        break;
      case downAction.name:
        moveMenuItem(id, "down");
        break;
      case topAction.name:
        moveMenuItem(id, "top");
        break;
      case bottomAction.name:
        moveMenuItem(id, "bottom");
        break;
    }
  });
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
  listItemTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listItemBottom: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

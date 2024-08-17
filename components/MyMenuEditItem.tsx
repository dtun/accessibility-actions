import { StyleSheet } from "react-native";

import { red } from "@/constants";
import { useEvent } from "@/hooks";
import { Text, Icon, View, Pressable } from "@/components/Themed";

import type { AccessibilityActionEvent } from "react-native";
import type { RenderItemParams } from "react-native-draggable-flatlist";
import type { MenuItem, MenuItemMeta, Operation } from "@/types";

let toggleAction = { name: "activate", label: "Toggle checked state" };
let upAction = { name: "up", label: "Move item up" };
let downAction = { name: "down", label: "Move item down" };
let topAction = { name: "top", label: "Move item to top" };
let bottomAction = { name: "bottom", label: "Move item to bottom" };

export function MyMenuEditItem({
  drag: onLongPress,
  item: { icon, id, checked, title },
  meta: { isFirst, isLast },
  setMenuItem,
}: RenderItemParams<MenuItem> & {
  meta: MenuItemMeta;
  setMenuItem: (id: string, operation: Operation) => void;
}) {
  let onAccessibilityAction = useOnAccessibilityAction({
    id,
    setMenuItem,
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
      onPress={() => setMenuItem(id, "toggle")}
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
  setMenuItem,
}: {
  id: string;
  setMenuItem: (id: string, operation: Operation) => void;
}) {
  return useEvent(function (e: AccessibilityActionEvent) {
    let actionName = e.nativeEvent.actionName;

    switch (actionName) {
      case toggleAction.name:
        setMenuItem(id, "toggle");
        break;
      case upAction.name:
        setMenuItem(id, "up");
        break;
      case downAction.name:
        setMenuItem(id, "down");
        break;
      case topAction.name:
        setMenuItem(id, "top");
        break;
      case bottomAction.name:
        setMenuItem(id, "bottom");
        break;
    }
  });
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

import { StyleSheet } from "react-native";
import DraggableFlatList, {
  ShadowDecorator,
} from "react-native-draggable-flatlist";

import { getItemData } from "@/utils";
import { ItemSeparator } from "@/components/ItemSeparator";
import { MyMenuEditItem } from "@/components/MyMenuEditItem";

import type { Direction, MenuData, Position } from "@/types";

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
          <MyMenuEditItem
            {...params}
            meta={getItemData(params.item.id, menuData)}
            moveMenuItem={moveMenuItem}
            toggleMenuItem={toggleMenuItem}
          />
        </ShadowDecorator>
      )}
      style={styles.list}
    />
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
  listContent: {
    width: "100%",
  },
});

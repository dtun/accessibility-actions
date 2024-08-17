import { StyleSheet } from "react-native";
import DraggableFlatList, {
  ShadowDecorator,
} from "react-native-draggable-flatlist";

import { getItemData } from "@/utils";
import { ItemSeparator } from "@/components/ItemSeparator";
import { MyMenuEditItem } from "@/components/MyMenuEditItem";

import type { MenuData, Operation } from "@/types";

export function MyMenuEdit({
  menuData,
  setMenuData,
  setMenuItem,
}: {
  menuData: MenuData;

  setMenuData: (data: MenuData) => void;
  setMenuItem: (id: string, operation: Operation) => void;
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
            setMenuItem={setMenuItem}
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

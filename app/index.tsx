import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Controls } from "@/components/Controls";
import { useData, useSharedValues } from "@/hooks";
import { ListContainer } from "@/components/Themed";
import { MyMenuView } from "@/components/MyMenuView";

function Main() {
  let { viewData: menuData } = useData();
  let { top, bottom } = useSafeAreaInsets();
  let { ...sharedValues } = useSharedValues();

  return (
    <ListContainer
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <MyMenuView menuData={menuData} />
      <Controls {...sharedValues} />
    </ListContainer>
  );
}

export default Main;

let styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Controls } from "@/components/Controls";
import { useData, usePlayingState } from "@/hooks";
import { ListContainer } from "@/components/Themed";
import { MyMenuView } from "@/components/MyMenuView";

function Main() {
  let { data: menuData } = useData();
  let { top, bottom } = useSafeAreaInsets();
  let { level, playing, setLevel, togglePlaying } = usePlayingState();

  return (
    <ListContainer
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <MyMenuView menuData={menuData.filter((i) => i.checked)} />
      <Controls
        level={level}
        playing={playing}
        setLevel={setLevel}
        togglePlaying={togglePlaying}
      />
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

import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { Platform, StyleSheet } from "react-native";

import { useData } from "@/hooks";
import { MyMenuEdit } from "@/components/MyMenuEdit";
import { Text, ListContainer } from "@/components/Themed";

function Edit() {
  let { setOptions, goBack } = useNavigation();
  let { data: menuData, setMenuData, toggleMenuItem, saveMenuData } = useData();

  useEffect(
    function () {
      setOptions({
        headerRight: () => (
          <Text onPress={() => saveMenuData().then(goBack)}>Done</Text>
        ),
      });
    },
    [saveMenuData]
  );

  return (
    <>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ListContainer style={styles.container}>
        <MyMenuEdit
          menuData={menuData}
          setMenuData={setMenuData}
          toggleMenuItem={toggleMenuItem}
        />
      </ListContainer>
    </>
  );
}

export default Edit;

let styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

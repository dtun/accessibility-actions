import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, useNavigation } from "expo-router";
import { Platform, StyleSheet } from "react-native";

import { useData } from "@/hooks";
import { MyMenuEdit } from "@/components/MyMenuEdit";
import { ListContainer, Text } from "@/components/Themed";

function Edit() {
  let { setOptions } = useNavigation();
  let { data: menuData, setMenuData, saveMenuData, setMenuItem } = useData();

  useEffect(
    function () {
      setOptions({
        headerRight: () => (
          <Link href="/" onPress={saveMenuData}>
            <Text>Done</Text>
          </Link>
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
          setMenuItem={setMenuItem}
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

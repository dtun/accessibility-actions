import { useCallback, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useFocusEffect } from "expo-router";
import { useSharedValue } from "react-native-reanimated";

import {
  menuDataAtom,
  toggleMenuItemAtom,
  setMenuDataAtom,
  loadDataAtom,
  saveMenuDataAtom,
} from "@/utils";

export function useLoadData() {
  let loadData = useSetAtom(loadDataAtom);

  useFocusEffect(
    useCallback(
      function () {
        loadData();
      },
      [loadData]
    )
  );
}

export function useData() {
  let [data] = useAtom(menuDataAtom);
  let saveMenuData = useSetAtom(saveMenuDataAtom);
  let setMenuData = useSetAtom(setMenuDataAtom);
  let toggleMenuItem = useSetAtom(toggleMenuItemAtom);
  let viewData = data.filter((d) => d.selected);

  useLoadData();

  return { data, setMenuData, toggleMenuItem, saveMenuData, viewData };
}

export function useSharedValues() {
  let [playing, setPlaying] = useState(false);
  let togglePlaying = () => setPlaying((prev) => !prev);
  let min = useSharedValue(0);
  let max = useSharedValue(100);
  let progress = useSharedValue(50);

  return { min, max, progress, playing, togglePlaying };
}

export { useColorScheme } from "react-native";

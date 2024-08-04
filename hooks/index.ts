import { useAtom, useSetAtom } from "jotai";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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

  useLoadData();

  return { data, setMenuData, toggleMenuItem, saveMenuData };
}

export function useSharedValues() {
  let [value, setValue] = useState(50);
  let [playing, setPlaying] = useState(false);
  let min = useSharedValue(0);
  let max = useSharedValue(100);
  let progress = useSharedValue(value);

  let togglePlaying = () => setPlaying((prev) => !prev);

  let updateValue = (newValue: number) => {
    setValue(newValue);
    progress.value = newValue;
  };

  return { min, max, progress, playing, togglePlaying, setValue, updateValue };
}

export { useColorScheme } from "react-native";

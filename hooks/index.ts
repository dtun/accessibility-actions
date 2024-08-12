import { useAtom, useSetAtom } from "jotai";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

import {
  menuDataAtom,
  toggleMenuItemAtom,
  setMenuDataAtom,
  loadDataAtom,
  saveMenuDataAtom,
  moveMenuItemAtom,
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
  let moveMenuItem = useSetAtom(moveMenuItemAtom);

  useLoadData();

  return { data, setMenuData, toggleMenuItem, saveMenuData, moveMenuItem };
}

export function usePlayingState() {
  let [playing, setPlaying] = useState(false);
  let [level, setLevel] = useState(50);

  let togglePlaying = () => setPlaying((prev) => !prev);

  return { level, setLevel, playing, togglePlaying };
}

export function useSliderValues({
  setValue,
  value,
  ...props
}: {
  max: number;
  min: number;
  setValue: (value: number) => void;
  value: number;
}) {
  let min = useSharedValue(props.min);
  let max = useSharedValue(props.max);
  let progress = useSharedValue(value);

  let updateValue = (newValue: number) => {
    if (progress.value === newValue) return; // Values match
    if (newValue < min.value) newValue = min.value; // Out of bounds
    if (newValue > max.value) newValue = max.value; // Out of bounds

    setValue(newValue);
    progress.value = newValue;
  };

  return { max, min, progress, updateValue };
}

export function useEvent<T extends (...args: any[]) => any>(onEvent: T) {
  let onEventRef = useRef<T>(onEvent);

  onEventRef.current = onEvent;

  let staticOnEvent = useCallback((...args: any[]) => {
    let currentOnEvent = onEventRef.current;
    return currentOnEvent(...args);
  }, []);

  return staticOnEvent as T;
}

export { useColorScheme } from "react-native";

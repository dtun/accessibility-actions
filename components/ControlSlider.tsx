import { StyleSheet } from "react-native";
import { Slider } from "react-native-awesome-slider";

import { sliderTheme } from "@/constants";
import { useEvent, useSliderValues } from "@/hooks";
import { Icon, View } from "@/components/Themed";

import type { AccessibilityActionEvent } from "react-native";

let incrementAction = { name: "increment", label: "increment" };
let decrementAction = { name: "decrement", label: "decrement" };

export function ControlSlider({
  max = 100,
  min = 0,
  setValue,
  value,
}: {
  max?: number;
  min?: number;
  setValue: (value: number) => void;
  value: number;
}) {
  let {
    max: maximumValue,
    min: minimumValue,
    progress,
    updateValue,
  } = useSliderValues({
    max,
    min,
    setValue,
    value,
  });
  let onAccessibilityAction = useOnAccessibilityAction({
    updateValue,
    value,
  });

  return (
    <View
      accessible
      accessibilityActions={[incrementAction, decrementAction]}
      accessibilityHint="Swipe up or down to adjust volume"
      accessibilityLabel="Volume"
      accessibilityRole="adjustable"
      accessibilityValue={{ max, min, now: value }}
      onAccessibilityAction={onAccessibilityAction}
      style={styles.volume}
    >
      <Icon name="volume-off" style={styles.iconVolumeLeft} />
      <Slider
        maximumValue={maximumValue}
        minimumValue={minimumValue}
        onSlidingComplete={updateValue}
        progress={progress}
        snapToStep
        style={styles.slider}
        theme={sliderTheme}
      />
      <Icon name="volume-high" style={styles.iconVolumeRight} />
    </View>
  );
}

function useOnAccessibilityAction({
  updateValue,
  value,
}: {
  updateValue: (value: number) => void;
  value: number;
}) {
  return useEvent(function (e: AccessibilityActionEvent) {
    let actionName = e.nativeEvent.actionName;

    switch (actionName) {
      case incrementAction.name:
        updateValue(value + 10);
        break;
      case decrementAction.name:
        updateValue(value - 10);
        break;
      default:
        break;
    }
  });
}

let styles = StyleSheet.create({
  slider: {
    alignSelf: "center",
  },
  volume: {
    flexDirection: "row",
    width: "100%",
  },
  iconVolumeLeft: {
    marginLeft: 8,
    marginRight: 24,
  },
  iconVolumeRight: {
    marginRight: 8,
    marginLeft: 24,
  },
});

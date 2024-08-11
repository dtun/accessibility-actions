import { StyleSheet } from "react-native";
import { Slider } from "react-native-awesome-slider";

import { sliderTheme } from "@/constants";
import { useSliderValues } from "@/hooks";
import { Icon, View } from "@/components/Themed";

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

  return (
    <View
      accessible
      accessibilityActions={[
        { name: "increment", label: "increment" },
        { name: "decrement", label: "decrement" },
      ]}
      accessibilityLabel="Volume"
      accessibilityRole="adjustable"
      accessibilityValue={{
        min,
        max,
        now: value,
      }}
      onAccessibilityAction={({ nativeEvent: { actionName } }) => {
        switch (actionName) {
          case "increment":
            updateValue(value + 10);
            break;
          case "decrement":
            updateValue(value - 10);
            break;
          default:
            break;
        }
      }}
      style={styles.volume}
    >
      <Icon name="volume-off" style={styles.iconVolumeLeft} />
      <Slider
        maximumValue={maximumValue}
        minimumValue={minimumValue}
        onSlidingComplete={updateValue}
        progress={progress}
        renderBubble={() => null}
        snapToStep
        style={styles.slider}
        theme={sliderTheme}
      />
      <Icon name="volume-high" style={styles.iconVolumeRight} />
    </View>
  );
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

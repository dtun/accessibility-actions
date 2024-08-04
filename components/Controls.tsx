import { StyleSheet } from "react-native";
import { Slider } from "react-native-awesome-slider";

import { red, sliderTheme } from "@/constants";
import { Icon, View } from "@/components/Themed";

import type { SharedNumber } from "@/types";

export function Controls({
  min,
  max,
  playing = false,
  progress,
  togglePlaying,
  updateValue,
}: {
  min: SharedNumber;
  max: SharedNumber;
  playing: boolean;
  progress: SharedNumber;
  togglePlaying: () => void;
  updateValue: (value: number) => void;
}) {
  return (
    <View style={styles.container}>
      <View
        accessible
        accessibilityLabel="Volume"
        accessibilityRole="adjustable"
        accessibilityValue={{
          min: min.value,
          max: max.value,
          now: progress.value,
        }}
        style={styles.volume}
      >
        <Icon name="volume-off" style={styles.iconVolumeLeft} />
        <Slider
          minimumValue={min}
          maximumValue={max}
          onSlidingComplete={updateValue}
          progress={progress}
          renderBubble={() => null}
          snapToStep
          style={styles.slider}
          theme={sliderTheme}
        />
        <Icon name="volume-high" style={styles.iconVolumeRight} />
      </View>
      <View style={styles.buttons}>
        <Icon
          accessible
          accessibilityLabel="Play"
          accessibilityRole="button"
          color={red}
          name={playing ? "pause-circle-outline" : "play-circle-outline"}
          onPress={togglePlaying}
          size={40}
        />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 24,
    padding: 8,
    paddingVertical: 16,
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
  slider: {
    alignSelf: "center",
  },
  buttons: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

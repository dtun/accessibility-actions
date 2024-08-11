import { StyleSheet } from "react-native";

import { red } from "@/constants";
import { Icon, Pressable, View } from "@/components/Themed";
import { ControlSlider } from "@/components/ControlSlider";

export function Controls({
  level,
  playing = false,
  setLevel,
  togglePlaying,
}: {
  level: number;
  max?: number;
  min?: number;
  playing: boolean;
  setLevel: (value: number) => void;
  togglePlaying: () => void;
}) {
  return (
    <View style={styles.container}>
      <ControlSlider value={level} setValue={setLevel} />
      <View style={styles.buttons}>
        <Pressable
          accessible
          accessibilityLabel="Play"
          accessibilityRole="button"
          accessibilityValue={{
            text: playing ? "playing" : "paused",
          }}
          onPress={togglePlaying}
        >
          <Icon
            color={red}
            name={playing ? "pause-circle-outline" : "play-circle-outline"}
            size={40}
          />
        </Pressable>
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
  buttons: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

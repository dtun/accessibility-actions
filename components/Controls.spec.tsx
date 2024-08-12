import { render, screen, userEvent, fireEvent } from "@/test-utils";
import { usePlayingState } from "@/hooks";

import { Controls } from "./Controls";
import { incrementAction, decrementAction } from "./ControlSlider";

let volumeUpEvent = { actionName: incrementAction.name };
let volumeDownEvent = { actionName: decrementAction.name };

function Example() {
  let { ...playingState } = usePlayingState();

  return <Controls {...playingState} />;
}

function renderControls() {
  return render(<Example />);
}

afterEach(() => {
  jest.clearAllMocks();
});

describe("Controls", () => {
  it("renders", () => {
    renderControls();

    let [volumeSlider] = screen.getAllByRole("adjustable");

    expect(volumeSlider).toHaveAccessibleName("Volume");
    expect(volumeSlider).toHaveAccessibilityValue({
      max: 100,
      min: 0,
      now: 50,
    });

    let [playButton] = screen.getAllByRole("button");

    expect(playButton).toHaveAccessibleName("Play");
    expect(playButton).toHaveAccessibilityValue({
      text: "paused",
    });
  });

  it("toggles playing", async () => {
    renderControls();

    let [playButton] = screen.getAllByRole("button");

    await userEvent.press(playButton);

    expect(playButton).toHaveAccessibilityValue({ text: "playing" });

    await userEvent.press(playButton);

    expect(playButton).toHaveAccessibilityValue({ text: "paused" });
  });

  it("moves volume up with acessibility action", () => {
    renderControls();

    let values = [60, 70, 80, 90, 100];
    let [volumeSlider] = screen.getAllByRole("adjustable");

    for (let value of values) {
      fireEvent(volumeSlider, "onAccessibilityAction", {
        nativeEvent: volumeUpEvent,
      });

      expect(volumeSlider).toHaveAccessibilityValue({
        max: 100,
        min: 0,
        now: value,
      });
    }

    // volume is max capped at 100, no more moves
    fireEvent(volumeSlider, "onAccessibilityAction", {
      nativeEvent: volumeUpEvent,
    });

    expect(volumeSlider).toHaveAccessibilityValue({
      max: 100,
      min: 0,
      now: 100,
    });
  });

  it("moves volume down with acessibility action", () => {
    renderControls();

    let values = [40, 30, 20, 10, 0];
    let [volumeSlider] = screen.getAllByRole("adjustable");

    for (let value of values) {
      fireEvent(volumeSlider, "onAccessibilityAction", {
        nativeEvent: volumeDownEvent,
      });

      expect(volumeSlider).toHaveAccessibilityValue({
        max: 100,
        min: 0,
        now: value,
      });
    }

    // volume is min capped at 0, no more moves
    fireEvent(volumeSlider, "onAccessibilityAction", {
      nativeEvent: volumeDownEvent,
    });

    expect(volumeSlider).toHaveAccessibilityValue({
      max: 100,
      min: 0,
      now: 0,
    });
  });
});

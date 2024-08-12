import { menuData } from "@/data";
import { render, screen, userEvent, fireEvent } from "@/test-utils";

import { MyMenuEdit, toggleAction, upAction, downAction } from "./MyMenuEdit";

// Events
let toggleEvent = { actionName: toggleAction.name };
let upEvent = { actionName: upAction.name };
let downEvent = { actionName: downAction.name };
// Spies
let toggleMenuItem = jest.fn();
let setMenuData = jest.fn();
let moveMenuItem = jest.fn();

function renderMyMenuEdit() {
  return render(
    <MyMenuEdit
      menuData={menuData}
      moveMenuItem={moveMenuItem}
      setMenuData={setMenuData}
      toggleMenuItem={toggleMenuItem}
    />
  );
}

describe("MyMenuEdit", () => {
  it("renders", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      expect(screen.getByText(item.title)).toBeOnTheScreen();
    }
  });

  it("toggles item", async () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      await userEvent.press(screen.getByText(item.title));

      expect(toggleMenuItem).toHaveBeenCalledWith(item.id);
    }

    expect(toggleMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("toggles item with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", {
        nativeEvent: toggleEvent,
      });

      expect(toggleMenuItem).toHaveBeenCalledWith(item.id);
    }

    expect(toggleMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item up with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", { nativeEvent: upEvent });

      expect(moveMenuItem).toHaveBeenCalledWith(item.id, "up");
    }

    expect(moveMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item down with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", { nativeEvent: downEvent });

      expect(moveMenuItem).toHaveBeenCalledWith(item.id, "down");
    }

    expect(moveMenuItem).toHaveBeenCalledTimes(menuData.length);
  });
});

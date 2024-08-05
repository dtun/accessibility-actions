import { menuData } from "@/data";
import { render, screen, userEvent, fireEvent } from "@/test-utils";

import { MyMenuEdit } from "./MyMenuEdit";

let toggleMenuItem = jest.fn();
let setMenuData = jest.fn();
let moveMenuItem = jest.fn();
let toggleEvent = { actionName: "activate" };
let upEvent = { actionName: "moveUp" };
let downEvent = { actionName: "moveDown" };

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

afterEach(() => {
  jest.clearAllMocks();
});

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
      fireEvent(screen.getByText(item.title), "onAccessibilityAction", {
        nativeEvent: toggleEvent,
      });

      expect(toggleMenuItem).toHaveBeenCalledWith(item.id);
    }

    expect(toggleMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item up with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      fireEvent(screen.getByText(item.title), "onAccessibilityAction", {
        nativeEvent: upEvent,
      });

      expect(moveMenuItem).toHaveBeenCalledWith(item.id, "up");
    }

    expect(moveMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item down with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      fireEvent(screen.getByText(item.title), "onAccessibilityAction", {
        nativeEvent: downEvent,
      });

      expect(moveMenuItem).toHaveBeenCalledWith(item.id, "down");
    }

    expect(moveMenuItem).toHaveBeenCalledTimes(menuData.length);
  });
});

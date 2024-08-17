import { menuData } from "@/data";
import { render, screen, userEvent, fireEvent } from "@/test-utils";

import { MyMenuEdit } from "./MyMenuEdit";

// Events
let toggleEvent = { actionName: "activate" };
let upEvent = { actionName: "up" };
let downEvent = { actionName: "down" };
let topEvent = { actionName: "top" };
let bottomEvent = { actionName: "bottom" };
// Spies
let setMenuData = jest.fn();
let setMenuItem = jest.fn();

function renderMyMenuEdit() {
  return render(
    <MyMenuEdit
      menuData={menuData}
      setMenuItem={setMenuItem}
      setMenuData={setMenuData}
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

      expect(setMenuItem).toHaveBeenCalledWith(item.id, "toggle");
    }

    expect(setMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("toggles item with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", {
        nativeEvent: toggleEvent,
      });

      expect(setMenuItem).toHaveBeenCalledWith(item.id, "toggle");
    }

    expect(setMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item up with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", { nativeEvent: upEvent });

      expect(setMenuItem).toHaveBeenCalledWith(item.id, "up");
    }

    expect(setMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item down with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", { nativeEvent: downEvent });

      expect(setMenuItem).toHaveBeenCalledWith(item.id, "down");
    }

    expect(setMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item to top with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", { nativeEvent: topEvent });

      expect(setMenuItem).toHaveBeenCalledWith(item.id, "top");
    }

    expect(setMenuItem).toHaveBeenCalledTimes(menuData.length);
  });

  it("moves item to bottom with acessibility action", () => {
    renderMyMenuEdit();

    for (let item of menuData) {
      let menuItem = screen.getByText(item.title);

      fireEvent(menuItem, "onAccessibilityAction", {
        nativeEvent: bottomEvent,
      });

      expect(setMenuItem).toHaveBeenCalledWith(item.id, "bottom");
    }

    expect(setMenuItem).toHaveBeenCalledTimes(menuData.length);
  });
});

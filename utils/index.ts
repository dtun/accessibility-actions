import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { menuData } from "@/data";

import type { MenuData, MenuItem, Operation } from "@/types";

export function getIsLast(id: string, data: MenuItem[]) {
  return data.findIndex((d) => d.id === id) === data.length - 1;
}

export function getIsFirst(id: string, data: MenuItem[]) {
  return data.findIndex((d) => d.id === id) === 0;
}

export function getItemData(id: string, data: MenuItem[]) {
  let isFirst = getIsFirst(id, data);
  let isLast = getIsLast(id, data);

  return { isFirst, isLast };
}

export async function loadData() {
  return await AsyncStorage.getItem("menuData");
}

export async function setData({ data }: { data: MenuItem[] }) {
  return await AsyncStorage.setItem("menuData", JSON.stringify(data));
}

export let menuDataAtom = atom<MenuData>(menuData);

export let loadDataAtom = atom(
  null, // read function (null because we don't need to read)
  async function (_get, set) {
    let data = await loadData();
    if (data) set(menuDataAtom, JSON.parse(data) || menuData);
  }
);

export let saveMenuDataAtom = atom(
  null, // read function (null because we don't need to read)
  async function (get) {
    let data = get(menuDataAtom);
    await setData({ data });
  }
);

export let toggleMenuItemAtom = atom(
  null, // read function (null because we don't need to read)
  function (get, set, id: string) {
    let currentData = get(menuDataAtom);
    let newData = currentData.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    set(menuDataAtom, newData);
  }
);

export let setMenuItemAtom = atom(
  null, // read function (null because we don't need to read)
  function (get, set, id: string, operation: Operation) {
    let currentData = get(menuDataAtom);
    let index = currentData.findIndex((item) => item.id === id);
    let newData = [...currentData];

    if (operation === "toggle") {
      newData[index].checked = !newData[index].checked;

      set(menuDataAtom, newData);

      return; // No need to continue
    }

    let newIndex = 0;
    if (operation === "up") newIndex = index - 1;
    if (operation === "down") newIndex = index + 1;
    if (operation === "top") newIndex = 0;
    if (operation === "bottom") newIndex = currentData.length - 1;

    if (newIndex < 0 || newIndex >= currentData.length) return;

    newData.splice(index, 1);
    newData.splice(newIndex, 0, currentData[index]);

    set(menuDataAtom, newData);
  }
);

export let setMenuDataAtom = atom(
  null, // read function (null because we don't need to read)
  function (_get, set, newData: MenuData) {
    set(menuDataAtom, newData);
  }
);

import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { menuData } from "@/data";

import type { Direction, MenuData, MenuItem, Position } from "@/types";

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

export let moveMenuItemAtom = atom(
  null, // read function (null because we don't need to read)
  function (get, set, id: string, direction: Direction | Position) {
    let currentData = get(menuDataAtom);
    let index = currentData.findIndex((item) => item.id === id);

    let newIndex = 0;
    if (direction === "up") newIndex = index - 1;
    if (direction === "down") newIndex = index + 1;
    if (direction === "top") newIndex = 0;
    if (direction === "bottom") newIndex = currentData.length - 1;

    if (newIndex < 0 || newIndex >= currentData.length) return;

    let newData = [...currentData];

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

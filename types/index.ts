import {
  Text,
  View,
  PressableProps as DefaultPressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SharedValue } from "react-native-reanimated";

import { getItemData } from "@/utils";

export type SharedNumber = SharedValue<number>;

export type IconName = keyof typeof Ionicons.glyphMap;

export type MenuItem = {
  id: string;
  icon: IconName;
  checked: boolean;
  title: string;
};

export type MenuData = MenuItem[];

export type MenuItemMeta = ReturnType<typeof getItemData>;

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & Text["props"];

export type ViewProps = ThemeProps & View["props"];

export type PressableProps = ThemeProps &
  DefaultPressableProps & {
    style?:
      | StyleProp<ViewStyle>
      | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  };

export type IconProps = ThemeProps & React.ComponentProps<typeof Ionicons>;

export type Direction = "up" | "down";

export type Position = "top" | "bottom";

export type Toggle = "toggle";

export type Operation = Direction | Position | Toggle;

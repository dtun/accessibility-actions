import {
  Text as DefaultText,
  View as DefaultView,
  Pressable as DefaultPressable,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants";
import { useColorScheme } from "@/hooks";

import type { IconProps, PressableProps, TextProps, ViewProps } from "@/types";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colors.light & keyof typeof colors.dark
) {
  let theme = useColorScheme() ?? "light";
  let colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  let { style, lightColor, darkColor, ...otherProps } = props;
  let color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  let { style, lightColor, darkColor, ...otherProps } = props;
  let backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Icon(props: IconProps) {
  let { style, lightColor, darkColor, ...otherProps } = props;
  let color = useThemeColor({ light: lightColor, dark: darkColor }, "icon");
  let colorProp = props.color ?? color;

  return (
    <Ionicons
      accessible={false}
      size={24}
      style={[{ color: colorProp }, style]}
      {...otherProps}
    />
  );
}

export function ListContainer(props: ViewProps) {
  let { style, lightColor, darkColor, ...otherProps } = props;
  let color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "listContainer"
  );

  return <View style={[{ backgroundColor: color }, style]} {...otherProps} />;
}

export function Pressable(props: PressableProps) {
  let { style, lightColor, darkColor, ...otherProps } = props;
  let backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultPressable
      style={({ pressed }) => {
        let baseStyle: ViewStyle = { backgroundColor };
        let pressedStyle: ViewStyle = pressed ? {} : {};

        if (typeof style === "function") {
          return [baseStyle, pressedStyle, style({ pressed })];
        } else {
          return [baseStyle, pressedStyle, style];
        }
      }}
      {...otherProps}
    />
  );
}

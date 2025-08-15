import { Box, type BoxProps } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";
import React, { isValidElement } from "react";

type IconInput =
  | LucideIcon
  | React.ReactElement
  | React.ComponentType<object>
  | string;

interface IconProps extends Omit<BoxProps, "color" | "children"> {
  icon: IconInput;
  size?: number | string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 20,
  color = "currentColor",
  ...props
}) => {
  const fontSize = typeof size === "number" ? `${size}px` : size;

  return (
    <Box flexShrink={0} lineHeight={0} display="inline-flex" {...props}>
      {typeof icon === "string" ? (
        <Box as="span" fontSize={fontSize} color={color} lineHeight={1}>
          {icon}
        </Box>
      ) : isValidElement(icon) ? (
        icon
      ) : (
        (() => {
          const Lucide = icon as LucideIcon;
          const numericSize = typeof size === "number" ? size : undefined;
          return <Lucide size={numericSize} color={color} />;
        })()
      )}
    </Box>
  );
};

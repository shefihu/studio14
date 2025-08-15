import { Box, type BoxProps } from "@chakra-ui/react";
import type { FC } from "react";

interface SwitchProps extends Omit<BoxProps, "onChange"> {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({
  isChecked = false,
  onChange,
  ...boxProps
}) => {
  return (
    <Box
      w="10"
      h="6"
      bg={isChecked ? "primary.500" : "gray.200"}
      rounded="full"
      position="relative"
      cursor="pointer"
      onClick={() => onChange?.(!isChecked)}
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      {...boxProps}
    >
      <Box
        w="5"
        h="5"
        bg="white"
        rounded="full"
        position="absolute"
        top="0.5"
        left={isChecked ? "4.5" : "0.5"}
        transition="all 0.2s ease-in-out"
        _hover={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      />
    </Box>
  );
};

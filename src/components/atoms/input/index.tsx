import { Input as ChakraInput, type InputProps } from "@chakra-ui/react";
import type { FC } from "react";

export const Input: FC<InputProps> = (props) => {
  return (
    <ChakraInput
      borderColor="gray.200"
      _hover={{ borderColor: "gray.300" }}
      _focus={{
        borderColor: "primary.500",
        boxShadow: "0 0 0 1px #314EF9",
      }}
      {...props}
    />
  );
};

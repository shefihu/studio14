import { Text as ChakraText, type TextProps } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

interface CustomTextProps extends TextProps {
  variant?: "heading" | "body" | "small" | "subtitle";
  children: ReactNode;
}

export const Text: FC<CustomTextProps> = ({
  variant = "body",
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "heading":
        return { fontSize: "2xl", fontWeight: "bold", color: "gray.900" };
      case "subtitle":
        return { fontSize: "lg", fontWeight: "semibold", color: "gray.900" };
      case "body":
        return { fontSize: "md", color: "gray.900" };
      case "small":
        return { fontSize: "sm", color: "gray.900" };
      default:
        return { fontSize: "md", color: "gray.900" };
    }
  };

  return (
    <ChakraText {...getVariantStyles()} {...props}>
      {children}
    </ChakraText>
  );
};

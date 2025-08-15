import { Badge as ChakraBadge, type BadgeProps } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

interface CustomBadgeProps extends BadgeProps {
  children?: ReactNode;
}

export const Badge: FC<CustomBadgeProps> = ({ children, ...props }) => {
  return (
    <ChakraBadge
      bg="gray.100"
      color="gray.800"
      px={3}
      py={1}
      rounded="full"
      fontSize="xs"
      fontWeight="medium"
      {...props}
    >
      {children}
    </ChakraBadge>
  );
};

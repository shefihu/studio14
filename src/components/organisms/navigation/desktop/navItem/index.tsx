import { Box } from "@chakra-ui/react";
import { Text } from "../../../../atoms/text";
import { useState, type FC } from "react";

interface NavItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem: FC<NavItemProps> = ({ children, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position="relative"
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text
        px={6}
        py={2}
        variant="small"
        fontWeight="bold"
        color={
          isActive ? "primary.500" : isHovered ? "primary.500" : "gray.700"
        }
        transition="all 0.2s ease-in-out"
        transform={isHovered ? "translateY(-1px)" : "translateY(0)"}
      >
        {children}
      </Text>

      <Box
        position="absolute"
        bottom="-16px"
        left="50%"
        transform="translateX(-50%)"
        height="4px"
        width={isActive ? "100%" : "0%"}
        bg="primary.500"
        transition="width 0.3s ease-in-out"
        borderRadius="1px"
      />
    </Box>
  );
};

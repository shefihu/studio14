import { Box, Text } from "@chakra-ui/react";
import { useState, type FC } from "react";

// Mobile Navigation Item Component
interface MobileNavItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const MobileNavItem: FC<MobileNavItemProps> = ({
  children,
  isActive,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Box
      w="100%"
      cursor="pointer"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      transition="all 0.2s ease-in-out"
      transform={isPressed ? "scale(0.98)" : "scale(1)"}
    >
      <Box
        px={6}
        py={4}
        bg={isActive ? "primary.50" : "transparent"}
        borderLeft={isActive ? "4px solid" : "4px solid transparent"}
        borderColor={isActive ? "primary.500" : "transparent"}
        transition="all 0.2s ease-in-out"
        _hover={{
          bg: isActive ? "primary.50" : "gray.50",
        }}
      >
        <Text
          fontSize="md"
          fontWeight={isActive ? "bold" : "medium"}
          color={isActive ? "primary.500" : "gray.700"}
          transition="all 0.2s ease-in-out"
        >
          {children}
        </Text>
      </Box>
    </Box>
  );
};

export default MobileNavItem;

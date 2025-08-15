import { Box, HStack, VStack } from "@chakra-ui/react";
import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { Text } from "../../atoms/text";
import { Icon } from "../../atoms/iconWrapper";
import { ChevronDown, LogOut } from "lucide-react";

interface UserAvatarProps {
  name: string;
  initials: string;
  onSignOut?: () => void;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  name,
  initials,
  onSignOut,
}) => {
  const [, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    onSignOut?.();
  };

  return (
    <Box position="relative" ref={dropdownRef}>
      <HStack
        gap={{ base: 0, md: 3 }}
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        transition="all 0.2s ease-in-out"
        _hover={{
          transform: "scale(1.02)",
        }}
      >
        <Box
          w={8}
          h={8}
          bg="#17E4A1"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.2s ease-in-out"
          _hover={{
            boxShadow: "0 4px 12px rgba(23, 228, 161, 0.3)",
          }}
        >
          <Text color="black" fontSize="xs" fontWeight="semibold">
            {initials}
          </Text>
        </Box>
        <HStack gap="5px">
          <Text
            color="#525252"
            fontWeight="medium"
            transition="color 0.2s ease-in-out"
            _hover={{
              color: "black",
            }}
            display={{ base: "none", md: "inline-block" }}
          >
            {name}
          </Text>
          <Icon
            icon={ChevronDown}
            size={16}
            color="black"
            transition="all 0.2s ease-in-out"
            transform={isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"}
            display={{ base: "none", md: "inline-block" }}
          />
        </HStack>
      </HStack>

      {/* Dropdown Menu */}
      <Box
        position="absolute"
        top="calc(100% + 8px)"
        right={0}
        minW="160px"
        bg="white"
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        zIndex={50}
        opacity={isDropdownOpen ? 1 : 0}
        visibility={isDropdownOpen ? "visible" : "hidden"}
        transform={
          isDropdownOpen
            ? "translateY(0) scale(1)"
            : "translateY(-10px) scale(0.95)"
        }
        transition="all 0.2s ease-in-out"
        transformOrigin="top right"
      >
        <VStack p={2} gap={0}>
          <Box
            w="100%"
            px={3}
            py={2}
            cursor="pointer"
            onClick={handleSignOut}
            transition="all 0.15s ease-in-out"
            borderRadius="md"
            _hover={{
              bg: "red.50",
            }}
          >
            <HStack gap={3}>
              <Icon
                icon={LogOut}
                size={16}
                color="red.500"
                transition="all 0.15s ease-in-out"
              />
              <Text
                fontSize="sm"
                color="red.500"
                fontWeight="medium"
                transition="all 0.15s ease-in-out"
              >
                Sign Out
              </Text>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

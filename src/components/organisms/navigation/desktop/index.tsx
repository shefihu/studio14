import { Box, Flex, HStack, useBreakpointValue } from "@chakra-ui/react";
import { X } from "lucide-react";
import { Text } from "../../../atoms/text";
import { Switch } from "../../../atoms/switch";
import { useState, type FC } from "react";
import { Logo, Menu } from "../../../../assets/svg/svg";
import { NavItem } from "./navItem";
import { UserAvatar } from "../../../molecules/userAvatar";
import { Icon } from "../../../atoms/iconWrapper";
import MobileMenu from "../mobile";

interface NavProps {
  onMenuClick?: () => void;
  activeItem?: string;
  isMobileMenuOpen?: boolean;
  onCloseMenu?: () => void;
}

export const Navbar: FC<NavProps> = ({
  onMenuClick,
  activeItem: propActiveItem,
  isMobileMenuOpen,
  onCloseMenu,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [activeItem, setActiveItem] = useState(propActiveItem || "Resources");
  const [isEmployeeMode, setIsEmployeeMode] = useState(true);

  const handleSwitchToggle = (checked: boolean) => {
    setIsEmployeeMode(checked);
  };

  const handleNavItemClick = (item: string) => {
    setActiveItem(item);
    if (isMobile && onCloseMenu) {
      onCloseMenu();
    }
  };

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.06)"
      position={"relative"}
    >
      <Box maxW="1440px" mx="auto" px={6} py={4}>
        <Flex align="center" justify="space-between">
          <HStack gap={46.5}>
            <Logo />
            <HStack display={{ base: "none", md: "flex" }}>
              <NavItem
                isActive={activeItem === "Dashboard"}
                onClick={() => handleNavItemClick("Dashboard")}
              >
                Dashboard
              </NavItem>
              <NavItem
                isActive={activeItem === "Resources"}
                onClick={() => handleNavItemClick("Resources")}
              >
                Resources
              </NavItem>
              <NavItem
                isActive={activeItem === "Toolkit"}
                onClick={() => handleNavItemClick("Toolkit")}
              >
                Toolkit
              </NavItem>
            </HStack>
          </HStack>

          <HStack gap={"18px"}>
            <HStack gap={4} display={{ base: "none", sm: "flex" }}>
              <HStack>
                <Switch
                  isChecked={isEmployeeMode}
                  onChange={handleSwitchToggle}
                  transition="color 0.2s ease-in-out"
                />
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  transition="color 0.2s ease-in-out"
                  _hover={{
                    color: "primary.500",
                  }}
                  display={{ base: "none", lg: "flex" }}
                >
                  Switch to Employee
                </Text>
              </HStack>
            </HStack>

            <Box
              width="1px"
              height="24px"
              bg="gray.300"
              display={{ base: "none", sm: "flex" }}
            />

            <UserAvatar name="Jonathan" initials="JA" />

            {isMobile && (
              <Box
                transition="all 0.2s ease-in-out"
                _hover={{
                  transform: "scale(1.1)",
                  color: "primary.500",
                }}
                display={"flex"}
              >
                <Icon
                  icon={isMobileMenuOpen ? X : Menu}
                  aria-label="Menu"
                  data-menu-button
                  onClick={isMobileMenuOpen ? onCloseMenu : onMenuClick}
                  size={isMobileMenuOpen ? 32 : undefined}
                />
              </Box>
            )}

            {isMobile && (
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={onCloseMenu}
                activeItem={activeItem}
                onNavItemClick={handleNavItemClick}
                isEmployeeMode={isEmployeeMode}
                onSwitchToggle={handleSwitchToggle}
              />
            )}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

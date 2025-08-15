import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useRef, type FC } from "react";
import MobileNavItem from "./navItem";

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeItem: string;
  onNavItemClick: (item: string) => void;
  isEmployeeMode: boolean;
  onSwitchToggle: (checked: boolean) => void;
}

const MobileMenu: FC<MobileMenuProps> = ({
  isOpen = false,
  onClose,
  activeItem,
  onNavItemClick,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest("[data-menu-button]") &&
        !target.closest("[data-navbar]") &&
        onClose
      ) {
        onClose();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <Box
        ref={menuRef}
        position="absolute"
        top="100%"
        left={0}
        right={0}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        zIndex={99}
        maxHeight={isOpen ? "500px" : "0"}
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        transform={
          isOpen ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)"
        }
        opacity={isOpen ? 1 : 0}
        transformOrigin="top center"
      >
        <VStack py={4}>
          <MobileNavItem
            isActive={activeItem === "Dashboard"}
            onClick={() => onNavItemClick("Dashboard")}
          >
            Dashboard
          </MobileNavItem>

          <MobileNavItem
            isActive={activeItem === "Resources"}
            onClick={() => onNavItemClick("Resources")}
          >
            Resources
          </MobileNavItem>

          <MobileNavItem
            isActive={activeItem === "Toolkit"}
            onClick={() => onNavItemClick("Toolkit")}
          >
            Toolkit
          </MobileNavItem>
        </VStack>
      </Box>
    </>
  );
};

export default MobileMenu;

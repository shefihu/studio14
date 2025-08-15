import { Box, useDisclosure } from "@chakra-ui/react";
import { Navbar } from "../../organisms/navigation/desktop";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const { onOpen, onClose, open } = useDisclosure();
  // const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box>
      <Navbar
        onMenuClick={onOpen}
        isMobileMenuOpen={open}
        onCloseMenu={onClose}
      />
      <Outlet />
    </Box>
  );
};

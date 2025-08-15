import { Box } from "@chakra-ui/react";
import FilterContent from "../../../molecules/filterContent";

const ResourceFilters = () => {
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#c1c1c1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#a8a8a8",
    },
  };

  return (
    <>
      <Box
        position="sticky"
        top="20px"
        h="fit-content"
        maxHeight="calc(100vh - 40px)"
        overflowY="auto"
        minW={{ lg: "240px" }}
        display={{ base: "none", lg: "block" }}
        flexShrink={0}
        alignSelf="flex-start"
        css={scrollbarStyles}
      >
        <FilterContent />
      </Box>
    </>
  );
};

export default ResourceFilters;

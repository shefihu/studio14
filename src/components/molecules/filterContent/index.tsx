import { Box, Heading } from "@chakra-ui/react";
import {
  documentTypeFilters,
  foundationFilters,
} from "../../../data/dummy/resources";
import FilterGroup from "../filterGroup";

interface FilterContentProps {
  isStaged?: boolean;
}

const FilterContent = ({ isStaged = false }: FilterContentProps) => {
  return (
    <>
      <Box
        px={"21px"}
        py={"22px"}
        borderBottom={"1px solid #E0E0E0"}
        mb={"24px"}
        display={{ base: "none", lg: "block" }}
      >
        <Heading
          as={"h4"}
          fontWeight="700"
          fontStyle="normal"
          fontSize="16px"
          lineHeight="140%"
          letterSpacing="0"
          textAlign={"left"}
        >
          Filters
        </Heading>
      </Box>

      <Box px={{ lg: "15px" }}>
        <Box mb={"39px"}>
          <FilterGroup
            title="Key Foundational Principles"
            filters={foundationFilters}
            filterType="foundational"
            isStaged={isStaged}
          />
        </Box>

        <FilterGroup
          title="Document type"
          filters={documentTypeFilters}
          filterType="documentType"
          isStaged={isStaged}
        />
      </Box>
    </>
  );
};

export default FilterContent;

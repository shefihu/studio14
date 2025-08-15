import { Box, Checkbox, CheckboxGroup, Fieldset, For } from "@chakra-ui/react";
import { useResourceContext } from "../../../hooks/useResourceContext";

type FilterType = "foundational" | "documentType" | "category";

interface FilterGroupProps {
  title: string;
  filters: string[];
  filterType: FilterType;
  isStaged?: boolean;
}

const FilterGroup = ({
  filters,
  title,
  filterType,
  isStaged = false,
}: FilterGroupProps) => {
  const {
    filterState,
    toggleFoundationalPrinciple,
    toggleDocumentType,
    toggleCategory,
    stagedFilterState,
    toggleStagedFoundationalPrinciple,
    toggleStagedDocumentType,
    toggleStagedCategory,
  } = useResourceContext();

  const getNormalSelectedFilters = (): string[] => {
    switch (filterType) {
      case "foundational":
        return filterState.selectedFoundationalPrinciples;
      case "documentType":
        return filterState.selectedDocumentTypes;
      case "category":
        return filterState.selectedCategories;
      default:
        return [];
    }
  };

  const handleNormalToggle = (filter: string): void => {
    switch (filterType) {
      case "foundational":
        toggleFoundationalPrinciple(filter);
        break;
      case "documentType":
        toggleDocumentType(filter);
        break;
      case "category":
        toggleCategory(filter);
        break;
    }
  };

  const getSelectedStagedFilters = (): string[] => {
    switch (filterType) {
      case "foundational":
        return stagedFilterState.selectedFoundationalPrinciples;
      case "documentType":
        return stagedFilterState.selectedDocumentTypes;
      case "category":
        return stagedFilterState.selectedCategories;
      default:
        return [];
    }
  };

  const handleStagedToggle = (filter: string): void => {
    switch (filterType) {
      case "foundational":
        toggleStagedFoundationalPrinciple(filter);
        break;
      case "documentType":
        toggleStagedDocumentType(filter);
        break;
      case "category":
        toggleStagedCategory(filter);
        break;
    }
  };

  const handleToggle = (filter: string) => {
    if (isStaged) {
      handleStagedToggle(filter);
    } else {
      handleNormalToggle(filter);
    }
  };

  const getSelectedFilters = (): string[] => {
    return isStaged ? getSelectedStagedFilters() : getNormalSelectedFilters();
  };

  const selectedFilters = getSelectedFilters();

  return (
    <Fieldset.Root>
      <CheckboxGroup value={selectedFilters} name="framework">
        <Fieldset.Legend
          fontSize="16px"
          fontWeight={"700"}
          mb={{ base: "8px", lg: "26px" }}
          textAlign={"left"}
          color={"#3F3F3F"}
          textWrap={"nowrap"}
        >
          {title}
        </Fieldset.Legend>

        <Fieldset.Content gap={"6px"}>
          <For each={filters}>
            {(value, index) => (
              <Checkbox.Root
                key={index}
                value={value}
                display="flex"
                alignItems="center"
                gap="12px"
                _hover={{
                  "& .checkbox-label": {
                    fontWeight: "500",
                  },
                  cursor: "pointer",
                }}
                checked={selectedFilters.includes(value)}
                onCheckedChange={() => handleToggle(value)}
              >
                <Checkbox.HiddenInput />

                <Checkbox.Control
                  width="17px"
                  height="16px"
                  rounded="2px"
                  border="1px solid"
                  borderColor="#E0E0E0"
                  bg="white"
                  p={0}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.2s ease"
                  _checked={{
                    borderColor: "#E0E0E0",
                    "& > .custom-fill": {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    className="custom-fill"
                    w="13px"
                    h="12px"
                    bg="#3F3F3F"
                    rounded="2px"
                    opacity={0}
                    transform="scale(1)"
                    transition="opacity 0.15s ease, transform 0.18s cubic-bezier(.2,.8,.2,1)"
                    transformOrigin="center"
                  />
                </Checkbox.Control>

                <Checkbox.Label
                  className="checkbox-label"
                  color={"#3F3F3F"}
                  lineHeight={"163%"}
                  fontSize={"16px"}
                  fontWeight={"normal"}
                  transition="all 0.2s ease"
                >
                  {value}
                </Checkbox.Label>
              </Checkbox.Root>
            )}
          </For>
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  );
};

export default FilterGroup;

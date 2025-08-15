import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import { Icon } from "../../atoms/iconWrapper";
import FilterContent from "../filterContent";
import { Filter } from "../../../assets/svg/svg";
import { useResourceContext } from "../../../hooks/useResourceContext";
import { useState } from "react";

const ResourceFilterModal = () => {
  const {
    filterState,
    stagedFilterState,
    applyStagedFilters,
    resetStagedFilters,
    initializeStagedFilters,
  } = useResourceContext();

  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount =
    (filterState.searchQuery ? 1 : 0) +
    filterState.selectedFoundationalPrinciples.length +
    filterState.selectedDocumentTypes.length +
    filterState.selectedCategories.length;

  const stagedFilterCount =
    (stagedFilterState.searchQuery ? 1 : 0) +
    stagedFilterState.selectedFoundationalPrinciples.length +
    stagedFilterState.selectedDocumentTypes.length +
    stagedFilterState.selectedCategories.length;

  const hasActiveFilters = activeFilterCount > 0;
  const hasStagedChanges =
    JSON.stringify(filterState) !== JSON.stringify(stagedFilterState);

  const handleOpenModal = () => {
    initializeStagedFilters();
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleApplyFilters = () => {
    applyStagedFilters();
    setIsOpen(false);
  };

  const handleClearAll = () => {
    resetStagedFilters();
  };

  return (
    <>
      <Dialog.Root
        size={"md"}
        open={isOpen}
        onOpenChange={(details) => setIsOpen(details.open)}
        placement={"center"}
      >
        <Dialog.Trigger asChild display={{ lg: "none" }}>
          <Button
            h={"61px"}
            border={"1px solid gray.100"}
            bg={"#F1F1F1"}
            fontWeight={500}
            fontSize="16px"
            lineHeight="44.17px"
            letterSpacing="0"
            color={"#3F3F3F"}
            width={"full"}
            position="relative"
            onClick={handleOpenModal}
          >
            <Icon icon={Filter} />
            Show Filters
          </Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner p={"20px"}>
            <Dialog.Content maxH="90vh" overflow="hidden">
              <Dialog.Header>
                <Dialog.Title>Filters</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body overflowY="auto" px={4}>
                <FilterContent isStaged />
              </Dialog.Body>

              <Dialog.Footer>
                <Flex justify="space-between" w="full" gap={3}>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      onClick={handleClearAll}
                      size="sm"
                    >
                      Clear All ({activeFilterCount})
                    </Button>
                  )}

                  <Dialog.ActionTrigger asChild>
                    <Button
                      colorScheme="blue"
                      ml="auto"
                      minW="100px"
                      onClick={handleApplyFilters}
                      disabled={!hasStagedChanges && stagedFilterCount === 0}
                    >
                      Apply Filters
                    </Button>
                  </Dialog.ActionTrigger>
                </Flex>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  position="absolute"
                  top={4}
                  right={4}
                  onClick={handleCloseModal}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default ResourceFilterModal;

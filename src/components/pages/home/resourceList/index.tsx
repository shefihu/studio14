import { Box, Grid, Text } from "@chakra-ui/react";
import ResourceCard from "../../../molecules/resourceCard";
import type { ResourceCardProps } from "../../../../types/resources";
import { useResourceContext } from "../../../../hooks/useResourceContext";

const ResourceList = () => {
  const { filteredResources, isLoading, filterState } = useResourceContext();

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Text>Loading resources...</Text>
      </Box>
    );
  }

  if (filteredResources.length === 0) {
    const hasActiveFilters: boolean =
      Boolean(filterState.searchQuery) ||
      filterState.selectedFoundationalPrinciples.length > 0 ||
      filterState.selectedDocumentTypes.length > 0 ||
      filterState.selectedCategories.length > 0;

    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">
          {hasActiveFilters
            ? "No resources match your current filters."
            : "No resources available."}
        </Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, minmax(0, 1fr))",
        md: "repeat(2, minmax(0, 1fr))",
        lg: "repeat(3, minmax(0, 1fr))",
      }}
      gap={"20px"}
      justifyItems="center"
    >
      {filteredResources.map((resource) => {
        const cardProps: ResourceCardProps = {
          title: resource.title,
          icon: resource.icon,
          accentIcon: resource.accentIcon,
          subtitle: resource.subTitle,
          tagLabel: resource.tagLabel,
          accentCorner: resource.accentCorner,
          accentWidth: resource.accentWidth,
          accentHeight: resource.height,
        };

        return <ResourceCard key={resource.id} {...cardProps} />;
      })}
    </Grid>
  );
};

export default ResourceList;

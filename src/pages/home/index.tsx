import { Box, Container, Flex } from "@chakra-ui/react";
import { Hero } from "../../components/organisms/hero";
import { ResourceProvider } from "../../contexts/ResourceProvider";
import ResourceFilterModal from "../../components/molecules/resourceFilterModal";
import ResourceFilters from "../../components/pages/home/resourceFilters";
import ResourceList from "../../components/pages/home/resourceList";
export default function Home() {
  return (
    <ResourceProvider>
      <Box>
        <Hero
          title="Resources"
          description="Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue"
        />

        <ResourceFilterModal />

        <Container maxW={"1161px"} my={{ base: "48px", lg: "53px" }}>
          <Flex
            gap={"58px"}
            flexDirection={{
              base: "column",
              lg: "row",
            }}
          >
            <ResourceFilters />

            <Box flex="1" minW="0">
              <ResourceList />
            </Box>
          </Flex>
        </Container>
      </Box>
    </ResourceProvider>
  );
}

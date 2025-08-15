import { Box, VStack } from "@chakra-ui/react";
import { type FC } from "react";
import { Text } from "../../atoms/text";
import { SearchBox } from "../../molecules/searchBox";
import { useResourceContext } from "../../../hooks/useResourceContext";

interface HeroProps {
  title: string;
  description: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export const Hero: FC<HeroProps> = ({
  title,
  description,
  searchPlaceholder = "Search by title or keyword",
  onSearch,
}) => {
  const { filterState, setSearchQuery } = useResourceContext();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <VStack
      backgroundColor="#FAFAFA"
      textAlign="center"
      px={7}
      pt={{ base: "70px", md: "95px" }}
      pb={{ base: "68px", md: "66px" }}
    >
      <Text
        variant="heading"
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        color="gray.600"
        fontWeight="bold"
      >
        {title}
      </Text>

      <Text
        mt={4}
        maxW="2xl"
        color="gray.600"
        fontSize="base"
        lineHeight="relaxed"
      >
        {description}
      </Text>

      <Box mt={{ base: "46px", lg: "51px" }} w="100%" maxW="4xl">
        <SearchBox
          placeholder={searchPlaceholder}
          value={filterState.searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
    </VStack>
  );
};

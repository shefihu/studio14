import { Box } from "@chakra-ui/react";

import { Search } from "lucide-react";
import type { FC } from "react";
import { Input } from "../../atoms/input";

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({
  placeholder = "Search...",
  value,
  onChange,
}) => {
  return (
    <Box position="relative" w="100%">
      <Box
        position="absolute"
        left="30px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        pointerEvents="none"
      >
        <Search size={20} color="#4F4F4F" />
      </Box>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        bg="white"
        borderRadius="10px"
        borderColor="gray.300"
        size="lg"
        py={4}
        height="59px"
        pl="71px"
        _placeholder={{ color: "#4F4F4F", fontSize: "md" }}
        _hover={{ borderColor: "gray.300" }}
        _focus={{
          borderColor: "primary.500",
          boxShadow: "0 0 0 1px #314EF9",
        }}
      />
    </Box>
  );
};

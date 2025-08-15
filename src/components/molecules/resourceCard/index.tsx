import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Badge } from "../../atoms/badge";
import type { ResourceCardProps } from "../../../types/resources";
import { Icon } from "../../atoms/iconWrapper";

interface CardProps extends ResourceCardProps {
  onClick?: () => void;
}
const ResourceCard = ({
  title,
  icon,
  accentIcon,
  subtitle,
  tagLabel,
  accentCorner,
  accentWidth = "100%",
  accentHeight = "auto",
  onClick,
}: CardProps) => {
  return (
    <Box
      borderRadius={16}
      paddingTop={"48px"}
      pl={33}
      pr={21}
      pb={22}
      borderWidth={1}
      borderStyle={"solid"}
      borderColor={"gray.100"}
      position={"relative"}
      overflow={"hidden"}
      boxShadow={"0px 4px 12px 1px #0000000D"}
      transition={"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"}
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "0px 12px 32px 4px #00000015",
        borderColor: "gray.200",
        bg: "gray.50",
        "& .accent-icon": {
          transform: "translateY(-2px)",
          opacity: 0.9,
        },
        "& .main-icon": {
          transform: "scale(1.1)",
        },
        "& .card-title": {
          color: "gray.700",
          transform: "translateX(4px)",
        },
        "& .card-subtitle": {
          color: "#606060",
          transform: "translateX(2px)",
        },
        "& .card-badge": {
          bg: "gray.200",
          transform: "translateY(-2px) scale(1.05)",
          color: "gray.900",
        },
      }}
      _active={{
        transform: "translateY(-4px)",
        boxShadow: "0px 8px 20px 2px #00000012",
      }}
      cursor={"pointer"}
      w={"full"}
      height={"full"}
      onClick={onClick}
    >
      <Box
        position={"absolute"}
        top={0}
        right={accentCorner !== "tl" ? 0 : "auto"}
        left={accentCorner !== "tr" ? 0 : "auto"}
        w={accentWidth}
        zIndex={-1}
        h={accentHeight ?? "auto"}
        transition={"all 0.4s ease-out"}
        className="accent-icon"
      >
        {accentIcon}
      </Box>

      <Box
        className="main-icon"
        transition={"transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"}
      >
        <Icon icon={icon} width="24px" height="24px" />
      </Box>

      <Flex
        alignItems={"end"}
        mt={{
          base: 18,
          lg: 13,
        }}
        minHeight={{ lg: "81px", base: "115px" }}
      >
        <Heading
          as="h3"
          fontSize={{
            base: "22px",
            lg: "lg",
          }}
          fontWeight={"bold"}
          color={"gray.600"}
          textAlign={"left"}
          lineHeight={"140%"}
          className="card-title"
          transition={"all 0.3s ease-out"}
        >
          {title}
        </Heading>
      </Flex>

      <Text
        fontSize={{
          base: "20",
          lg: "sm",
        }}
        color={"#828282"}
        textAlign={"left"}
        lineHeight={"25px"}
        my={{
          base: 18,
          lg: 13,
        }}
        className="card-subtitle"
        transition={"all 0.3s ease-out 0.1s"}
      >
        {subtitle}
      </Text>

      <Badge
        rounded={"full"}
        fontSize={{ base: "17px", lg: "12px" }}
        fontWeight={"medium"}
        color={"#222222"}
        height={{ base: "38px", lg: "27px" }}
        px={{ lg: "7px", base: "16px" }}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        w={"fit-content"}
        lineHeight={"140%"}
        className="card-badge"
        transition={"all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s"}
      >
        {tagLabel}
      </Badge>
    </Box>
  );
};

export default ResourceCard;

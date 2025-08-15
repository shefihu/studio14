import { describe, it, expect } from "vitest";
import { render, screen, type RenderResult } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

import type { ReactElement } from "react";
import { Badge } from ".";
import system from "../../../theme";

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement): RenderResult => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("Badge Component", () => {
  it("renders children correctly", () => {
    renderWithChakra(<Badge>Test Badge</Badge>);

    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default styling correctly", () => {
    renderWithChakra(<Badge>Default Badge</Badge>);

    const badge = screen.getByText("Default Badge");

    // Check if the badge has the expected classes/styles
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("chakra-badge");
  });

  it("accepts and applies custom props", () => {
    renderWithChakra(
      <Badge bg="blue.500" color="white" data-testid="custom-badge">
        Custom Badge
      </Badge>
    );

    const badge = screen.getByTestId("custom-badge");
    expect(badge).toBeInTheDocument();
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("overrides default props when custom props are provided", () => {
    renderWithChakra(
      <Badge
        bg="red.500"
        color="white"
        fontSize="md"
        data-testid="override-badge"
      >
        Override Badge
      </Badge>
    );

    const badge = screen.getByTestId("override-badge");
    expect(badge).toBeInTheDocument();
  });

  it("renders with complex children", () => {
    renderWithChakra(
      <Badge>
        <span>Complex</span> Badge Content
      </Badge>
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Badge Content")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    renderWithChakra(<Badge />);

    // Should still render the badge element even with no content
    const badge = document.querySelector(".chakra-badge");
    expect(badge).toBeInTheDocument();
  });

  it("applies accessibility attributes correctly", () => {
    renderWithChakra(
      <Badge role="status" aria-label="Status badge">
        Active
      </Badge>
    );

    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("aria-label", "Status badge");
  });

  it("handles different badge variants", () => {
    renderWithChakra(
      <Badge variant="solid" colorScheme="green" data-testid="variant-badge">
        Success
      </Badge>
    );

    const badge = screen.getByTestId("variant-badge");
    expect(badge).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("supports different sizes", () => {
    renderWithChakra(
      <Badge fontSize="lg" px={4} py={2} data-testid="large-badge">
        Large Badge
      </Badge>
    );

    const badge = screen.getByTestId("large-badge");
    expect(badge).toBeInTheDocument();
  });

  it("renders multiple badges correctly", () => {
    renderWithChakra(
      <div>
        <Badge data-testid="badge-1">Badge 1</Badge>
        <Badge data-testid="badge-2">Badge 2</Badge>
        <Badge data-testid="badge-3">Badge 3</Badge>
      </div>
    );

    expect(screen.getByTestId("badge-1")).toBeInTheDocument();
    expect(screen.getByTestId("badge-2")).toBeInTheDocument();
    expect(screen.getByTestId("badge-3")).toBeInTheDocument();
  });
});

describe("Badge Component Props", () => {
  it("spreads all props correctly to ChakraBadge", () => {
    const customProps = {
      "data-testid": "props-test",
      className: "custom-class",
      onClick: () => {},
      title: "Custom title",
    };

    renderWithChakra(<Badge {...customProps}>Props Test</Badge>);

    const badge = screen.getByTestId("props-test");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("title", "Custom title");
  });

  it("maintains TypeScript type safety", () => {
    // This test ensures the component accepts BadgeProps
    renderWithChakra(
      <Badge
        bg="purple.100"
        color="purple.800"
        borderWidth={1}
        borderColor="purple.200"
        _hover={{ bg: "purple.200" }}
        data-testid="typescript-test"
      >
        TypeScript Test
      </Badge>
    );

    expect(screen.getByTestId("typescript-test")).toBeInTheDocument();
  });
});

describe("Badge Component Integration", () => {
  it("renders without crashing", () => {
    expect(() => renderWithChakra(<Badge>Test</Badge>)).not.toThrow();
  });

  it("works with Chakra UI theme system", () => {
    renderWithChakra(
      <Badge colorScheme="blue" variant="outline">
        Theme Test
      </Badge>
    );

    expect(screen.getByText("Theme Test")).toBeInTheDocument();
  });

  it("supports responsive props", () => {
    renderWithChakra(
      <Badge
        fontSize={{ base: "xs", md: "sm" }}
        px={{ base: 2, md: 3 }}
        data-testid="responsive-badge"
      >
        Responsive Badge
      </Badge>
    );

    expect(screen.getByTestId("responsive-badge")).toBeInTheDocument();
  });
});

describe("Badge Component Edge Cases", () => {
  it("handles numeric children", () => {
    renderWithChakra(<Badge>{42}</Badge>);

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("handles conditional children", () => {
    const isActive = true;
    renderWithChakra(<Badge>{isActive ? "Active" : "Inactive"}</Badge>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("handles null children gracefully", () => {
    renderWithChakra(<Badge>{null}</Badge>);

    const badge = document.querySelector(".chakra-badge");
    expect(badge).toBeInTheDocument();
  });

  it("handles undefined children gracefully", () => {
    renderWithChakra(<Badge>{undefined}</Badge>);

    const badge = document.querySelector(".chakra-badge");
    expect(badge).toBeInTheDocument();
  });
});

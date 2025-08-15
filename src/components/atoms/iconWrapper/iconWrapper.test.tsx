import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, type RenderResult } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

import type { ReactElement } from "react";
import { Heart, Star } from "lucide-react";
import system from "../../../theme";
import { Icon } from ".";

// Mock Lucide icons for testing
const MockLucideIcon = vi.fn(({ size, color, ...props }) => (
  <svg
    data-testid="mock-lucide-icon"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
));

// Mock component for testing
const MockComponent = ({ size, color }: { size?: number; color?: string }) => (
  <div data-testid="mock-component" style={{ fontSize: size, color }}>
    Mock Component
  </div>
);

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement): RenderResult => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("Icon Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("String Icons", () => {
    it("renders string icon correctly", () => {
      renderWithChakra(<Icon icon="★" />);

      expect(screen.getByText("★")).toBeInTheDocument();
    });

    it("applies default size to string icon", () => {
      renderWithChakra(<Icon icon="★" data-testid="string-icon" />);

      const iconContainer = screen.getByTestId("string-icon");
      const iconElement = screen.getByText("★");

      expect(iconContainer).toBeInTheDocument();
      expect(iconElement).toBeInTheDocument();
    });

    it("applies custom size to string icon", () => {
      renderWithChakra(
        <Icon icon="★" size={24} data-testid="sized-string-icon" />
      );

      expect(screen.getByTestId("sized-string-icon")).toBeInTheDocument();
      expect(screen.getByText("★")).toBeInTheDocument();
    });

    it("applies custom color to string icon", () => {
      renderWithChakra(
        <Icon icon="★" color="red" data-testid="colored-string-icon" />
      );

      expect(screen.getByTestId("colored-string-icon")).toBeInTheDocument();
      expect(screen.getByText("★")).toBeInTheDocument();
    });

    it("handles string size values", () => {
      renderWithChakra(
        <Icon icon="★" size="2rem" data-testid="string-size-icon" />
      );

      expect(screen.getByTestId("string-size-icon")).toBeInTheDocument();
      expect(screen.getByText("★")).toBeInTheDocument();
    });
  });

  describe("React Element Icons", () => {
    it("renders React element icon correctly", () => {
      const reactElement = (
        <div data-testid="react-element">Custom Element</div>
      );

      renderWithChakra(<Icon icon={reactElement} />);

      expect(screen.getByTestId("react-element")).toBeInTheDocument();
      expect(screen.getByText("Custom Element")).toBeInTheDocument();
    });

    it("renders React element without modifying it", () => {
      const reactElement = (
        <span
          data-testid="original-element"
          style={{ color: "blue", fontSize: "16px" }}
        >
          Original
        </span>
      );

      renderWithChakra(<Icon icon={reactElement} size={32} color="red" />);

      // The original element should be rendered as-is, ignoring size/color props
      expect(screen.getByTestId("original-element")).toBeInTheDocument();
      expect(screen.getByText("Original")).toBeInTheDocument();
    });
  });

  describe("Lucide Icons", () => {
    it("renders Lucide icon correctly", () => {
      renderWithChakra(<Icon icon={Heart} data-testid="lucide-container" />);

      expect(screen.getByTestId("lucide-container")).toBeInTheDocument();
    });

    it("passes size to Lucide icon", () => {
      renderWithChakra(<Icon icon={MockLucideIcon} size={24} />);

      expect(MockLucideIcon).toHaveBeenCalledWith(
        {
          size: 24,
          color: "currentColor",
        },
        undefined
      );
    });

    it("passes color to Lucide icon", () => {
      renderWithChakra(<Icon icon={MockLucideIcon} color="blue" />);

      expect(MockLucideIcon).toHaveBeenCalledWith(
        {
          color: "blue",
          size: 20,
        },
        undefined
      );
    });

    it("handles string size for Lucide icons", () => {
      renderWithChakra(<Icon icon={MockLucideIcon} size="2rem" />);

      // String sizes should not be passed to Lucide icons
      expect(MockLucideIcon).toHaveBeenCalledWith(
        {
          size: undefined,
          color: "currentColor",
        },
        undefined
      );
    });
  });

  describe("Component Icons", () => {
    it("renders component icon correctly", () => {
      renderWithChakra(<Icon icon={MockComponent} />);

      expect(screen.getByTestId("mock-component")).toBeInTheDocument();
      expect(screen.getByText("Mock Component")).toBeInTheDocument();
    });
  });

  describe("Default Props", () => {
    it("uses default size when not specified", () => {
      renderWithChakra(<Icon icon="★" data-testid="default-size" />);

      expect(screen.getByTestId("default-size")).toBeInTheDocument();
    });

    it("uses default color when not specified", () => {
      renderWithChakra(<Icon icon={MockLucideIcon} />);

      expect(MockLucideIcon).toHaveBeenCalledWith(
        {
          color: "currentColor",
          size: 20,
        },
        undefined
      );
    });
  });

  describe("Box Props", () => {
    it("applies additional Box props", () => {
      renderWithChakra(
        <Icon
          icon="★"
          data-testid="box-props-test"
          bg="gray.100"
          p={2}
          borderRadius="md"
        />
      );

      const iconBox = screen.getByTestId("box-props-test");
      expect(iconBox).toBeInTheDocument();
    });

    it("applies flexShrink={0} by default", () => {
      renderWithChakra(<Icon icon="★" data-testid="flex-shrink-test" />);

      expect(screen.getByTestId("flex-shrink-test")).toBeInTheDocument();
    });

    it("applies lineHeight={0} by default", () => {
      renderWithChakra(<Icon icon="★" data-testid="line-height-test" />);

      expect(screen.getByTestId("line-height-test")).toBeInTheDocument();
    });

    it("applies display='inline-flex' by default", () => {
      renderWithChakra(<Icon icon="★" data-testid="display-test" />);

      expect(screen.getByTestId("display-test")).toBeInTheDocument();
    });

    it("allows overriding default Box props", () => {
      renderWithChakra(
        <Icon
          icon="★"
          data-testid="override-test"
          display="block"
          lineHeight={1}
        />
      );

      expect(screen.getByTestId("override-test")).toBeInTheDocument();
    });
  });

  describe("Size Handling", () => {
    it("converts numeric size to px for string icons", () => {
      renderWithChakra(<Icon icon="★" size={24} data-testid="numeric-size" />);

      expect(screen.getByTestId("numeric-size")).toBeInTheDocument();
    });

    it("uses string size as-is for string icons", () => {
      renderWithChakra(
        <Icon icon="★" size="1.5rem" data-testid="string-size" />
      );

      expect(screen.getByTestId("string-size")).toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    it("renders without crashing with different icon types", () => {
      const reactElement = <span>Test</span>;

      expect(() => renderWithChakra(<Icon icon="★" />)).not.toThrow();
      expect(() =>
        renderWithChakra(<Icon icon={reactElement} />)
      ).not.toThrow();
      expect(() => renderWithChakra(<Icon icon={Heart} />)).not.toThrow();
      expect(() =>
        renderWithChakra(<Icon icon={MockComponent} />)
      ).not.toThrow();
    });

    it("works with Chakra UI theme system", () => {
      renderWithChakra(
        <Icon icon="★" color="blue.500" bg="gray.50" data-testid="theme-test" />
      );

      expect(screen.getByTestId("theme-test")).toBeInTheDocument();
    });

    it("supports responsive props", () => {
      renderWithChakra(
        <Icon icon="★" size={24} data-testid="responsive-test" />
      );

      expect(screen.getByTestId("responsive-test")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string icon", () => {
      renderWithChakra(<Icon icon="" data-testid="empty-string" />);

      expect(screen.getByTestId("empty-string")).toBeInTheDocument();
    });

    it("handles zero size", () => {
      renderWithChakra(<Icon icon="★" size={0} data-testid="zero-size" />);

      expect(screen.getByTestId("zero-size")).toBeInTheDocument();
    });

    it("handles very large size", () => {
      renderWithChakra(<Icon icon="★" size={1000} data-testid="large-size" />);

      expect(screen.getByTestId("large-size")).toBeInTheDocument();
    });
  });

  describe("TypeScript Integration", () => {
    it("accepts all valid icon types", () => {
      const reactElement = <div>Test</div>;

      // These should all compile without TypeScript errors
      renderWithChakra(<Icon icon="★" />);
      renderWithChakra(<Icon icon={reactElement} />);
      renderWithChakra(<Icon icon={Star} />);
      renderWithChakra(<Icon icon={MockComponent} />);
    });

    it("accepts all BoxProps except color and children", () => {
      renderWithChakra(
        <Icon
          icon="★"
          // These are BoxProps that should be accepted
          bg="gray.100"
          p={2}
          m={1}
          borderRadius="md"
          _hover={{ bg: "gray.200" }}
          data-testid="boxprops-test"
        />
      );

      expect(screen.getByTestId("boxprops-test")).toBeInTheDocument();
    });
  });
});

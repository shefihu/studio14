import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  type RenderResult,
} from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { JSX, ReactElement } from "react";
import type {
  ResourceCardProps,
  IconComponent,
} from "../../../types/resources";
import system from "../../../theme";
import ResourceCard from ".";

vi.mock("../../atoms/iconWrapper", () => ({
  Icon: ({
    icon,
    width,
    height,
  }: {
    icon: IconComponent;
    width?: string;
    height?: string;
  }) => (
    <div data-testid="mock-icon" data-width={width} data-height={height}>
      {typeof icon === "function" ? "MockIcon" : icon}
    </div>
  ),
}));

// Mock the Badge component
vi.mock("../../atoms/badge", () => ({
  Badge: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="mock-badge" {...props}>
      {children}
    </div>
  ),
}));

// Mock icon components for testing
const MockIconComponent: IconComponent = ({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    data-testid="test-icon"
    data-width={width}
    data-height={height}
    className={className}
  >
    Test Icon
  </div>
);

const MockAccentIcon = <div data-testid="accent-icon">Accent Icon</div>;

const defaultProps: ResourceCardProps & { onClick?: () => void } = {
  title: "Test Resource Title",
  icon: MockIconComponent,
  accentIcon: MockAccentIcon,
  subtitle: "This is a test subtitle for the resource card",
  tagLabel: "Test Tag",
  accentCorner: "tr",
  accentWidth: "100%",
  accentHeight: "auto",
};

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement): RenderResult => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("ResourceCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Content Rendering", () => {
    it("renders all required content correctly", () => {
      renderWithChakra(<ResourceCard {...defaultProps} />);

      // Check if all text content is rendered
      expect(screen.getByText("Test Resource Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test subtitle for the resource card")
      ).toBeInTheDocument();
      expect(screen.getByText("Test Tag")).toBeInTheDocument();

      // Check if icons are rendered
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      expect(screen.getByTestId("accent-icon")).toBeInTheDocument();
      expect(screen.getByTestId("mock-badge")).toBeInTheDocument();
    });

    it("renders with functional icon component", () => {
      const FunctionalIcon = (): JSX.Element => (
        <div data-testid="functional-icon">Functional Icon</div>
      );

      renderWithChakra(
        <ResourceCard {...defaultProps} icon={FunctionalIcon} />
      );

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it("applies correct CSS classes for animations", () => {
      renderWithChakra(
        <ResourceCard {...defaultProps} data-testid="resource-card" />
      );

      const accentIcon = screen.getByTestId("accent-icon").parentElement;
      const mainIcon = screen.getByTestId("mock-icon").parentElement;
      const title = screen.getByText("Test Resource Title");
      const subtitle = screen.getByText(
        "This is a test subtitle for the resource card"
      );
      const badge = screen.getByTestId("mock-badge");

      expect(accentIcon).toHaveClass("accent-icon");
      expect(mainIcon).toHaveClass("main-icon");
      expect(title).toHaveClass("card-title");
      expect(subtitle).toHaveClass("card-subtitle");
      expect(badge).toHaveClass("card-badge");
    });
  });

  describe("Click Interaction", () => {
    it("handles onClick callback when provided", () => {
      const mockOnClick = vi.fn();
      renderWithChakra(
        <ResourceCard {...defaultProps} onClick={mockOnClick} />
      );

      const cardElement = screen
        .getByText("Test Resource Title")
        .closest("div");
      expect(cardElement).not.toBeNull();

      if (cardElement) {
        fireEvent.click(cardElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      }
    });

    it("renders without onClick when not provided", () => {
      const { container } = renderWithChakra(
        <ResourceCard {...defaultProps} />
      );

      // Card should still render properly without onClick handler
      expect(screen.getByText("Test Resource Title")).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies cursor pointer style", () => {
      const { container } = renderWithChakra(
        <ResourceCard {...defaultProps} />
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveStyle({ cursor: "pointer" });
    });
  });

  describe("Accent Corner Positioning", () => {
    it("applies correct positioning for top-right corner", () => {
      renderWithChakra(<ResourceCard {...defaultProps} accentCorner="tr" />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toHaveStyle({
        right: "0",
        left: "auto",
      });
    });

    it("applies correct positioning for top-left corner", () => {
      renderWithChakra(<ResourceCard {...defaultProps} accentCorner="tl" />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toHaveStyle({
        left: "0",
        right: "auto",
      });
    });

    it("handles top center positioning", () => {
      renderWithChakra(<ResourceCard {...defaultProps} accentCorner="t" />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toHaveStyle({ left: "0" });
    });
  });

  describe("Custom Dimensions", () => {
    it("applies custom accent width and height", () => {
      const customProps = {
        ...defaultProps,
        accentWidth: "50%",
        accentHeight: "200px",
      };

      renderWithChakra(<ResourceCard {...customProps} />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toHaveStyle({
        width: "50%",
        height: "200px",
      });
    });

    it("uses default dimensions when not specified", () => {
      renderWithChakra(<ResourceCard {...defaultProps} />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toHaveStyle({
        width: "100%",
        height: "auto",
      });
    });

    it("handles responsive height configuration", () => {
      const customProps = {
        ...defaultProps,
        accentHeight: { base: "150px", lg: "200px" },
      };

      renderWithChakra(<ResourceCard {...customProps} />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toBeInTheDocument();
    });
  });

  describe("Edge Cases and Props Validation", () => {
    it("handles empty strings for text content", () => {
      const emptyProps = {
        ...defaultProps,
        title: "",
        subtitle: "",
        tagLabel: "",
      };

      renderWithChakra(<ResourceCard {...emptyProps} />);

      // Component should still render without crashing
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      expect(screen.getByTestId("accent-icon")).toBeInTheDocument();
    });

    it("renders with minimal required props", () => {
      const minimalProps: ResourceCardProps = {
        title: "Minimal Title",
        icon: MockIconComponent,
        accentIcon: MockAccentIcon,
        subtitle: "Minimal subtitle",
        tagLabel: "Tag",
        accentCorner: "tr",
      };

      expect(() =>
        renderWithChakra(<ResourceCard {...minimalProps} />)
      ).not.toThrow();
    });

    it("works with different accent corner values", () => {
      const corners: Array<"tr" | "tl" | "t"> = ["tr", "tl", "t"];

      corners.forEach((corner) => {
        const { unmount } = renderWithChakra(
          <ResourceCard {...defaultProps} accentCorner={corner} />
        );

        expect(screen.getByTestId("accent-icon")).toBeInTheDocument();
        unmount();
      });
    });

    it("maintains accessibility with proper semantic structure", () => {
      renderWithChakra(<ResourceCard {...defaultProps} />);

      // Check for heading element
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Test Resource Title");
    });

    it("applies correct z-index for layering", () => {
      renderWithChakra(<ResourceCard {...defaultProps} />);

      const accentContainer = screen.getByTestId("accent-icon").parentElement;
      expect(accentContainer).toHaveStyle({ zIndex: "-1" });
    });
  });
});

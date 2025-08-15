import { describe, it, expect, vi } from "vitest";
import { render, screen, type RenderResult } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import system from "../../theme";
import Home from ".";
import type { ReactElement, ReactNode } from "react";

// Define types for mocked components
interface HeroProps {
  title: string;
  description: string;
}

interface ResourceProviderProps {
  children: ReactNode;
}

// Mock all the child components
vi.mock("../../components/organisms/hero", () => ({
  Hero: ({ title, description }: HeroProps): ReactElement => (
    <div data-testid="hero">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("../../components/pages/home/resourceFilters/Index", () => ({
  default: (): ReactElement => (
    <div data-testid="resource-filters">Resource Filters</div>
  ),
}));

vi.mock("../../components/pages/home/resourceList/Index", () => ({
  default: (): ReactElement => (
    <div data-testid="resource-list">Resource List</div>
  ),
}));

vi.mock("../../components/molecules/resourceFilterModal/Index", () => ({
  default: (): ReactElement => (
    <div data-testid="resource-filter-modal">Resource Filter Modal</div>
  ),
}));

// Mock the ResourceProvider context
vi.mock("../../contexts/ResourceProvider", () => ({
  ResourceProvider: ({ children }: ResourceProviderProps): ReactElement => (
    <div data-testid="resource-provider">{children}</div>
  ),
}));

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement): RenderResult => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("Home Component", () => {
  it("renders all main components", () => {
    renderWithChakra(<Home />);

    // Check if Hero component is rendered with correct props
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText(/Consectetur adipiscing elit/)).toBeInTheDocument();

    // Check if ResourceFilterModal is rendered
    expect(screen.getByTestId("resource-filter-modal")).toBeInTheDocument();

    // Check if ResourceFilters is rendered
    expect(screen.getByTestId("resource-filters")).toBeInTheDocument();

    // Check if ResourceList is rendered
    expect(screen.getByTestId("resource-list")).toBeInTheDocument();

    // Check if ResourceProvider wraps the content
    expect(screen.getByTestId("resource-provider")).toBeInTheDocument();
  });

  it("has proper component structure", () => {
    renderWithChakra(<Home />);

    // Verify the main container structure exists
    const container = screen.getByTestId("resource-provider");
    expect(container).toBeInTheDocument();

    // Verify both filters and list are present (indicating the flex layout)
    expect(screen.getByTestId("resource-filters")).toBeInTheDocument();
    expect(screen.getByTestId("resource-list")).toBeInTheDocument();
  });

  it("passes correct props to Hero component", () => {
    renderWithChakra(<Home />);

    // Check Hero receives correct title and description
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue"
      )
    ).toBeInTheDocument();
  });
});

// Additional test file for integration testing (optional)
describe("Home Component Integration", () => {
  it("renders without crashing when all dependencies are available", () => {
    expect(() => renderWithChakra(<Home />)).not.toThrow();
  });

  it("maintains component hierarchy", () => {
    const { container } = renderWithChakra(<Home />);

    // Check that the component tree structure is maintained
    expect(container.firstChild).toBeTruthy();

    // Verify key components are in the DOM
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("resource-filters")).toBeInTheDocument();
    expect(screen.getByTestId("resource-list")).toBeInTheDocument();
  });
});

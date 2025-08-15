import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResourceContext } from "../ResourceContext";
import { useResourceContext } from "../../hooks/useResourceContext";
import type { ResourceContextType } from "../../types/resources";

// Test component that consumes the context
const TestContextConsumer = () => {
  const context = useResourceContext();

  return (
    <div>
      <div data-testid="resources-count">{context.resources.length}</div>
      <div data-testid="filtered-count">{context.filteredResources.length}</div>
      <div data-testid="loading">
        {context.isLoading ? "loading" : "loaded"}
      </div>
      <div data-testid="search-query">{context.filterState.searchQuery}</div>
      <div data-testid="principles-count">
        {context.filterState.selectedFoundationalPrinciples.length}
      </div>
      <div data-testid="staged-search">
        {context.stagedFilterState.searchQuery}
      </div>
    </div>
  );
};

describe("ResourceContext", () => {
  const mockContextValue: ResourceContextType = {
    resources: [
      {
        id: "1",
        title: "Test Resource",
        subTitle: "Test Description",
        icon: () => null,
        tagLabel: "Test",
        accentIcon: null,
        accentCorner: "tr",
        foundationalPrinciple: "Technical",
        category: "Development",
        documentType: "PDF",
      },
    ],
    filteredResources: [
      {
        id: "1",
        title: "Test Resource",
        subTitle: "Test Description",
        icon: () => null,
        tagLabel: "Test",
        accentIcon: null,
        accentCorner: "tr",
        foundationalPrinciple: "Technical",
        category: "Development",
        documentType: "PDF",
      },
    ],
    filterState: {
      searchQuery: "test query",
      selectedFoundationalPrinciples: ["Technical"],
      selectedDocumentTypes: ["PDF"],
      selectedCategories: ["Development"],
    },
    isLoading: false,
    setSearchQuery: vi.fn(),
    toggleFoundationalPrinciple: vi.fn(),
    toggleDocumentType: vi.fn(),
    toggleCategory: vi.fn(),
    clearAllFilters: vi.fn(),
    clearFilter: vi.fn(),
    stagedFilterState: {
      searchQuery: "staged query",
      selectedFoundationalPrinciples: [],
      selectedDocumentTypes: [],
      selectedCategories: [],
    },
    setStagedSearchQuery: vi.fn(),
    toggleStagedFoundationalPrinciple: vi.fn(),
    toggleStagedDocumentType: vi.fn(),
    toggleStagedCategory: vi.fn(),
    applyStagedFilters: vi.fn(),
    resetStagedFilters: vi.fn(),
    initializeStagedFilters: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides context value to consumer components", () => {
    render(
      <ResourceContext.Provider value={mockContextValue}>
        <TestContextConsumer />
      </ResourceContext.Provider>
    );

    expect(screen.getByTestId("resources-count")).toHaveTextContent("1");
    expect(screen.getByTestId("filtered-count")).toHaveTextContent("1");
    expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    expect(screen.getByTestId("search-query")).toHaveTextContent("test query");
    expect(screen.getByTestId("principles-count")).toHaveTextContent("1");
    expect(screen.getByTestId("staged-search")).toHaveTextContent(
      "staged query"
    );
  });

  it("handles undefined context gracefully", () => {
    // This should throw an error when useResourceContext is called without provider
    expect(() => {
      render(<TestContextConsumer />);
    }).toThrow("useResourceContext must be used within a ResourceProvider");
  });

  it("provides all required properties and methods", () => {
    render(
      <ResourceContext.Provider value={mockContextValue}>
        <TestContextConsumer />
      </ResourceContext.Provider>
    );

    // Verify that the component renders without errors,
    // which means all required context properties are available
    expect(screen.getByTestId("resources-count")).toBeInTheDocument();
    expect(screen.getByTestId("filtered-count")).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByTestId("search-query")).toBeInTheDocument();
    expect(screen.getByTestId("principles-count")).toBeInTheDocument();
    expect(screen.getByTestId("staged-search")).toBeInTheDocument();
  });

  it("updates when context value changes", () => {
    const { rerender } = render(
      <ResourceContext.Provider value={mockContextValue}>
        <TestContextConsumer />
      </ResourceContext.Provider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("loaded");

    // Update context value
    const updatedContextValue: ResourceContextType = {
      ...mockContextValue,
      isLoading: true,
      filterState: {
        ...mockContextValue.filterState,
        searchQuery: "updated query",
      },
    };

    rerender(
      <ResourceContext.Provider value={updatedContextValue}>
        <TestContextConsumer />
      </ResourceContext.Provider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
    expect(screen.getByTestId("search-query")).toHaveTextContent(
      "updated query"
    );
  });

  it("maintains type safety with ResourceContextType interface", () => {
    const contextValue: ResourceContextType = mockContextValue;

    render(
      <ResourceContext.Provider value={contextValue}>
        <TestContextConsumer />
      </ResourceContext.Provider>
    );

    // Type assertion to ensure the context provides the correct structure
    expect(typeof contextValue.resources).toBe("object");
    expect(typeof contextValue.filteredResources).toBe("object");
    expect(typeof contextValue.filterState).toBe("object");
    expect(typeof contextValue.stagedFilterState).toBe("object");
    expect(typeof contextValue.isLoading).toBe("boolean");
    expect(typeof contextValue.setSearchQuery).toBe("function");
    expect(typeof contextValue.toggleFoundationalPrinciple).toBe("function");
    expect(typeof contextValue.toggleDocumentType).toBe("function");
    expect(typeof contextValue.toggleCategory).toBe("function");
    expect(typeof contextValue.clearAllFilters).toBe("function");
    expect(typeof contextValue.clearFilter).toBe("function");
    expect(typeof contextValue.setStagedSearchQuery).toBe("function");
    expect(typeof contextValue.toggleStagedFoundationalPrinciple).toBe(
      "function"
    );
    expect(typeof contextValue.toggleStagedDocumentType).toBe("function");
    expect(typeof contextValue.toggleStagedCategory).toBe("function");
    expect(typeof contextValue.applyStagedFilters).toBe("function");
    expect(typeof contextValue.resetStagedFilters).toBe("function");
    expect(typeof contextValue.initializeStagedFilters).toBe("function");
  });
});

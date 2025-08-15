import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ResourceContextType } from "../../types/resources";

// Mock React's useContext at the top level without referencing any variables
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

// Import after mocking
import { useContext } from "react";
import { useResourceContext } from "../useResourceContext";

// Cast the mocked useContext to get access to mock methods
const mockUseContext = useContext as ReturnType<typeof vi.fn>;

describe("useResourceContext Hook", () => {
  const mockContextValue: ResourceContextType = {
    resources: [
      {
        id: "1",
        title: "Test Resource",
        subTitle: "Test Description",
        icon: () => null,
        tagLabel: "Test Tag",
        accentIcon: null,
        accentCorner: "tr",
      },
    ],
    filteredResources: [],
    filterState: {
      searchQuery: "",
      selectedFoundationalPrinciples: [],
      selectedDocumentTypes: [],
      selectedCategories: [],
    },
    isLoading: false,
    setSearchQuery: vi.fn(),
    toggleFoundationalPrinciple: vi.fn(),
    toggleDocumentType: vi.fn(),
    toggleCategory: vi.fn(),
    clearAllFilters: vi.fn(),
    clearFilter: vi.fn(),
    stagedFilterState: {
      searchQuery: "",
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

  it("throws error when used outside ResourceProvider", () => {
    // Mock useContext to return undefined (no provider)
    mockUseContext.mockReturnValue(undefined);

    expect(() => {
      renderHook(() => useResourceContext());
    }).toThrow("useResourceContext must be used within a ResourceProvider");
  });

  it("returns context value when used within ResourceProvider", () => {
    // Mock useContext to return the mock context value
    mockUseContext.mockReturnValue(mockContextValue);

    const { result } = renderHook(() => useResourceContext());

    expect(result.current).toEqual(mockContextValue);
    expect(result.current.resources).toHaveLength(1);
    expect(result.current.resources[0].title).toBe("Test Resource");
  });

  it("provides access to all context methods", () => {
    mockUseContext.mockReturnValue(mockContextValue);

    const { result } = renderHook(() => useResourceContext());

    // Test that all required methods are available
    expect(typeof result.current.setSearchQuery).toBe("function");
    expect(typeof result.current.toggleFoundationalPrinciple).toBe("function");
    expect(typeof result.current.toggleDocumentType).toBe("function");
    expect(typeof result.current.toggleCategory).toBe("function");
    expect(typeof result.current.clearAllFilters).toBe("function");
    expect(typeof result.current.clearFilter).toBe("function");
    expect(typeof result.current.setStagedSearchQuery).toBe("function");
    expect(typeof result.current.toggleStagedFoundationalPrinciple).toBe(
      "function"
    );
    expect(typeof result.current.toggleStagedDocumentType).toBe("function");
    expect(typeof result.current.toggleStagedCategory).toBe("function");
    expect(typeof result.current.applyStagedFilters).toBe("function");
    expect(typeof result.current.resetStagedFilters).toBe("function");
    expect(typeof result.current.initializeStagedFilters).toBe("function");
  });

  it("provides access to state properties", () => {
    mockUseContext.mockReturnValue(mockContextValue);

    const { result } = renderHook(() => useResourceContext());

    // Test that all state properties are available
    expect(Array.isArray(result.current.resources)).toBe(true);
    expect(Array.isArray(result.current.filteredResources)).toBe(true);
    expect(typeof result.current.filterState).toBe("object");
    expect(typeof result.current.stagedFilterState).toBe("object");
    expect(typeof result.current.isLoading).toBe("boolean");

    // Test filter state structure
    expect(result.current.filterState).toHaveProperty("searchQuery");
    expect(result.current.filterState).toHaveProperty(
      "selectedFoundationalPrinciples"
    );
    expect(result.current.filterState).toHaveProperty("selectedDocumentTypes");
    expect(result.current.filterState).toHaveProperty("selectedCategories");

    // Test staged filter state structure
    expect(result.current.stagedFilterState).toHaveProperty("searchQuery");
    expect(result.current.stagedFilterState).toHaveProperty(
      "selectedFoundationalPrinciples"
    );
    expect(result.current.stagedFilterState).toHaveProperty(
      "selectedDocumentTypes"
    );
    expect(result.current.stagedFilterState).toHaveProperty(
      "selectedCategories"
    );
  });

  it("maintains type safety with ResourceContextType", () => {
    const customMockValue: ResourceContextType = {
      ...mockContextValue,
      isLoading: true,
      filterState: {
        searchQuery: "test search",
        selectedFoundationalPrinciples: ["Technical Skills"],
        selectedDocumentTypes: ["PDF"],
        selectedCategories: ["Development"],
      },
    };

    mockUseContext.mockReturnValue(customMockValue);

    const { result } = renderHook(() => useResourceContext());

    // Verify the hook returns the exact type structure
    expect(result.current.isLoading).toBe(true);
    expect(result.current.filterState.searchQuery).toBe("test search");
    expect(result.current.filterState.selectedFoundationalPrinciples).toContain(
      "Technical Skills"
    );
    expect(result.current.filterState.selectedDocumentTypes).toContain("PDF");
    expect(result.current.filterState.selectedCategories).toContain(
      "Development"
    );

    // Type check - this should compile without errors if types are correct
    const contextValue: ResourceContextType = result.current;
    expect(contextValue).toBeDefined();
  });
});

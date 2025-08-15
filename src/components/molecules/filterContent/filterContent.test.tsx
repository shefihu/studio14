import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import system from "../../../theme";

import type { ReactElement } from "react";
import FilterContent from ".";

// Mock the useResourceContext hook
const mockResourceContext = {
  resources: [],
  filteredResources: [],
  filterState: {
    searchQuery: "",
    selectedFoundationalPrinciples: ["Secure Base"],
    selectedDocumentTypes: ["PDF"],
    selectedCategories: ["Category 1"],
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
    selectedFoundationalPrinciples: ["Wellbeing"],
    selectedDocumentTypes: ["Video"],
    selectedCategories: ["Category 2"],
  },
  setStagedSearchQuery: vi.fn(),
  toggleStagedFoundationalPrinciple: vi.fn(),
  toggleStagedDocumentType: vi.fn(),
  toggleStagedCategory: vi.fn(),
  applyStagedFilters: vi.fn(),
  resetStagedFilters: vi.fn(),
  initializeStagedFilters: vi.fn(),
};

vi.mock("../../../hooks/useResourceContext", () => ({
  useResourceContext: () => mockResourceContext,
}));

// Mock the FilterGroup component
vi.mock("../filterGroup/Index", () => ({
  default: vi.fn((componentProps) => (
    <div data-testid="filter-group">
      <div data-testid="filter-title">{componentProps.title}</div>
      <div data-testid="filter-type">{componentProps.filterType}</div>
      <div data-testid="is-staged">
        {componentProps.isStaged ? "staged" : "normal"}
      </div>
      <div data-testid="filters-count">{componentProps.filters.length}</div>
    </div>
  )),
}));

// Mock the dummy data
vi.mock("../../../data/dummy/resources", () => ({
  foundationFilters: [
    "Secure Base",
    "Sense of Appreciation",
    "Learning Organisation",
    "Mission and Vision",
    "Wellbeing",
  ],
  documentTypeFilters: ["PDF", "Video", "Link", "DOC"],
}));

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement) => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("FilterContent Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main filters heading correctly", () => {
    renderWithChakra(<FilterContent />);

    const heading = screen.getByText("Filters");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe("h4");
  });

  it("renders both FilterGroup components with correct titles", () => {
    renderWithChakra(<FilterContent />);

    expect(screen.getByText("Key Foundational Principles")).toBeInTheDocument();
    expect(screen.getByText("Document type")).toBeInTheDocument();

    const filterGroups = screen.getAllByTestId("filter-group");
    expect(filterGroups).toHaveLength(2);
  });

  it("passes correct filter types to FilterGroup components", () => {
    renderWithChakra(<FilterContent />);

    const filterTypes = screen.getAllByTestId("filter-type");
    expect(filterTypes[0]).toHaveTextContent("foundational");
    expect(filterTypes[1]).toHaveTextContent("documentType");
  });

  it("defaults isStaged to false when not provided", () => {
    renderWithChakra(<FilterContent />);

    const stagedStates = screen.getAllByTestId("is-staged");
    stagedStates.forEach((state) => {
      expect(state).toHaveTextContent("normal");
    });
  });

  it("passes isStaged prop correctly to FilterGroup components", () => {
    renderWithChakra(<FilterContent isStaged={true} />);

    const stagedStates = screen.getAllByTestId("is-staged");
    stagedStates.forEach((state) => {
      expect(state).toHaveTextContent("staged");
    });
  });
});

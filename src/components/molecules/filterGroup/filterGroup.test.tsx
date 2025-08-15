import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, type RenderResult } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { ReactElement } from "react";
import type { ResourceContextType } from "../../../types/resources";
import system from "../../../theme";
import FilterGroup from ".";

// Mock the useResourceContext hook
const mockResourceContext: ResourceContextType = {
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

const foundationFilters = [
  "Secure Base",
  "Sense of Appreciation",
  "Learning Organisation",
  "Mission and Vision",
  "Wellbeing",
];

const documentTypeFilters = ["PDF", "Video", "Link", "DOC"];
const categoryFilters = ["Category 1", "Category 2", "Category 3"];

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement): RenderResult => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("FilterGroup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Content Rendering", () => {
    it("renders title and all filter options correctly", () => {
      renderWithChakra(
        <FilterGroup
          title="Foundational Principles"
          filters={foundationFilters}
          filterType="foundational"
        />
      );

      // Check title rendering
      expect(screen.getByText("Foundational Principles")).toBeInTheDocument();

      // Check all filter options are rendered
      foundationFilters.forEach((filter) => {
        expect(screen.getByText(filter)).toBeInTheDocument();
      });
    });

    it("renders checkboxes for each filter option", () => {
      renderWithChakra(
        <FilterGroup
          title="Document Types"
          filters={documentTypeFilters}
          filterType="documentType"
        />
      );

      // Check that each filter has a checkbox
      documentTypeFilters.forEach((filter) => {
        const checkbox = screen.getByRole("checkbox", { name: filter });
        expect(checkbox).toBeInTheDocument();
      });
    });

    it("applies correct styling to title", () => {
      renderWithChakra(
        <FilterGroup
          title="Categories"
          filters={categoryFilters}
          filterType="category"
        />
      );

      const title = screen.getByText("Categories");
      expect(title).toHaveStyle({
        fontSize: "16px",
        fontWeight: "700",
        color: "#3F3F3F",
      });
    });

    it("renders custom fill elements for checkbox styling", () => {
      const { container } = renderWithChakra(
        <FilterGroup
          title="Test Filters"
          filters={["Filter 1"]}
          filterType="foundational"
        />
      );

      const customFill = container.querySelector(".custom-fill");
      expect(customFill).toBeInTheDocument();
      expect(customFill).toHaveStyle({
        width: "13px",
        height: "12px",
        background: "#3F3F3F",
        opacity: "0",
      });
    });
  });

  describe("Normal Filter State Management", () => {
    it("shows correct selected state for foundational principles", () => {
      renderWithChakra(
        <FilterGroup
          title="Foundational Principles"
          filters={foundationFilters}
          filterType="foundational"
          isStaged={false}
        />
      );

      const secureBaseCheckbox = screen.getByRole("checkbox", {
        name: "Secure Base",
      });
      const wellbeingCheckbox = screen.getByRole("checkbox", {
        name: "Wellbeing",
      });

      expect(secureBaseCheckbox).toBeChecked();
      expect(wellbeingCheckbox).not.toBeChecked();
    });

    it("shows correct selected state for document types", () => {
      renderWithChakra(
        <FilterGroup
          title="Document Types"
          filters={documentTypeFilters}
          filterType="documentType"
          isStaged={false}
        />
      );

      const pdfCheckbox = screen.getByRole("checkbox", { name: "PDF" });
      const videoCheckbox = screen.getByRole("checkbox", { name: "Video" });

      expect(pdfCheckbox).toBeChecked();
      expect(videoCheckbox).not.toBeChecked();
    });

    it("shows correct selected state for categories", () => {
      renderWithChakra(
        <FilterGroup
          title="Categories"
          filters={categoryFilters}
          filterType="category"
          isStaged={false}
        />
      );

      const category1Checkbox = screen.getByRole("checkbox", {
        name: "Category 1",
      });
      const category2Checkbox = screen.getByRole("checkbox", {
        name: "Category 2",
      });

      expect(category1Checkbox).toBeChecked();
      expect(category2Checkbox).not.toBeChecked();
    });
  });

  describe("Staged Filter State Management", () => {
    it("shows correct staged selected state for foundational principles", () => {
      renderWithChakra(
        <FilterGroup
          title="Foundational Principles"
          filters={foundationFilters}
          filterType="foundational"
          isStaged={true}
        />
      );

      const secureBaseCheckbox = screen.getByRole("checkbox", {
        name: "Secure Base",
      });
      const wellbeingCheckbox = screen.getByRole("checkbox", {
        name: "Wellbeing",
      });

      expect(secureBaseCheckbox).not.toBeChecked();
      expect(wellbeingCheckbox).toBeChecked();
    });

    it("shows correct staged selected state for document types", () => {
      renderWithChakra(
        <FilterGroup
          title="Document Types"
          filters={documentTypeFilters}
          filterType="documentType"
          isStaged={true}
        />
      );

      const pdfCheckbox = screen.getByRole("checkbox", { name: "PDF" });
      const videoCheckbox = screen.getByRole("checkbox", { name: "Video" });

      expect(pdfCheckbox).not.toBeChecked();
      expect(videoCheckbox).toBeChecked();
    });

    it("shows correct staged selected state for categories", () => {
      renderWithChakra(
        <FilterGroup
          title="Categories"
          filters={categoryFilters}
          filterType="category"
          isStaged={true}
        />
      );

      const category1Checkbox = screen.getByRole("checkbox", {
        name: "Category 1",
      });
      const category2Checkbox = screen.getByRole("checkbox", {
        name: "Category 2",
      });

      expect(category1Checkbox).not.toBeChecked();
      expect(category2Checkbox).toBeChecked();
    });
  });

  describe("Edge Cases and Props Validation", () => {
    it("handles empty filters array", () => {
      renderWithChakra(
        <FilterGroup
          title="Empty Filters"
          filters={[]}
          filterType="foundational"
        />
      );

      expect(screen.getByText("Empty Filters")).toBeInTheDocument();
      // Should not render any checkboxes
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });

    it("handles single filter item", () => {
      renderWithChakra(
        <FilterGroup
          title="Single Filter"
          filters={["Only Filter"]}
          filterType="category"
        />
      );

      expect(screen.getByText("Single Filter")).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Only Filter" })
      ).toBeInTheDocument();
    });

    it("maintains proper fieldset structure for accessibility", () => {
      const { container } = renderWithChakra(
        <FilterGroup
          title="Accessibility Test"
          filters={foundationFilters}
          filterType="foundational"
        />
      );

      // Check for fieldset element
      const fieldset = container.querySelector("fieldset");
      expect(fieldset).toBeInTheDocument();

      // Check for legend
      const legend = screen.getByText("Accessibility Test");
      expect(legend.tagName.toLowerCase()).toBe("legend");
    });

    it("applies hover styles correctly", () => {
      const { container } = renderWithChakra(
        <FilterGroup
          title="Hover Test"
          filters={["Test Filter"]}
          filterType="foundational"
        />
      );

      const checkboxLabel = container.querySelector(".checkbox-label");
      expect(checkboxLabel).toBeInTheDocument();
      expect(checkboxLabel).toHaveClass("checkbox-label");
    });

    it("defaults isStaged to false when not provided", () => {
      renderWithChakra(
        <FilterGroup
          title="Default Staged"
          filters={foundationFilters}
          filterType="foundational"
        />
      );

      // Should use normal filter state (Secure Base is selected in normal state)
      const secureBaseCheckbox = screen.getByRole("checkbox", {
        name: "Secure Base",
      });
      expect(secureBaseCheckbox).toBeChecked();
    });
  });
});

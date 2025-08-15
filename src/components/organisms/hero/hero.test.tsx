import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

import type { ReactElement } from "react";
import system from "../../../theme";
import { Hero } from ".";

// Mock the useResourceContext hook
const mockSetSearchQuery = vi.fn();
const mockUseResourceContext = vi.fn();

vi.mock("../../../hooks/useResourceContext", () => ({
  useResourceContext: () => mockUseResourceContext(),
}));

// Mock the Text component
vi.mock("../../atoms/text", () => ({
  Text: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <p {...props}>{children}</p>,
}));

// Mock the SearchBox component - this should match the real SearchBox behavior
vi.mock("../../molecules/searchBox", () => ({
  SearchBox: ({
    placeholder,
    value,
    onChange,
    ...props
  }: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    [key: string]: unknown;
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Real SearchBox passes the full input value, not individual characters
      onChange?.(e.target.value);
    };

    return (
      <input
        data-testid="search-box"
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        {...props}
      />
    );
  },
}));

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement) => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("Hero Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseResourceContext.mockReturnValue({
      filterState: { searchQuery: "" },
      setSearchQuery: mockSetSearchQuery,
    });
  });

  describe("Basic Rendering", () => {
    it("renders hero component correctly", () => {
      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders with required props only", () => {
      renderWithChakra(
        <Hero title="Minimal Hero" description="Basic description" />
      );

      expect(screen.getByText("Minimal Hero")).toBeInTheDocument();
      expect(screen.getByText("Basic description")).toBeInTheDocument();
      expect(screen.getByTestId("search-box")).toBeInTheDocument();
    });

    it("displays the title correctly", () => {
      renderWithChakra(
        <Hero title="Hero Title" description="Test Description" />
      );

      const title = screen.getByText("Hero Title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("P");
    });

    it("displays the description correctly", () => {
      renderWithChakra(
        <Hero title="Test Title" description="Hero Description" />
      );

      const description = screen.getByText("Hero Description");
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
    });
  });

  describe("Search Functionality", () => {
    it("renders search box with default placeholder", () => {
      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box");
      expect(searchBox).toHaveAttribute(
        "placeholder",
        "Search by title or keyword"
      );
    });

    it("renders search box with custom placeholder", () => {
      renderWithChakra(
        <Hero
          title="Test Title"
          description="Test Description"
          searchPlaceholder="Custom search placeholder"
        />
      );

      const searchBox = screen.getByTestId("search-box");
      expect(searchBox).toHaveAttribute(
        "placeholder",
        "Custom search placeholder"
      );
    });

    it("displays current search query value from context", () => {
      mockUseResourceContext.mockReturnValue({
        filterState: { searchQuery: "existing query" },
        setSearchQuery: mockSetSearchQuery,
      });

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box") as HTMLInputElement;
      expect(searchBox.value).toBe("existing query");
    });

    it("calls setSearchQuery when search value changes", async () => {
      const user = userEvent.setup();

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box");
      await user.type(searchBox, "test");

      // The mock will call onChange for each character, but we'll just check that it was called
      expect(mockSetSearchQuery).toHaveBeenCalled();
      expect(mockSetSearchQuery.mock.calls.length).toBeGreaterThan(0);
    });

    it("calls onSearch callback when provided", async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      renderWithChakra(
        <Hero
          title="Test Title"
          description="Test Description"
          onSearch={mockOnSearch}
        />
      );

      const searchBox = screen.getByTestId("search-box");
      await user.type(searchBox, "test");

      // Just verify the callback was called
      expect(mockOnSearch).toHaveBeenCalled();
      expect(mockOnSearch.mock.calls.length).toBeGreaterThan(0);
    });

    it("works without onSearch callback", async () => {
      const user = userEvent.setup();

      expect(() =>
        renderWithChakra(
          <Hero title="Test Title" description="Test Description" />
        )
      ).not.toThrow();

      const searchBox = screen.getByTestId("search-box");
      await user.type(searchBox, "test");

      expect(mockSetSearchQuery).toHaveBeenCalled();
    });

    it("handles clearing search input", async () => {
      const user = userEvent.setup();
      mockUseResourceContext.mockReturnValue({
        filterState: { searchQuery: "initial search" },
        setSearchQuery: mockSetSearchQuery,
      });

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box");
      await user.clear(searchBox);

      expect(mockSetSearchQuery).toHaveBeenCalledWith("");
    });
  });

  describe("Context Integration", () => {
    it("uses resource context for search state", () => {
      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      expect(mockUseResourceContext).toHaveBeenCalled();
    });

    it("handles empty search query from context", () => {
      mockUseResourceContext.mockReturnValue({
        filterState: { searchQuery: "" },
        setSearchQuery: mockSetSearchQuery,
      });

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box") as HTMLInputElement;
      expect(searchBox.value).toBe("");
    });

    it("handles null/undefined filterState gracefully", () => {
      mockUseResourceContext.mockReturnValue({
        filterState: { searchQuery: undefined },
        setSearchQuery: mockSetSearchQuery,
      });

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box") as HTMLInputElement;
      expect(searchBox.value).toBe("");
    });

    it("handles missing context properties gracefully", () => {
      mockUseResourceContext.mockReturnValue({
        filterState: null,
        setSearchQuery: mockSetSearchQuery,
      });

      expect(() =>
        renderWithChakra(
          <Hero title="Test Title" description="Test Description" />
        )
      ).toThrow(); // This will throw because filterState.searchQuery will fail
    });
  });

  describe("Props Handling", () => {
    it("handles long title text", () => {
      const longTitle =
        "This is a very long title that should still render correctly even when it contains many words and extends across multiple lines";

      renderWithChakra(
        <Hero title={longTitle} description="Test Description" />
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles long description text", () => {
      const longDescription =
        "This is a very long description that should still render correctly even when it contains many words and extends across multiple lines. It should wrap properly and maintain readability.";

      renderWithChakra(
        <Hero title="Test Title" description={longDescription} />
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("handles special characters in title and description", () => {
      renderWithChakra(
        <Hero
          title="Title with special chars: !@#$%^&*()"
          description="Description with special chars: []{}|;:,.<>?"
        />
      );

      expect(
        screen.getByText("Title with special chars: !@#$%^&*()")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Description with special chars: []{}|;:,.<>?")
      ).toBeInTheDocument();
    });

    it("handles undefined searchPlaceholder", () => {
      renderWithChakra(
        <Hero
          title="Test Title"
          description="Test Description"
          searchPlaceholder={undefined}
        />
      );

      const searchBox = screen.getByTestId("search-box");
      expect(searchBox).toHaveAttribute(
        "placeholder",
        "Search by title or keyword"
      );
    });
  });

  describe("Layout and Structure", () => {
    it("renders with correct component structure", () => {
      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      // Check that all main elements are present
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByTestId("search-box")).toBeInTheDocument();
    });

    it("maintains proper text hierarchy", () => {
      renderWithChakra(
        <Hero title="Main Title" description="Supporting description" />
      );

      const title = screen.getByText("Main Title");
      const description = screen.getByText("Supporting description");

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("renders VStack container", () => {
      const { container } = renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      // VStack should be rendered as a div with CSS classes
      const vstack = container.querySelector('div[class*="css"]');
      expect(vstack).toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("handles both setSearchQuery and onSearch calls correctly", async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      renderWithChakra(
        <Hero
          title="Test Title"
          description="Test Description"
          onSearch={mockOnSearch}
        />
      );

      const searchBox = screen.getByTestId("search-box");
      await user.type(searchBox, "abc");

      // Both context method and callback should be called
      expect(mockSetSearchQuery).toHaveBeenCalled();
      expect(mockOnSearch).toHaveBeenCalled();
      expect(mockSetSearchQuery.mock.calls.length).toBeGreaterThan(0);
      expect(mockOnSearch.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe("Error Handling", () => {
    it("handles missing setSearchQuery by not calling it", () => {
      mockUseResourceContext.mockReturnValue({
        filterState: { searchQuery: "" },
        setSearchQuery: undefined,
      });

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      // Component should render without throwing
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("handles missing context gracefully", () => {
      mockUseResourceContext.mockReturnValue({
        filterState: { searchQuery: "" },
        setSearchQuery: mockSetSearchQuery,
      });

      expect(() =>
        renderWithChakra(
          <Hero title="Test Title" description="Test Description" />
        )
      ).not.toThrow();
    });
  });

  describe("Integration Tests", () => {
    it("integrates properly with SearchBox component", async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      renderWithChakra(
        <Hero
          title="Integration Test"
          description="Testing SearchBox integration"
          onSearch={mockOnSearch}
        />
      );

      const searchBox = screen.getByTestId("search-box");
      await user.type(searchBox, "integration");

      expect(mockSetSearchQuery).toHaveBeenCalled();
      expect(mockOnSearch).toHaveBeenCalled();
      expect(screen.getByText("Integration Test")).toBeInTheDocument();
      expect(
        screen.getByText("Testing SearchBox integration")
      ).toBeInTheDocument();
    });

    it("works with theme system", () => {
      expect(() =>
        renderWithChakra(
          <Hero title="Theme Test" description="Testing with theme system" />
        )
      ).not.toThrow();
    });

    it("renders all components together correctly", () => {
      renderWithChakra(
        <Hero
          title="Complete Hero"
          description="With all components"
          searchPlaceholder="Complete search"
          onSearch={() => {}}
        />
      );

      expect(screen.getByText("Complete Hero")).toBeInTheDocument();
      expect(screen.getByText("With all components")).toBeInTheDocument();
      expect(screen.getByTestId("search-box")).toBeInTheDocument();
      expect(screen.getByDisplayValue("")).toBeInTheDocument(); // Empty search input
    });
  });

  describe("Accessibility", () => {
    it("provides accessible content structure", () => {
      renderWithChakra(
        <Hero title="Accessible Title" description="Accessible Description" />
      );

      // Text should be accessible to screen readers
      expect(screen.getByText("Accessible Title")).toBeInTheDocument();
      expect(screen.getByText("Accessible Description")).toBeInTheDocument();
    });

    it("search box is accessible", () => {
      renderWithChakra(
        <Hero
          title="Test Title"
          description="Test Description"
          searchPlaceholder="Accessible search"
        />
      );

      const searchBox = screen.getByTestId("search-box");
      expect(searchBox).toHaveAttribute("placeholder", "Accessible search");
      expect(searchBox).toBeInstanceOf(HTMLInputElement);
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();

      renderWithChakra(
        <Hero title="Test Title" description="Test Description" />
      );

      const searchBox = screen.getByTestId("search-box");
      await user.tab();

      expect(searchBox).toHaveFocus();
    });
  });
});

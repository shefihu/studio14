import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useResourceFiltering } from "../useResourceFiltering";
import type {
  ResourceItem,
  FilterState,
  IconComponent,
} from "../../types/resources";

// Mock icon components for testing
const MockLinkIcon: IconComponent = ({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    data-testid="link-icon"
    data-width={width}
    data-height={height}
    className={className}
  >
    Link Icon
  </div>
);

const MockPdfIcon: IconComponent = ({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    data-testid="pdf-icon"
    data-width={width}
    data-height={height}
    className={className}
  >
    PDF Icon
  </div>
);

const MockVideoIcon: IconComponent = ({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    data-testid="video-icon"
    data-width={width}
    data-height={height}
    className={className}
  >
    Video Icon
  </div>
);

const MockAccentIcon = <div data-testid="accent-icon">Accent Icon</div>;

describe("useResourceFiltering Hook", () => {
  const mockResources: ResourceItem[] = [
    {
      id: "1",
      title: "The ultimate guide to Workplace Chat",
      subTitle: "Communication Strategies",
      icon: MockLinkIcon,
      tagLabel: "Secure Base",
      accentIcon: MockAccentIcon,
      accentCorner: "tr",
      accentWidth: "182px",
      documentType: "Link",
      foundationalPrinciple: "Communication",
      category: "Workplace",
      height: {
        base: "160px",
        lg: "75px",
      },
    },
    {
      id: "2",
      title: "Building Trust in Remote Teams",
      subTitle: "Leadership Development",
      icon: MockVideoIcon,
      tagLabel: "Sense of Appreciation",
      accentIcon: MockAccentIcon,
      accentCorner: "t",
      documentType: "Video",
      foundationalPrinciple: "Leadership",
      category: "Management",
      height: {
        base: "124px",
        lg: "112px",
      },
    },
    {
      id: "3",
      title: "Employee Recognition Best Practices",
      subTitle: "Talent Management",
      icon: MockLinkIcon,
      tagLabel: "Learning Organisation",
      accentIcon: MockAccentIcon,
      accentCorner: "tr",
      accentWidth: "182px",
      documentType: "Link",
      foundationalPrinciple: "HR",
      category: "Management",
      height: {
        base: "160px",
        lg: "75px",
      },
    },
    {
      id: "4",
      title: "Mental Health First Aid Guidelines",
      subTitle: "Employee Support",
      icon: MockPdfIcon,
      tagLabel: "Wellbeing",
      accentIcon: MockAccentIcon,
      accentCorner: "tl",
      accentWidth: "96%",
      documentType: "PDF",
      foundationalPrinciple: "Health",
      category: "Wellness",
      height: {
        base: "94px",
      },
    },
    {
      id: "5",
      title: "API Documentation",
      subTitle: "Technical Guide for developers",
      icon: MockPdfIcon,
      tagLabel: "Technical",
      accentIcon: MockAccentIcon,
      accentCorner: "tr",
      foundationalPrinciple: "Technical",
      category: "Sample",
      height: "120px",
    },
  ];

  const defaultFilterState: FilterState = {
    searchQuery: "",
    selectedFoundationalPrinciples: [],
    selectedDocumentTypes: [],
    selectedCategories: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all resources when no filters are applied", () => {
    const { result } = renderHook(() =>
      useResourceFiltering(mockResources, defaultFilterState)
    );

    expect(result.current).toHaveLength(5);
    expect(result.current).toEqual(mockResources);
  });

  it("filters resources by search query across title, subtitle, and tag label", () => {
    const searchFilterState: FilterState = {
      ...defaultFilterState,
      searchQuery: "workplace",
    };

    const { result } = renderHook(() =>
      useResourceFiltering(mockResources, searchFilterState)
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe(
      "The ultimate guide to Workplace Chat"
    );

    // Test case-insensitive search
    const caseInsensitiveFilterState: FilterState = {
      ...defaultFilterState,
      searchQuery: "MENTAL",
    };

    const { result: caseResult } = renderHook(() =>
      useResourceFiltering(mockResources, caseInsensitiveFilterState)
    );

    expect(caseResult.current).toHaveLength(1);
    expect(caseResult.current[0].title).toBe(
      "Mental Health First Aid Guidelines"
    );
  });

  it("filters by multiple foundational principles", () => {
    const multiPrincipleFilterState: FilterState = {
      ...defaultFilterState,
      selectedFoundationalPrinciples: ["Communication", "Technical"],
    };

    const { result } = renderHook(() =>
      useResourceFiltering(mockResources, multiPrincipleFilterState)
    );

    expect(result.current).toHaveLength(2);
    expect(
      result.current.some(
        (resource) => resource.foundationalPrinciple === "Communication"
      )
    ).toBe(true);
    expect(
      result.current.some(
        (resource) => resource.foundationalPrinciple === "Technical"
      )
    ).toBe(true);
  });

  it("filters by single category", () => {
    const categoryFilterState: FilterState = {
      ...defaultFilterState,
      selectedCategories: ["Management"],
    };

    const { result } = renderHook(() =>
      useResourceFiltering(mockResources, categoryFilterState)
    );

    expect(result.current).toHaveLength(2);
    expect(
      result.current.every((resource) => resource.category === "Management")
    ).toBe(true);
  });

  it("applies multiple filters simultaneously", () => {
    const combinedFilterState: FilterState = {
      searchQuery: "mental",
      selectedFoundationalPrinciples: ["Health"],
      selectedDocumentTypes: ["PDF"],
      selectedCategories: ["Wellness"],
    };

    const { result } = renderHook(() =>
      useResourceFiltering(mockResources, combinedFilterState)
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe("Mental Health First Aid Guidelines");
  });
});

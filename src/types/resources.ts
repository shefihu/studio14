import type { JSX } from "react";

export type IconComponent =
  | React.ComponentType<{ width?: string; height?: string; className?: string }>
  | (() => JSX.Element);

export type AccentCorner = "tr" | "tl" | "t";

export type DocumentType = "PDF" | "Video" | "Link" | "DOC";

export type HeightConfig = {
  base?: string;
  lg?: string;
  md?: string;
};

export interface ResourceItem {
  id: string;
  title: string;
  subTitle: string;
  icon: IconComponent;
  tagLabel: string;
  accentIcon: React.ReactNode;
  accentCorner: AccentCorner;
  accentWidth?: string;
  height?: HeightConfig | string;
  category?: string;
  documentType?: DocumentType;
  foundationalPrinciple?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedFoundationalPrinciples: string[];
  selectedDocumentTypes: string[];
  selectedCategories: string[];
}

export interface ResourceContextType {
  resources: ResourceItem[];
  filteredResources: ResourceItem[];
  filterState: FilterState;
  isLoading: boolean;

  setSearchQuery: (query: string) => void;
  toggleFoundationalPrinciple: (principle: string) => void;
  toggleDocumentType: (type: string) => void;
  toggleCategory: (category: string) => void;
  clearAllFilters: () => void;
  clearFilter: (filterType: keyof FilterState, value?: string) => void;

  stagedFilterState: FilterState;
  setStagedSearchQuery: (query: string) => void;
  toggleStagedFoundationalPrinciple: (principle: string) => void;
  toggleStagedDocumentType: (type: string) => void;
  toggleStagedCategory: (category: string) => void;
  applyStagedFilters: () => void;
  resetStagedFilters: () => void;
  initializeStagedFilters: () => void;
}

export interface ResourceCardProps {
  title: string;
  icon: IconComponent;
  accentIcon: React.ReactNode;
  subtitle: string;
  tagLabel: string;
  accentCorner: AccentCorner;
  accentWidth?: string;
  accentHeight?: HeightConfig | string;
}

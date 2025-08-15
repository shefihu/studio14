import { useMemo } from "react";
import {
  type IconComponent,
  type DocumentType,
  type ResourceItem,
  type FilterState,
} from "../types/resources";
import type { JSX } from "react";


export const useResourceFiltering = (
  resources: ResourceItem[],
  filterState: FilterState
): ResourceItem[] => {
  return useMemo(() => {
    let filtered = [...resources];

    if (filterState.searchQuery.trim()) {
      const query = filterState.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.subTitle.toLowerCase().includes(query) ||
          resource.tagLabel.toLowerCase().includes(query)
      );
    }

    if (filterState.selectedFoundationalPrinciples.length > 0) {
      filtered = filtered.filter((resource) =>
        filterState.selectedFoundationalPrinciples.includes(
          resource.foundationalPrinciple || resource.tagLabel
        )
      );
    }

    if (filterState.selectedDocumentTypes.length > 0) {
      filtered = filtered.filter((resource) =>
        filterState.selectedDocumentTypes.includes(
          resource.documentType || getDocumentTypeFromIcon(resource.icon)
        )
      );
    }

    if (filterState.selectedCategories.length > 0) {
      filtered = filtered.filter((resource) =>
        filterState.selectedCategories.includes(resource.category || "Sample")
      );
    }

    return filtered;
  }, [resources, filterState]);
};

const getDocumentTypeFromIcon = (
  icon: IconComponent | (() => JSX.Element)
): DocumentType => {
  const iconString = icon.toString();
  if (iconString.toLowerCase().includes("pdf")) return "PDF";
  if (iconString.toLowerCase().includes("video")) return "Video";
  if (iconString.toLowerCase().includes("link")) return "Link";
  return "DOC";
};

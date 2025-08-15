import React, { useReducer, useMemo, useEffect, useState } from "react";
import { useResourceFiltering } from "../hooks/useResourceFiltering";
import { resourceService } from "../services/resourceService";
import { ResourceContext } from "../contexts/ResourceContext";
import type { FilterState, ResourceItem } from "../types/resources";

type FilterAction =
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "TOGGLE_FOUNDATIONAL_PRINCIPLE"; payload: string }
  | { type: "TOGGLE_DOCUMENT_TYPE"; payload: string }
  | { type: "TOGGLE_CATEGORY"; payload: string }
  | { type: "CLEAR_ALL_FILTERS" }
  | {
      type: "CLEAR_FILTER";
      payload: { filterType: keyof FilterState; value?: string };
    }
  | { type: "SET_FOUNDATIONAL_PRINCIPLES"; payload: string[] }
  | { type: "SET_DOCUMENT_TYPES"; payload: string[] }
  | { type: "SET_CATEGORIES"; payload: string[] };

const initialFilterState: FilterState = {
  searchQuery: "",
  selectedFoundationalPrinciples: [],
  selectedDocumentTypes: [],
  selectedCategories: [],
};

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "TOGGLE_FOUNDATIONAL_PRINCIPLE":
      return {
        ...state,
        selectedFoundationalPrinciples:
          state.selectedFoundationalPrinciples.includes(action.payload)
            ? state.selectedFoundationalPrinciples.filter(
                (item) => item !== action.payload
              )
            : [...state.selectedFoundationalPrinciples, action.payload],
      };

    case "TOGGLE_DOCUMENT_TYPE":
      return {
        ...state,
        selectedDocumentTypes: state.selectedDocumentTypes.includes(
          action.payload
        )
          ? state.selectedDocumentTypes.filter(
              (item) => item !== action.payload
            )
          : [...state.selectedDocumentTypes, action.payload],
      };

    case "TOGGLE_CATEGORY":
      return {
        ...state,
        selectedCategories: state.selectedCategories.includes(action.payload)
          ? state.selectedCategories.filter((item) => item !== action.payload)
          : [...state.selectedCategories, action.payload],
      };

    case "CLEAR_ALL_FILTERS":
      return initialFilterState;

    case "CLEAR_FILTER": {
      const { filterType, value } = action.payload;
      if (filterType === "searchQuery") {
        return { ...state, searchQuery: "" };
      }
      if (value && Array.isArray(state[filterType])) {
        return {
          ...state,
          [filterType]: (state[filterType] as string[]).filter(
            (item) => item !== value
          ),
        };
      }
      return { ...state, [filterType]: [] };
    }

    case "SET_FOUNDATIONAL_PRINCIPLES":
      return { ...state, selectedFoundationalPrinciples: action.payload };

    case "SET_DOCUMENT_TYPES":
      return { ...state, selectedDocumentTypes: action.payload };

    case "SET_CATEGORIES":
      return { ...state, selectedCategories: action.payload };

    default:
      return state;
  }
};

interface ResourceProviderProps {
  children: React.ReactNode;
  initialResources?: ResourceItem[];
}

export const ResourceProvider: React.FC<ResourceProviderProps> = ({
  children,
  initialResources = [],
}) => {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
  const [stagedFilterState, setStagedFilterState] =
    useState<FilterState>(initialFilterState);
  const [resources, setResources] =
    React.useState<ResourceItem[]>(initialResources);
  const [isLoading, setIsLoading] = React.useState(false);

  const filteredResources = useResourceFiltering(resources, filterState);

  useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true);
      try {
        const data = await resourceService.getResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to load resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (initialResources.length === 0) {
      loadResources();
    }
  }, [initialResources.length]);

  const regularActions = useMemo(
    () => ({
      setSearchQuery: (query: string) =>
        dispatch({ type: "SET_SEARCH_QUERY", payload: query }),

      toggleFoundationalPrinciple: (principle: string) =>
        dispatch({ type: "TOGGLE_FOUNDATIONAL_PRINCIPLE", payload: principle }),

      toggleDocumentType: (type: string) =>
        dispatch({ type: "TOGGLE_DOCUMENT_TYPE", payload: type }),

      toggleCategory: (category: string) =>
        dispatch({ type: "TOGGLE_CATEGORY", payload: category }),

      clearAllFilters: () => dispatch({ type: "CLEAR_ALL_FILTERS" }),

      clearFilter: (filterType: keyof FilterState, value?: string) =>
        dispatch({ type: "CLEAR_FILTER", payload: { filterType, value } }),
    }),
    []
  );

  const stagedActions = useMemo(
    () => ({
      setStagedSearchQuery: (query: string) =>
        setStagedFilterState((prev) => ({ ...prev, searchQuery: query })),

      toggleStagedFoundationalPrinciple: (principle: string) =>
        setStagedFilterState((prev) => ({
          ...prev,
          selectedFoundationalPrinciples:
            prev.selectedFoundationalPrinciples.includes(principle)
              ? prev.selectedFoundationalPrinciples.filter(
                  (item) => item !== principle
                )
              : [...prev.selectedFoundationalPrinciples, principle],
        })),

      toggleStagedDocumentType: (type: string) =>
        setStagedFilterState((prev) => ({
          ...prev,
          selectedDocumentTypes: prev.selectedDocumentTypes.includes(type)
            ? prev.selectedDocumentTypes.filter((item) => item !== type)
            : [...prev.selectedDocumentTypes, type],
        })),

      toggleStagedCategory: (category: string) =>
        setStagedFilterState((prev) => ({
          ...prev,
          selectedCategories: prev.selectedCategories.includes(category)
            ? prev.selectedCategories.filter((item) => item !== category)
            : [...prev.selectedCategories, category],
        })),

      applyStagedFilters: () => {
        dispatch({
          type: "SET_SEARCH_QUERY",
          payload: stagedFilterState.searchQuery,
        });
        dispatch({
          type: "SET_FOUNDATIONAL_PRINCIPLES",
          payload: stagedFilterState.selectedFoundationalPrinciples,
        });
        dispatch({
          type: "SET_DOCUMENT_TYPES",
          payload: stagedFilterState.selectedDocumentTypes,
        });
        dispatch({
          type: "SET_CATEGORIES",
          payload: stagedFilterState.selectedCategories,
        });
      },

      resetStagedFilters: () => {
        setStagedFilterState(initialFilterState);
      },

      initializeStagedFilters: () => {
        setStagedFilterState(filterState);
      },
    }),
    [stagedFilterState, filterState]
  );

  const contextValue = useMemo(
    () => ({
      resources,
      filteredResources,
      filterState,
      isLoading,
      ...regularActions,
      stagedFilterState,
      ...stagedActions,
    }),
    [
      resources,
      filteredResources,
      filterState,
      isLoading,
      regularActions,
      stagedFilterState,
      stagedActions,
    ]
  );

  return (
    <ResourceContext.Provider value={contextValue}>
      {children}
    </ResourceContext.Provider>
  );
};

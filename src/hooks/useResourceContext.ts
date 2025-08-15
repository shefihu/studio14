import { useContext } from "react";
import { ResourceContext } from "../contexts/ResourceContext";
import type { ResourceContextType } from "../types/resources";

export const useResourceContext = (): ResourceContextType => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error(
      "useResourceContext must be used within a ResourceProvider"
    );
  }
  return context;
};

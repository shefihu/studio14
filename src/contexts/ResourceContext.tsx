import { createContext } from "react";
import type { ResourceContextType } from "../types/resources";

export const ResourceContext = createContext<ResourceContextType | undefined>(
  undefined
);

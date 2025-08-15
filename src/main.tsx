import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import system from "./theme/index.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

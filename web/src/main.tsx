import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PropertyPage } from "./pages/property.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PropertyPage />
  </StrictMode>
);

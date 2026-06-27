import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ActivityProvider } from "./context/ActivityContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
    <ActivityProvider>
        <App />
    </ActivityProvider>
      </BrowserRouter>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import router from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 🔑 Import TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create one client for the whole app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      gcTime: 10 * 60 * 1000,   // garbage collect after 10 minutes
      retry: 1,                 // retry failed requests once
      refetchOnWindowFocus: false, // don’t spam when switching tabs
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

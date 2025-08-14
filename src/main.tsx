import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ensureRealToken } from "./auth/realLogin";

const rootEl = document.getElementById("root")!;

// simple splash while we try auth
rootEl.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font:600 16px system-ui">Loading…</div>`;

(async () => {
  try {
    await ensureRealToken(); // hd/hd from env
  } catch (err) {
    console.error("Startup login failed:", err);
    // don't throw; still render the app
  } finally {
    // clear splash before mounting React (avoid mismatch warnings)
    rootEl.innerHTML = "";
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
})();


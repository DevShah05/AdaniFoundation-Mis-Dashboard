import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://mis.adani.digital";

const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.message === "Network Error") {
      console.error(
        "[API] Network Error. Check CORS/TLS/URL:",
        err?.config?.method,
        (err?.config?.baseURL || "") + (err?.config?.url || "")
      );
    } else if (err?.response) {
      console.error(
        `[API] ${err.config?.method?.toUpperCase()} ${err.config?.url} →`,
        err.response.status,
        err.response.data
      );
    } else {
      console.error("[API] Unknown error:", err);
    }
    throw err;
  }
);

export default api;

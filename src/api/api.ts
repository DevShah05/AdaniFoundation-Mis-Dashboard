import axios, { AxiosError } from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: "/",                 // use Vite proxy → /api → MIS
  timeout: 20000,
  withCredentials: true,
  headers: { Accept: "application/json" },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err: AxiosError) => {
    if (err.response?.status === 401) console.error("[api] 401 not logged in");
    if (err.response?.status === 403) console.error("[api] 403 forbidden");
    return Promise.reject(err);
  }
);

export default api;

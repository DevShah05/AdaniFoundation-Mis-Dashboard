// src/api/login.ts
import authClient from "./authClient";
import { setToken, markSessionLoggedIn } from "../utils/auth";

const LOGIN_PATH = import.meta.env.VITE_LOGIN_PATH || "/auth/login";

/**
 * Try to extract a JWT token from the login response.
 * Handles: raw string, JSON {token}, or Authorization header.
 */
function extractToken(data: any, headers: Record<string, any>): string | null {
  // Case 1: backend returns raw string (your case)
  if (typeof data === "string") {
    return data.trim().replace(/^"|"$/g, ""); // remove quotes if present
  }

  // Case 2: backend returns JSON
  if (data?.token) return String(data.token);
  if (data?.access_token) return String(data.access_token);
  if (data?.jwt) return String(data.jwt);
  if (data?.data?.token) return String(data.data.token);

  // Case 3: backend sends token in headers
  const authHeader = headers["authorization"] || headers["Authorization"];
  if (authHeader && typeof authHeader === "string") {
    const m = authHeader.match(/^Bearer\s+(.+)$/i);
    if (m) return m[1].trim();
  }

  const xAuth = headers["x-auth-token"] || headers["X-Auth-Token"];
  if (xAuth && typeof xAuth === "string") return xAuth.trim();

  return null;
}

export async function loginWithPassword(username: string, password: string) {
  const res = await authClient.post(LOGIN_PATH, { username, password });
  const token = extractToken(res.data, res.headers);

  if (token) {
    setToken(token);              // ✅ Save JWT in localStorage
  } else {
    markSessionLoggedIn();        // fallback for cookie-based sessions
  }

  return true;
}


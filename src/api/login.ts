import authClient from "./authClient";
import { setToken, markSessionLoggedIn } from "../utils/auth";

const tokenField = import.meta.env.VITE_TOKEN_FIELD || "token";
const LOGIN_PATH = import.meta.env.VITE_LOGIN_PATH || "/auth/login";

function extractToken(data: any): string | null {
  if (!data) return null;
  // try common shapes
  if (data[tokenField]) return data[tokenField];
  if (data.token) return data.token;
  if (data.access_token) return data.access_token;
  if (data.jwt) return data.jwt;
  if (data.data?.token) return data.data.token;
  return null;
}

export async function loginWithPassword(username: string, password: string) {
  const { data } = await authClient.post(LOGIN_PATH, { username, password });

  const token = extractToken(data);
  if (token) {
    setToken(token);
  } else {
    // likely cookie session auth; mark success so guards let the user in
    markSessionLoggedIn();
  }
  return true;
}

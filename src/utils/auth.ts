export const AUTH_TOKEN_KEY = "authToken";

export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(t?: string | null) {
  if (!t) localStorage.removeItem(AUTH_TOKEN_KEY);
  else localStorage.setItem(AUTH_TOKEN_KEY, t);
}

export function isLoggedIn(): boolean {
  // If backend uses only cookies, you may still be "logged in" without a token.
  // We'll treat “has token OR has session cookie set” as logged in.
  // A simple heuristic: token present OR a flag we set post-login.
  const cookieFlag = sessionStorage.getItem("sessionLoggedIn") === "1";
  return !!getToken() || cookieFlag;
}

export function markSessionLoggedIn() {
  // Mark that login succeeded via cookie session (no JWT returned)
  sessionStorage.setItem("sessionLoggedIn", "1");
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem("sessionLoggedIn");
}

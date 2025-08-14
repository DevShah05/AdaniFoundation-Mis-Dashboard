import authClient from "../api/authClient";

function extractToken(data: any): string | undefined {
  if (!data) return undefined;

  const envField = import.meta.env.VITE_TOKEN_FIELD as string | undefined;
  if (envField && typeof data?.[envField] === "string") return data[envField];

  if (typeof data === "string") return data;
  if (typeof data?.token === "string") return data.token;
  if (typeof data?.accessToken === "string") return data.accessToken;
  if (typeof data?.jwt === "string") return data.jwt;

  if (data?.data) {
    const d = data.data;
    if (typeof d?.token === "string") return d.token;
    if (typeof d?.accessToken === "string") return d.accessToken;
    if (typeof d?.jwt === "string") return d.jwt;
  }
  return undefined;
}

async function tryLoginOnce(path: string, username: string, password: string) {
  const { data } = await authClient.post(path, { username, password });
  const token = extractToken(data);
  if (!token) {
    console.error("Login response missing token:", data);
    throw new Error("No token in login response");
  }
  localStorage.setItem("authToken", token);
  return token;
}

export async function realLogin(username: string, password: string): Promise<string> {
  const primary = (import.meta.env.VITE_LOGIN_PATH as string) || "/auth/login";
  const fallback = "/auth/login";
  try {
    return await tryLoginOnce(primary, username, password);
  } catch (e1) {
    console.warn(`[auth] Failed at ${primary}. Fallback to ${fallback}...`, e1);
    return await tryLoginOnce(fallback, username, password);
  }
}

export async function ensureRealToken(): Promise<void> {
  if (localStorage.getItem("authToken")) return;
  const u = (import.meta.env.VITE_LOGIN_USERNAME as string) || "hd";
  const p = (import.meta.env.VITE_LOGIN_PASSWORD as string) || "hd";
  await realLogin(u, p);
}


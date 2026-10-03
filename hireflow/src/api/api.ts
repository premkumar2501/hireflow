import { TokenKeys } from "../utils/enum";
import { clearTokens, saveTokens } from "../utils/token";

const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export async function api<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const access = localStorage.getItem(TokenKeys.ACCESS_KEY);
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
      ...options.headers,
    },
  });
  if (response.status === 401 && retry && localStorage.getItem(TokenKeys.REFRESH_KEY)) {
    try {
      const refreshed = await api<Tokens>(
        "/auth/refresh-token",
        {
          method: "POST",
          body: JSON.stringify({
            refresh_token: localStorage.getItem(TokenKeys.REFRESH_KEY),
          }),
        },
        false,
      );
      saveTokens(refreshed);
      return api<T>(path, options, false);
    } catch {
      clearTokens();
    }
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.detail?.message ||
      data?.detail ||
      "Something went wrong. Please try again.";
    throw new Error(
      typeof message === "string"
        ? message
        : "Unable to complete your request.",
    );
  }
  return data as T;
}
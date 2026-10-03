import { TokenKeys } from "./enum";

export function saveTokens(tokens: Tokens) {
  localStorage.setItem(TokenKeys.ACCESS_KEY, tokens.access_token);
  localStorage.setItem(TokenKeys.REFRESH_KEY, tokens.refresh_token);
}

export function clearTokens() {
  localStorage.removeItem(TokenKeys.ACCESS_KEY);
  localStorage.removeItem(TokenKeys.REFRESH_KEY);
}

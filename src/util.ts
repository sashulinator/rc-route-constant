// eslint-disable-next-line import/no-cycle
import Route from "./route";

export function isPayload(smth: unknown): smth is Route["PAYLOAD"] {
  return !isRoute(smth) && !isString(smth);
}

export function isRedirect(smth: unknown): smth is Route["REDIRECT"] {
  return isRoute(smth) || isString(smth);
}

export function isRoute(smth: unknown): smth is Route {
  return smth instanceof Route;
}

export function isString(smth: unknown): smth is string {
  return typeof smth === "string";
}

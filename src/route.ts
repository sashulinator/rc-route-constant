export type Routes = Record<string, Route<string>>;

export interface RouteProps<Path extends string = string, Payload = undefined> {
  path: Route<Path, Payload>["PATH"];
  name: Route<Path, Payload>["NAME"];
  redirect?: Route<Path, Payload>["REDIRECT"];
  payload?: Route<Path, Payload>["PAYLOAD"];
}

export default class Route<Path extends string = string, Payload = undefined> {
  NAME: string;

  PATH: Path;

  PAYLOAD: Payload;

  REDIRECT: Route<Path, Payload> | string;

  isPrevious: boolean;

  constructor({ name, path, payload, redirect }: RouteProps<Path, Payload>) {
    this.NAME = name;
    this.PATH = path;
    this.PAYLOAD = payload;
    this.REDIRECT = redirect || path;
    this.isPrevious = false;
  }

  get REDIRECT_PATH(): string {
    if (!this.REDIRECT) return this.PATH;
    return this.REDIRECT instanceof Route
      ? this.REDIRECT.REDIRECT_PATH
      : this.REDIRECT;
  }

  get isCurrent(): boolean {
    return buildPathRegExp(this.PATH, true).test(window?.location?.pathname);
  }

  isPartOf = (path?: string): boolean => {
    return buildPathRegExp(this.PATH).test(path || window.location.pathname);
  };
}

function buildPathRegExp(path: string, end?: boolean): RegExp {
  return new RegExp(
    `${path.replace(/:(.)+\//, `(.)+/`).replace(/:(.)+/, `(.)+`)}${
      end ? "$" : ""
    }`
  );
}

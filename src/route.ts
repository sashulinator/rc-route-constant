export type Routes = Record<string, Route<string>>;

export interface RouteProps<Path extends string = string> {
  path: Route<Path>["PATH"];
  name: Route<Path>["NAME"];
  redirect?: Route<Path>["REDIRECT"];
  payload?: any;
}

export default class Route<Path extends string = string> {
  NAME: string;

  PATH: Path;

  PAYLOAD: any;

  REDIRECT: Route | string;

  isPrevious: boolean;

  constructor({ name, path, payload, redirect }: RouteProps<Path>) {
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
    return buildRegExpFromPath(this.PATH, true).test(
      window?.location?.pathname
    );
  }

  isPartOf = (path?: string): boolean => {
    return buildRegExpFromPath(this.PATH).test(
      path || window?.location?.pathname
    );
  };
}

function buildRegExpFromPath(path: string, exactMatch?: boolean): RegExp {
  const dollarSign = exactMatch ? "$" : "";
  // replace all params like ':id' and then replace optional params like ':id?'
  const regExp = path
    .replace(/:([^/])+/g, "([^/])+")
    .replace(/\/:([^/])+\?/, "/?([^/]?)+");

  return new RegExp(`${regExp}${dollarSign}`);
}

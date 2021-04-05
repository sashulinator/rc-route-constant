export type Routes = { [key: string]: Route };

export type RouteProps = {
  readonly PATH: Route["PATH"];
  readonly NAME: Route["NAME"];
  readonly REDIRECT?: string | Route;
};

export class Route {
  readonly NAME: string;

  readonly PATH: string;

  readonly PAYLOAD: unknown;

  readonly REDIRECT: Route | string;

  isPrevious: boolean;

  constructor(
    name: Route["NAME"],
    path: Route["PATH"],
    redirect?: Route["REDIRECT"],
    payload?: unknown
  ) {
    this.NAME = name;
    this.PATH = path;

    this.REDIRECT = redirect || path;

    this.PAYLOAD = payload;

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

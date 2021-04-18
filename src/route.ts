export type Routes = Record<string, Route>;

export interface RouteProps<Payload = undefined> {
  path: Route["PATH"];
  name: Route["NAME"];
  redirect?: Route["REDIRECT"];
  payload?: Payload;
}

export default class Route<Payload = undefined> {
  NAME: string;

  PATH: string;

  PAYLOAD: Payload;

  REDIRECT: Route | string;

  isPrevious: boolean;

  constructor({ name, path, payload, redirect }: RouteProps<Payload>) {
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

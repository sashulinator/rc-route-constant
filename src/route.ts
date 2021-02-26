export type Routes = { [key: string]: Route };

export type MandateProps = {
  readonly PATH: string;
  readonly NAME: string;
};

export class Route {
  readonly NAME: string;

  readonly PATH: string;

  readonly PAYLOAD: unknown;

  isPrevious: boolean;

  constructor(
    name: MandateProps["NAME"],
    path: MandateProps["PATH"],
    payload?: unknown
  ) {
    this.NAME = name;
    this.PATH = path;

    this.PAYLOAD = payload;

    this.isPrevious = false;
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

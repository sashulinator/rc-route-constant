## What is it

it is a simple class that helps to create route constant with additional functionality

### Killer feature

```ts
ROUTES.LOGIN.isPrevious;
ROUTES.LOGIN.isCurrent;
```

### Simple example:

```ts
const ROUTES = {
  LOGIN: new Route("Login", "/login"),
  ABOUT: Route.new("About", "/about"),
  MAIN: Route.new("Main", "/", { REDIRECT: "/main" }),
};
```

## How to start

### Route constant

To create constants I highly recommend using a class instead of an object because of autocompletion and...

```ts
import Route from "@savchenko91/rc-route";

class Routes {
  public readonly ABOUT: Route;
  public readonly ABOUT_ME: Route;
  public readonly ABOUT_MY_CAT: Route;
  public readonly MAIN: Route;

  constructor() {
    this.MAIN = Route.new("main page", `${about}/my-cat`);

    const about = "/about";

    this.ABOUT_MY = Route.new("about me", about);

    // you can't do smth like this in object assertion
    this.ABOUT = Route.new("about", `${about}/me`, {
      REDIRECT: this.ABOUT_MY.PATH,
    });

    this.ABOUT = Route.new("about my cat", `${about}/my-cat`, {
      LABEL: "about-my-cat",
    });
  }
}

export default new Routes();
```

### Set previous

Use function `setPreviousRoute` from the library to set property `isPrevious`

```ts
import { useLocation } from "react-router-dom";
import { setPreviousRoute } from "@savchenko91/rc-route";

function Routes() {
  const location = useLocation();

  setPreviousRoute(ROUTES);

  return; //
}
```

## Additional features

### `getCurrent`

Real example:

```ts
document.title = `You are on page "${getСurrent(ROUTES)?.NAME || ""}"`;
```

### `getListByRegExp`

```tsx
function Sider() {
  const menuRoutes = useMemo(
    () => getListByRegExp(ROUTES, /\/app\/([a-z-]+)$/),
    []
  );

  return (
    <ul>
      {menuRoutes.map((route) => (
        <li>
          <a className={route.LABEL} href={route.REDIRECT || route.PATH}>
            {route.ICON}
            {route.NAME}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

### `getListForEveryLocation`

```tsx
function Breadcrumbs() {
  const location = useLocation();

  const routes = useMemo(() =>
    getListForEveryLocation(ROUTES, location.pathname, [])
  );

  return (
    <ul>
      {routes.map((route, i) => (
        <li>
          <a href={route.REDIRECT || route.PATH}>/ {route.NAME}</a>
        </li>
      ))}
    </ul>
  );
}
```

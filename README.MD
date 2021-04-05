## What is it

Do you have a file `src/constants/routes.js`? Good. This libary will help you with it. See example:

```ts
const ROUTES = {
  LOGIN: new Route("Login page", "/login"),
  MAIN: new Route("Main page", "/", "/main", { ICON: SomeIcon }),
};

console.log(ROUTES);
// {
//   LOGIN: {
//     NAME: 'Login page',
//     PATH: '/login',
//     REDIRECT: '/login',
//     REDIRECT_PATH: '/login',
//     isCurrent: false,
//     isPrevious: false,
//     isPartOf: (string) => boolean,
//     ...
//   },
//   MAIN: {
//     NAME: 'Main page',
//     PATH: '/',
//     REDIRECT: '/main',
//     REDIRECT_PATH: '/main',
//     isCurrent: false,
//     isPrevious: false,
//     isPartOf: (string) => boolean,
//     PAYLOAD: {
//       ICON: React.component
//     }
//     ...
//   }
// }
```

### Problem to solve

- Is previous route?
- Is current route?
- Is this route part of that route?
- Get routes for Breadcrumbs
- Get all routes by regExp
- Save url queries

## How to start

### Route constant

To create constants I highly recommend using a class instead of an object because of autocompletion and ...

```ts
import Route from "@savchenko91/rc-route-constant";
import CatIcon from "./monsterIcon";

class ROUTES {
  public readonly ABOUT: Route;
  public readonly ABOUT_ME: Route;
  public readonly ABOUT_MY_CAT: Route;
  public readonly MAIN: Route;

  constructor() {
    this.MAIN = new Route("main page", `/`);

    const about = "/about";
    const aboutMe = "/about/me";
    const aboutMyCat = "/about/myCat";

    this.ABOUT_ME = new Route("about me", aboutMe);

    this.ABOUT_MY_CAT = new Route("about my cat", aboutMyCat, null, {
      ICON: CatIcon,
    });

    // ...You can't do smth like this in object assertion
    this.ABOUT = new Route("about", about, aboutMe);
  }
}

export default new ROUTES();
```

### Set previous

Use function `setPreviousRoute` to set property `isPrevious`

```ts
import { useLocation } from "react-router-dom";
import { setPreviousRoute } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function ParentComponent() {
  const location = useLocation();

  // write "{ ...ROUTES }" if you use TS because of ERROR TS2345
  setPreviousRoute({ ...ROUTES });

  return <div>...</div>;
}
```

## Additional features

### `getCurrent`

You can automatically set a page title

```ts
import { useLocation } from "react-router-dom";
import { getСurrent } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function Component() {
  useLocation(); // component renders by every pathname change

  // write "{ ...ROUTES }" if you use TS because of ERROR TS2345
  document.title = `You are on page "${getСurrent({ ...ROUTES })?.NAME || ""}"`;

  return <div>...</div>;
}
```

### `getListByRegExp`

```tsx
import { getListByRegExp } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function Sider() {
  const routes = useMemo(
    () => getListByRegExp(ROUTES, /\/app\/([a-z-]+)$/),
    []
  );

  return (
    <ul>
      {routes.map((route) => (
        <li>
          <a className={route.LABEL} href={route.REDIRECT_PATH}>
            {route.PAYLOAD.ICON}
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
import { useLocation } from "react-router-dom";
import { getListForEveryLocation } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function Breadcrumbs() {
  const location = useLocation();

  const routes = useMemo(
    () => getListForEveryLocation(ROUTES, location.pathname),
    []
  );

  return (
    <ul>
      {routes.map((route, i) => (
        <li>
          <a href={route.REDIRECT_PATH}>/ {route.NAME}</a>
        </li>
      ))}
    </ul>
  );
}
```

### Save url queries

This is the case: you have a car service with routes `search/car` and `search/client` and you want to store search queries somewhere, you can save them like this:

```ts
if (ROUTES.CAR.isCurrent) {
  ROUTES.SEARCH.REDIRECT = ROUTES.CAR;
  ROUTES.CLIENT.REDIRECT = location.pathname;
} else {
  ROUTES.SEARCH.REDIRECT = ROUTES.CLIENT;
  ROUTES.CAR.REDIRECT = location.pathname;
}
```

Now user on "about" page and clicks on "search" link:

```tsx
<Link to={ROUTES.SEARCH.REDIRECT_PATH}>Search page</Link>
// ROUTES.SEARCH.REDIRECT_PATH = "/search/car?brend=lada&model=vesta"
```

See? You saved the queries into ROUTES.CAR but you get them from ROUTES.SEARCH

```ts
// CODE FROM THIS LIBRARY
get REDIRECT_PATH(): string {
  if (!this.REDIRECT) return this.PATH;

  return this.REDIRECT instanceof Route ? this.REDIRECT.REDIRECT_PATH : this.REDIRECT;
}
```

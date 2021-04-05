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

## How to start

### Route constant

To create constants I highly recommend using a class instead of an object because of autocompletion and ...

```ts
import Route from "@savchenko91/rc-route-constant";
import CatIcon from './monsterIcon'

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

function ParentComponent() {
  const location = useLocation();

  setPreviousRoute(ROUTES);

  return <div>...</div>;
}
```

## Additional features

### `getCurrent`

You can automatically set a page title

```ts
import { useLocation } from "react-router-dom";
import { getСurrent } from "@savchenko91/rc-route-constant";

function ParentComponent() {
  useLocation(); // component renders by every pathname change

  document.title = `You are on page "${getСurrent(ROUTES)?.NAME || ""}"`;

  return <div>...</div>;
}
```

### `getListByRegExp`

```tsx
import { getListByRegExp } from "@savchenko91/rc-route-constant";

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

function Breadcrumbs() {
  const location = useLocation();

  const routes = useMemo(() =>
    getListForEveryLocation(ROUTES, location.pathname, [])
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

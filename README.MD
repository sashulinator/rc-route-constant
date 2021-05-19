## What is it

Do you have a file `src/constants/routes.js`? Good. This libary will help you with it. See example:

```ts
const ROUTES = {
  LOGIN: new Route({ name: "Login page", path: "/login" }),
  MAIN: new Route({
    name: "Main page",
    path: "/",
    redirect: "/main",
    payload: { ICON: SomeIcon },
  }),
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
//   },
//   MAIN: {
//     NAME: 'Main page',
//     PATH: '/',
//     REDIRECT: '/main',
//     REDIRECT_PATH: '/main',
//     PAYLOAD: {
//       ICON: React.component
//     }
//     ...
//   }
// }
```

### Solves Problems

- You do not need to store queries in redux when user left page and redirect to URL with stored queries when user comes back!
- Is this route current?
- Is this route previous? (WARNING! Need some actions to make it works!)
- Page titles in one place!
- Is this route part of that route?
- Get routes for Breadcrumbs
- Get routes by regExp

## Main usage

### Route constants

```tsx
export enum Params {
  catId = 'catId',
  userId = 'userId',
}

export enum Paths {
  cats = 'cats',
  create = 'create',
  remove = 'remove',
  users = 'users',
}

export type CAT = `/${Paths.users}/:${Params.userId}/${Paths.cats}/:${Params.catId}`
export type CAT_CREATE = `/${Paths.users}/:${Params.userId}/${Paths.cats}/create`;
export type CAT_LIST = `/${Paths.users}/:${Params.userId}/${Paths.cats}`
export type CAT_REMOVE = `/${Paths.users}/:${Params.userId}/${Paths.cats}/:${Params.catId}/remove`;
export type USER = `/${Paths.users}/:${Params.userId}`;
export type USER_LIST = `/${Paths.users}`;

const ROUTES = {
  CAT: new Route<CAT>({
    name: 'User\'s cat',
    path: '/user/:userId/cats/:catId'
  }),
  CAT_CREATE: new Route<CAT_CREATE>({
    name: 'Create cat',
    path: '/users/:userId/cats/:catId'
  }),
  CAT_LIST: new Route<CAT_LIST>({
    name: 'Cats',
    path: '/users/:userId/cats/:catId'
  }),
  CAT_REMOVE: new Route<CAT_REMOVE>({
    name: 'Remove cat',
    path: '/users/:userId/cats/:catId/remove'
  }),
  USER: new Route<USER>({
    name: 'User',
    path: '/users/:userId'
  }),
  USER_LIST: new Route<USER_LIST>({
    name: 'Users',
    path: '/users'
  })
}

// Well done! Now you can use it!
<Route path={ROUTES.USER.PATH}>

// Need a link href?
<Link to={ROUTES.CAT.PATH.replace(Params.userId, '33').replace(Params.catId, '77')}>
```

### Set previous

Use function `setPreviousRoute` to set property `isPrevious`

```ts
import { useLocation } from "react-router-dom";
import { setPreviousRoute } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function ParentComponent() {
  const location = useLocation();

  // Write "{ ...ROUTES }" if you use TS because of ERROR TS2345
  setPreviousRoute({ ...ROUTES });

  return <div>...</div>;
}
```

## Additional features

### `getCurrent`

You can automatically set a page title

```ts
import { useLocation } from "react-router-dom";
import { getCurrent } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function Component() {
  useLocation(); // render on every pathname change

  // If uou use an old TS version you need to write "{ ...ROUTES }"
  document.title = `You are on page "${getCurrent({ ...ROUTES }).NAME}`;

  return <div>...</div>;
}
```

### `getListByRegExp`

```tsx
import { getListByRegExp } from "@savchenko91/rc-route-constant";
import ROUTES from "./path/to/your/constants/routes";

function ListWithAppLinks() {
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

### Store queries

This is the case:

1. You have two tabs by routes `search/cats` and `search/users` on page `search`
2. You want to store search queries when user leaves the page `search`
3. You want to store last opened tab when user leaves the page `search`

Store them into REDIRECT property!

```ts
React.useEffect(
  () => () => {
    if (ROUTES.CAR.isCurrent) {
      // Store current pathname into CLIENT.REDIRECT
      ROUTES.CLIENT.REDIRECT = location.pathname;
      // Store current tab into SEARCH.REDIRECT
      ROUTES.SEARCH.REDIRECT = ROUTES.CAR;
    } else {
      // Store current pathname into CLIENT.REDIRECT
      ROUTES.CAR.REDIRECT = location.pathname;
      // Store current tab into SEARCH.REDIRECT
      ROUTES.SEARCH.REDIRECT = ROUTES.CLIENT;
    }
  },
  []
);
```

Okey. We store them all and now we want to get them back:

```tsx
const searchPath = ROUTES.SEARCH.REDIRECT_PATH
console.log(searchPath) // /search/cats?user=John&breed=Siamese
<Link to={searchPath}>Search page</Link>
```

See? You store the pathnames into `ROUTES.CAT` and `ROUTES.USER` but you get them from `ROUTES.SEARCH`
If you want to know how it works see the code below:

```ts
// CODE FROM THIS LIBRARY!
get REDIRECT_PATH(): string {
  if (!this.REDIRECT) return this.PATH;

  return this.REDIRECT instanceof Route ? this.REDIRECT.REDIRECT_PATH : this.REDIRECT;
}
```

### Extend it!

Sometimes you have many params in a path and you need to add some queries so you might want to extend Routes

```tsx
import RcRoute from '@savchenko91/rc-route-constant';
import qs from 'qs';

export class Route<P extends string, RouteParams extends Record<string, string | undefined> = {}> extends RcRoute<P> {
  buildHref = (obj: RouteParams, queries?: Record<string, string>) => {
    const hrefWithReplacedParams = Object.entries(obj).reduce<string>((path, [key, value = '']) => {
      return path.replace(`/:${key}?`, `/${value}`).replace(`/:${key}`, `/${value}`);
    }, this.PATH);
    // Remove optional params if they exist
    const href = hrefWithReplacedParams.replace(/\/:([a-zA-Z-_])+\?/g, '');

    if (!queries) return href

    return `${href}${qs.stringify(queries, { skipNulls: true, addQueryPrefix: true })}`;
  };
}

// Well done! Now you can use it!
<Link to={ROUTES.CAT.buildHref({ userId: '33', catId: '77' }, { cute: 'true' })}>
```

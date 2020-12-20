import Route, { setPreviousRoute } from "../src/index";

// ------------------------------------
// route
// ------------------------------------

class Routes {
  public readonly LOGIN: Route;

  public readonly APP: Route;

  public readonly ABOUT: Route;

  public readonly USERS: Route;

  public readonly USER: Route;

  public readonly USER_CATS: Route;

  constructor() {
    // Login

    this.LOGIN = new Route("Login", "/login");

    // App

    const app = "/app";

    this.APP = new Route("Дилер", app);

    const appAbout = `${app}/about`;
    const appUsers = `${app}/users`;
    const appUser = `${appUsers}/:id`;
    const appUserCats = `${appUsers}/:id/cats`;

    // About

    this.ABOUT = new Route("About", appAbout);

    // Users

    this.USERS = new Route("Search", appUsers);

    this.USER = new Route("Search", appUser);

    this.USER_CATS = new Route("Search", appUserCats);
  }
}

const routes = new Routes();

test("Testing 'routes.isCurrent' function", () => {
  expect(routes.ABOUT.isCurrent).toBe(false);

  window.history.pushState({}, "Page Title", routes.ABOUT.PATH);

  expect(routes.ABOUT.isCurrent).toBe(true);

  expect(routes.USERS.isCurrent).toBe(false);
});

test("Testing 'routes.isCurrent' function with param", () => {
  expect(routes.USER.isCurrent).toBe(false);

  window.history.pushState(
    {},
    "Page Title",
    routes.USER.PATH.replace(":id", "177")
  );

  expect(routes.USER.isCurrent).toBe(true);

  //

  expect(routes.USER_CATS.isCurrent).toBe(false);

  window.history.pushState(
    {},
    "Page Title",
    routes.USER_CATS.PATH.replace(":id", "177")
  );

  expect(routes.USER_CATS.isCurrent).toBe(true);
});

test("Testing 'routes.isPartOf' function", () => {
  expect(routes.ABOUT.isPartOf(routes.ABOUT.PATH)).toBe(true);

  expect(routes.ABOUT.isPartOf(routes.USERS.PATH)).toBe(false);

  expect(routes.USERS.isPartOf(routes.USER.PATH)).toBe(true);

  expect(routes.USER.isPartOf(routes.USERS.PATH)).toBe(false);
});

// ------------------------------------
// setPreviousRoute
// ------------------------------------

test("Testing 'setPreviousRoute' function", () => {
  window.history.pushState({}, "Page Title", routes.ABOUT.PATH);
  setPreviousRoute(routes as any);
  window.history.pushState({}, "Page Title", routes.USERS.PATH);
  setPreviousRoute(routes as any);

  //

  expect(routes.ABOUT.isPrevious).toBe(true);

  expect(routes.USERS.isPrevious).toBe(false);

  //

  setPreviousRoute(routes as any);

  //

  expect(routes.ABOUT.isPrevious).toBe(true);

  expect(routes.USERS.isPrevious).toBe(false);
});

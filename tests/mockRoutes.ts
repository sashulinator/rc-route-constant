import Route from "../src/index";

class Routes {
  public readonly LOGIN: Route;

  public readonly APP: Route;

  public readonly ABOUT: Route;

  public readonly USERS: Route;

  public readonly USER: Route;

  public readonly USER_CATS: Route;

  constructor() {
    // Login

    this.LOGIN = new Route({
      name: "login",
      path: "/login",
    });

    // App

    const app = "/app";

    this.APP = new Route({
      name: "app",
      path: app,
    });

    const appAbout = `${app}/about`;
    const appUsers = `${app}/users`;
    const appUser = `${appUsers}/:id`;
    const appUserCats = `${appUsers}/:id/cats`;

    // About

    this.ABOUT = new Route({
      name: "about",
      path: appAbout,
    });

    // Users

    this.USERS = new Route({
      name: "users",
      path: appUsers,
    });

    this.USER = new Route({
      name: "user",
      path: appUser,
    });

    this.USER_CATS = new Route({
      name: "user's cats",
      path: appUserCats,
    });
  }
}

export default new Routes();

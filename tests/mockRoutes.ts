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

export default new Routes();

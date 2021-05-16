import Route from "../src/index";

enum Paths {
  login = "login",
  app = "app",
  about = "about",
  users = "users",
  cats = "cats",
}

enum Args {
  userId = "userId",
}

type LOGIN = `/${Paths.login}`;
type APP = `/${Paths.app}`;
type ABOUT = `/${Paths.app}/${Paths.about}`;
type USER = `/${Paths.app}/${Paths.users}/:${Args.userId}`;
type USERS = `/${Paths.app}/${Paths.users}`;
type USER_CATS = `/${Paths.app}/${Paths.users}/:${Args.userId}/${Paths.cats}`;

const ROUTES = {
  LOGIN: new Route<LOGIN>({
    name: "login",
    path: "/login",
  }),

  APP: new Route<APP>({
    name: "app",
    path: "/app",
  }),

  ABOUT: new Route<ABOUT>({
    name: "about",
    path: "/app/about",
  }),

  USERS: new Route<USERS>({
    name: "users",
    path: "/app/users",
  }),

  USER: new Route<USER>({
    name: "user",
    path: "/app/users/:userId",
  }),

  USER_CATS: new Route<USER_CATS>({
    name: "user's cats",
    path: "/app/users/:userId/cats",
  }),
};

export default ROUTES;

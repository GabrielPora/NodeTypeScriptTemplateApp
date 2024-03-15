import { CommitController } from "./controllers/commitController";
import { UserController } from "./controllers/userController";

interface BaseRoute {
  method: "get" | "post" | "put" | "delete";
  route: string;
  controller: ControllerKey;
  action: string;
}

type ControllerMapType = typeof ControllerMap;
type ControllerKey = keyof ControllerMapType;

// Steps to add new controller to routes:
// 1. Add controller to ControllerMap - example: "ExampleController": ExampleController,
// 2. Create interface for controller route which extend BaseRoute - example: interface E
// 3. Add the new interface to the Route type - type Route = UserControllerRoute | Exampl

export const ControllerMap = {
  UserController: UserController,
  CommitController: CommitController,
} as const;

interface UserControllerRoute extends BaseRoute {
  controller: "UserController";
  action: keyof UserController;
}

interface CommitControllerRoute extends BaseRoute {
  controller: "CommitController";
  action: keyof CommitController;
}


type Route = UserControllerRoute | CommitControllerRoute;

export const Routes: Route[] = [
  // UserControllerRoutes
  {
    controller: "UserController",
    action: "getUserById",
    route: "/users",
    method: "get",
  },

  // CommitControllerRoutes
  {
    controller: "CommitController",
    action: "createCommit",
    route: "/repocommit",
    method: "get",
  },
];

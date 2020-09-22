import { Redirect, Route } from "@amoutonbrady/solid-tiny-router";
import { Component, Match, Switch } from "solid-js";

import { NotFound, Tasks, Login, Register } from "./pages";
import NewTask from "./pages/tasks/new";
import { useAuth } from "./services/auth";

const LoggedInRouter = () => {
  return (
    <Switch fallback={<Redirect path="/*" to="/tasks" />}>
      <Route path="/tasks" children={<Tasks />} />
      <Route path="/tasks/new" children={<NewTask />} />
      <Route path="/tasks/:id" children={<NotFound />} />
    </Switch>
  );
};

const LoggedOutRouter = () => {
  return (
    <Switch fallback={<Redirect path="/*" to="/login" />}>
      <Route path="/login" children={<Login />} />
      <Route path="/register" children={<Register />} />
    </Switch>
  );
};

const RouterView: Component = () => {
  const [, { isAuthenticated }] = useAuth();

  return (
    <Switch>
      <Match when={isAuthenticated()} children={<LoggedInRouter />} />
      <Match when={!isAuthenticated()} children={<LoggedOutRouter />} />
    </Switch>
  );
};

export default RouterView;

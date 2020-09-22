import { lazy } from "solid-js";

export const Tasks = lazy(() => import("./tasks"));
export { default as NewTasks } from "./tasks/new";
export const EditTasks = lazy(() => import("./tasks/edit"));
export const Register = lazy(() => import("./register"));
export const Login = lazy(() => import("./login"));
export const NotFound = lazy(() => import("./404"));

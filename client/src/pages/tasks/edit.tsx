import { Component, createResource, For } from "solid-js";
import { useApi } from "../../services/api";
import { useAuth } from "../../services/auth";

const EditTask: Component = () => {
  const api = useApi();
  const [, { logout }] = useAuth();
  const [tasks, loadTasks] = createResource([]);
  loadTasks(api.getTasks);

  return (
    <>
      <h1>Home</h1>
      <button onClick={logout}>logout</button>
      <ul>
        <For each={tasks()}>{(task) => <li>{JSON.stringify(task)}</li>}</For>
      </ul>
    </>
  );
};

export default EditTask;

import {
  Component,
  createEffect,
  createResource,
  createState,
  For,
  reconcile,
} from "solid-js";
import { Title } from "../../components/title";
import { Task, useApi } from "../../services/api";
import { Icon } from "@amoutonbrady/solid-heroicons";
import { plusCircle } from "@amoutonbrady/solid-heroicons/outline";

const Tasks: Component = () => {
  const api = useApi();
  const [taskState, setTaskState] = createState({ todo: [], done: [] });
  const [tasks, loadTasks] = createResource<Task[]>([]);
  const [form, setForm] = createState({ title: "", description: "" });
  loadTasks(api.getTasks);

  createEffect(() => {
    const todos = tasks().filter((t) => t.status === "TODO");
    const done = tasks().filter((t) => t.status === "DONE");
    setTaskState("todo", reconcile(todos));
    setTaskState("done", reconcile(done));
  });

  return () => (
    <>
      <Title>List of tasks</Title>

      {/* <Link path="/tasks/new">Create a new task</Link> */}

      <form
        class="mt-6 flex"
        onSubmit={async (e) => {
          e.preventDefault();
          await api.createTask(form);
          setForm({ title: "" });
          loadTasks(api.getTasks);
        }}
      >
        <div class="relative flex-1">
          <label
            for="title"
            class="w-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-300"
          >
            <span class="sr-only">Title</span>
            <Icon path={plusCircle} class="w-full block" />
          </label>

          <input
            value={form.title}
            onInput={(e) => setForm("title", e.target.value)}
            class="pr-3 pl-12 py-2 bg-gray-800 text-gray-300 rounded w-full"
            placeholder="Add a task"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <button type="submit" class="sr-only">
          Create a quick task
        </button>
      </form>

      <ul class="mt-6 flex flex-col space-y-3">
        <For each={taskState.todo}>
          {(task, i) => (
            <li
              class="flex items-center space-x-3 px-3 slide-in-right"
              style={{ "--delay": `${i() * 100}ms` }}
            >
              <input
                id={`task-${task.id}`}
                checked={task.status === "DONE"}
                type="checkbox"
                onChange={(e) => {
                  const parent = e.target.parentElement;
                  parent.addEventListener("animationend", async () => {
                    await api.updateTask(task.id, {
                      status: e.target.checked ? "DONE" : "TODO",
                    });
                    loadTasks(api.getTasks);
                  });
                  parent.classList.remove("slide-in-right");
                  parent.classList.add("slide-out-right");
                }}
              />

              <label for={`task-${task.id}`} class="cursor-pointer">
                {task.title}
              </label>
            </li>
          )}
        </For>
      </ul>

      <details open class="mt-6" classList={{ hidden: !taskState.done.length }}>
        <summary class="text-lg text-gray-500 cursor-pointer">Checked</summary>

        <ul class="mt-4 flex flex-col space-y-3">
          <For each={taskState.done}>
            {(task, i) => (
              <li
                class="flex items-center space-x-3 px-3 slide-in-right"
                style={{ "--delay": `${i() * 100}ms` }}
              >
                <input
                  id={`task-${task.id}`}
                  checked={task.status === "DONE"}
                  type="checkbox"
                  onChange={(e) => {
                    const parent = e.target.parentElement;
                    parent.addEventListener("animationend", async () => {
                      await api.updateTask(task.id, {
                        status: e.target.checked ? "DONE" : "TODO",
                      });
                      loadTasks(api.getTasks);
                    });
                    parent.classList.remove("slide-in-right");
                    parent.classList.add("slide-out-right");
                  }}
                />

                <label
                  for={`task-${task.id}`}
                  class="cursor-pointer line-through opacity-25"
                >
                  {task.title}
                </label>
              </li>
            )}
          </For>
        </ul>
      </details>
    </>
  );
};

export default Tasks;

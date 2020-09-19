import {
  Component,
  createEffect,
  createResource,
  createSignal,
  createState,
  For,
  Show,
  Switch,
} from "solid-js";
import { render } from "solid-js/dom";
import {
  Link,
  Route,
  RouterProvider,
  useRouter,
} from "@amoutonbrady/solid-tiny-router";
import { I18nProvider, useI18n } from "@amoutonbrady/solid-i18n";
import { ApiProvider, useApi } from "./services/api";
import { dict } from "./i18n";

const App: Component = () => {
  const [router, { push }] = useRouter();
  const [$t, { locale }] = useI18n();
  const [form, setForm] = createState({ title: "", description: "" });
  const api = useApi();
  const [updateForm, setUpdateForm] = createState({
    title: "",
    description: "",
  });
  const [todos, loadTodos] = createResource([]);
  const [showAddTaskModal, setShowAddTaskModal] = createSignal(false);
  loadTodos(() => api.getTasks());

  createEffect(async () => {
    if (!router.params.id) return;

    const { title, description } = await api.getTask(+router.params.id);
    setUpdateForm({ title, description });
  });

  const createTask = async (e: Event) => {
    e.preventDefault();

    await api.createTask(form);
    setForm({ title: "", description: "" });
    setShowAddTaskModal(false);
    loadTodos(() => api.getTasks());
  };

  const updateTask = async (id: string, e: Event) => {
    e.preventDefault();

    await api.updateTask(+id, updateForm);
    push("/");
    loadTodos(() => api.getTasks());
  };

  const deleteTask = async (id: number) => {
    await api.deleteTask(id);
    loadTodos(() => api.getTasks());
  };

  const changeStatus = async (
    id: number,
    e: Event & { target: HTMLInputElement }
  ) => {
    await api.updateTask(id, { status: e.target.checked ? "DONE" : "TODO" });
    loadTodos(() => api.getTasks());
  };

  return (
    <>
      <h1 class="font-bold text-2xl text-center">{$t("title")}</h1>

      <ul class="mt-6 flex flex-col space-y-4 max-w-sm mx-auto">
        <For each={todos()}>
          {(task) => (
            <li class="flex flex-col items-center rounded bg-gray-800 px-3 py-2">
              <div class="flex w-full items-center">
                <label for={`task-${task.id}`} class="sr-only">
                  {$t("update.status", { id: task.id })}
                </label>
                <input
                  id={`task-${task.id}`}
                  checked={task.status === "DONE"}
                  required
                  type="checkbox"
                  onChange={[changeStatus, task.id]}
                />
                <Link
                  path={+router.params.id === task.id ? "/" : `/${task.id}`}
                  class="ml-4 cursor-pointer flex-1"
                  classList={{ "line-through": task.status === "DONE" }}
                >
                  {task.title}
                </Link>
                <button
                  onClick={[deleteTask, task.id]}
                  type="button"
                  class="text-red-800 bg-red-200 text-2xl h-6 w-6 flex items-center justify-center rounded border-red-800 hover:bg-red-300 ml-auto"
                >
                  &times;
                </button>
              </div>

              <Switch>
                <Route path="/:id">
                  <Show when={+router.params.id === task.id}>
                    <form
                      onSubmit={[updateTask, router.params.id]}
                      class="flex relative flex-col"
                    >
                      <h2 class="text-center font-bold text-lg">
                        {$t("update.title", { title: updateForm.title })}
                      </h2>

                      <div class="flex flex-col space-y-1 mt-4">
                        <label for="update-title">{$t("task.title")}</label>
                        <input
                          class="border rounded px-3 py-1 text-gray-800"
                          value={updateForm.title}
                          onInput={(e) =>
                            setUpdateForm("title", e.target.value)
                          }
                          id="update-title"
                          name="update-title"
                          type="text"
                        />
                      </div>

                      <div class="flex flex-col space-y-1 mt-4">
                        <label for="update-description">
                          {$t("task.description")}
                        </label>
                        <textarea
                          class="border rounded px-3 py-1 text-gray-800"
                          onInput={(e) =>
                            setUpdateForm("description", e.target.value)
                          }
                          id="update-description"
                          name="update-description"
                        >
                          {updateForm.description}
                        </textarea>
                      </div>

                      <button
                        type="submit"
                        class="px-4 mt-4 py-2 rounded bg-blue-200 text-blue-800 ml-auto uppercase text-sm tracking-wide hover:bg-blue-300"
                      >
                        {$t("update.cta")}
                      </button>
                    </form>
                  </Show>
                </Route>
              </Switch>
            </li>
          )}
        </For>
        <li class="flex items-center rounded bg-gray-800 px-3 py-2">
          <span>{$t("add.title")}</span>
          <button
            onClick={() => setShowAddTaskModal(true)}
            type="button"
            class="text-green-800 overflow-hidden bg-green-200 text-2xl h-6 w-6 flex items-center justify-center rounded border-green-800 hover:bg-green-300 ml-auto"
          >
            +
          </button>
        </li>
      </ul>

      <div
        class="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10"
        classList={{ hidden: !showAddTaskModal() }}
      >
        <form
          onSubmit={createTask}
          class="flex relative flex-col max-w-sm bg-gray-900 shadow border border-black p-6 py-4 rounded"
        >
          <h2 class="text-center font-bold text-lg">{$t("add.title")}</h2>
          <button
            type="button"
            class="absolute top-2 text-2xl right-2 text-red-800 bg-red-200 h-6 w-6 flex items-center justify-center rounded border-red-800 hover:bg-red-300"
            onClick={() => setShowAddTaskModal(false)}
          >
            &times;
          </button>

          <div class="flex flex-col space-y-1 mt-4">
            <label for="title">{$t("task.title")}</label>
            <input
              class="border rounded px-3 py-1 text-gray-800"
              value={form.title}
              onInput={(e) => setForm("title", e.target.value)}
              required
              id="title"
              name="title"
              type="text"
            />
          </div>

          <div class="flex flex-col space-y-1 mt-4">
            <label for="description">{$t("task.description")}</label>
            <textarea
              class="border rounded px-3 py-1 text-gray-800"
              onInput={(e) => setForm("description", e.target.value)}
              id="description"
              name="description"
            >
              {form.description}
            </textarea>
          </div>

          <button
            type="submit"
            class="px-4 mt-4 py-2 rounded bg-blue-200 text-blue-800 ml-auto uppercase text-sm tracking-wide hover:bg-blue-300"
          >
            {$t("add.cta")}
          </button>
        </form>
      </div>
      <footer class="fixed bottom-0 left-0 p-3 space-x-1">
        <button
          class="uppercase text-xs tracking-wide opacity-50"
          classList={{ "opacity-100": locale() === "fr-FR" }}
          onClick={[locale, "fr-FR"]}
        >
          Francais
        </button>
        <span class="opacity-50 text-xs">|</span>
        <button
          class="uppercase text-xs tracking-wide opacity-50"
          classList={{ "opacity-100": locale() === "en-US" }}
          onClick={[locale, "en-US"]}
        >
          English
        </button>
      </footer>
    </>
  );
};

render(
  () => (
    <RouterProvider>
      <ApiProvider url="http://localhost:3000/">
        <I18nProvider locale={navigator.language} dict={dict}>
          <App />
        </I18nProvider>
      </ApiProvider>
    </RouterProvider>
  ),
  document.getElementById("app")
);

import { http, method, appendUrl, appendBody } from "@amoutonbrady/tiny-http";
import { Component, createContext, useContext } from "solid-js";

function createAPIStore(url: string) {
  const client = http({
    url,
    json: true,
    responseType: "json",
  });

  return {
    getTasks() {
      return client.get<Task[]>("tasks");
    },
    getTask(id: number) {
      return client.get<Task>(`tasks/${id}`);
    },
    deleteTask(id: number) {
      return client
        .pipe(method("DELETE"), appendUrl(`tasks/${id}`))
        .run<void>();
    },
    createTask(task: Pick<Task, "title" | "description">) {
      return client.post<Task>("tasks", { ...task, status: "TODO" });
    },
    updateTask(
      id: number,
      task: Partial<Pick<Task, "title" | "description" | "status">>
    ) {
      return client
        .pipe(method("PATCH"), appendUrl(`tasks/${id}`), appendBody(task))
        .run<Task>();
    },
  };
}

const ApiContext = createContext<ReturnType<typeof createAPIStore>>();

export const ApiProvider: Component<{ url: string }> = (props) => {
  return (
    <ApiContext.Provider value={createAPIStore(props.url)}>
      {props.children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "DONE";
  createdAt: number;
  updatedAt: number;
}

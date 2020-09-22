import { Component, Show } from "solid-js";
import { useAuth } from "../services/auth";

export const DefaultLayout: Component<{
  sidebar: Component;
  content: Component;
}> = (props) => {
  const [, { isAuthenticated }] = useAuth();
  return (
    <div
      class="grid h-screen overflow-hidden bg-gray-900 text-gray-100"
      style="grid-template-columns: auto 1fr"
    >
      <Show when={isAuthenticated()}>
        <aside class="w-64 bg-gray-800 h-full p-8">
          <props.sidebar />
        </aside>
      </Show>

      <main class="w-full h-full">
        <div class="max-w-2xl mx-auto p-8">
          <props.content />
        </div>
      </main>
    </div>
  );
};

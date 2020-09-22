import { useRouter } from "@amoutonbrady/solid-tiny-router";
import { Component, createState } from "solid-js";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useApi } from "../../services/api";

const NewTask: Component = () => {
  const api = useApi();
  const [, { push }] = useRouter();
  const [form, setForm] = createState({ title: "", description: "" });

  return (
    <div class="max-w-md mx-auto p-8 space-y-6">
      <h1 class="text-xl font-bold">Add a new task</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          api.createTask(form).then(() => push("/tasks"));
        }}
        class="flex flex-col space-y-4"
      >
        <Input
          value={form.title}
          onInput={(e) => setForm("title", e.target.value)}
          label="Title"
        />
        <Input
          value={form.description}
          onInput={(e) => setForm("description", e.target.value)}
          label="Description"
        />

        <Button type="submit" class="ml-auto">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewTask;

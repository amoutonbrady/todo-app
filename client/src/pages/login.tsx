import { Link } from "@amoutonbrady/solid-tiny-router";
import { Component, createState, Show } from "solid-js";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useAuth } from "../services/auth";
import { Title } from "../components/title";

const Login: Component = () => {
  const [auth, { login }] = useAuth();
  const [form, setForm] = createState({ email: "", password: "" });

  return (
    <div class="max-w-md mx-auto p-8 space-y-6">
      <Title>Login Form</Title>
      <Show when={auth.error}>
        <p class="text-red-800">{auth.error}</p>
      </Show>
      <form
        class="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          login(form);
        }}
      >
        <Input
          value={form.email}
          onInput={(e) => setForm("email", e.target.value)}
          label="Email"
          type="email"
          required
          placeholder="Enter your email..."
        />
        <Input
          value={form.password}
          onInput={(e) => setForm("password", e.target.value)}
          label="Password"
          type="password"
          required
          placeholder="Enter your password..."
        />
        <Button type="submit" class="ml-auto">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;

import { Component } from "solid-js";
import { useAuth } from "../services/auth";

export const Sidebar: Component = () => {
  const [auth] = useAuth();

  return (
    <>
      <p>{auth.user.email}</p>
    </>
  );
};

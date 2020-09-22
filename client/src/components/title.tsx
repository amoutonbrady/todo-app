import { Component } from "solid-js";

export const Title: Component = (props) => (
  <h1 class="text-xl font-bold">{props.children}</h1>
);

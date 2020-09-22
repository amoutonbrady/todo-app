import { Component } from "solid-js";
import { DefaultLayout } from "./layout";
import { Sidebar } from "./layout/sidebar";
import RouterView from "./router";

const App: Component = () => {
  return <DefaultLayout sidebar={Sidebar} content={RouterView} />;
};

export default App;

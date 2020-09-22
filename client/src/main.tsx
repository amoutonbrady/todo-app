import { I18nProvider } from "@amoutonbrady/solid-i18n";
import { RouterProvider } from "@amoutonbrady/solid-tiny-router";

import App from "./app";
import { dict } from "./i18n";
import { ApiProvider } from "./services/api";
import { AuthProvider } from "./services/auth";
import { createApp } from "./utils/bootstrap";

const app = createApp(App);

app.use(RouterProvider);
app.use(ApiProvider, { url: "http://localhost:3000/" });
app.use(I18nProvider, { dict });
app.use(AuthProvider);

app.mount("#app");

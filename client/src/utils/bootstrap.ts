import { Component } from "solid-js";
import { createComponent, hydrate, render } from "solid-js/dom";

export function createApp(app: Component) {
  const containers: { container: Component; opts?: Record<string, any> }[] = [];

  const mergeContainers = () => {
    return containers.reduceRight(
      (a, { container, opts }) => {
        return () =>
          createComponent(container, {
            ...opts,

            get children() {
              return a();
            },
          });
      },
      () => app
    );
  };

  return {
    use(container: Component, opts?: Record<string, any>) {
      containers.push({ container, opts });
    },
    mount(
      dom: HTMLElement | string,
      { ssr }: { ssr: boolean } = { ssr: false }
    ) {
      const root = typeof dom === "string" ? document.querySelector(dom) : dom;
      const application = mergeContainers();

      return ssr ? hydrate(application, root) : render(application, root);
    },
  };
}

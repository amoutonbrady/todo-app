import { Component, splitProps } from "solid-js";

export const Button: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, [
    "class",
    "classList",
    "status",
  ]);

  return () => {
    const status = internal.status || "info";

    const classes = [
      internal.class || "",
      "px-3",
      "py-1",
      "uppercase",
      "text-sm",
      "tracking-wide",
      "rounded",
    ].join(" ");

    const classList = {
      ...(internal.classList || {}),
      "bg-green-200 hover:bg-green-300 text-green-800": status === "success",
      "bg-blue-200 hover:bg-blue-300 text-blue-800": status === "info",
      "bg-red-200 hover:bg-red-300 text-red-800": status === "error",
      "bg-orange-200 hover:bg-orange-300 text-orange-800": status === "warning",
    };

    return (
      <button class={classes} classList={classList} type="button" {...external}>
        {props.children}
      </button>
    );
  };
};

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: "info" | "warning" | "success" | "error";
}

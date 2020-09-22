import { Component, splitProps } from "solid-js";
import { uid } from "../utils/uniqueId";

export const Input: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, ["label", "class"]);
  const id = uid();
  const classes = "flex flex-col space-y-1" + (internal.class || "");

  return (
    <div class={classes}>
      <label for={external.id || id} class="cursor-pointer mr-auto">
        {internal.label}
      </label>
      <input id={id} {...external} class="px-3 py-1 border rounded" />
    </div>
  );
};

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

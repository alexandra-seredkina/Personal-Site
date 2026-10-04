import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  return external ? (
    <a href={href} rel="noopener noreferrer" target="_blank" {...props} />
  ) : (
    <a href={href} {...props} />
  );
}

/** GFM task-list boxes are read-only decoration; the list item text carries the meaning. */
function Input(props: ComponentProps<"input">) {
  if (props.type !== "checkbox") return <input {...props} />;
  return (
    <span
      aria-hidden="true"
      className="mr-2 inline-block size-3.5 rounded-sm border border-muted align-[-2px]"
    />
  );
}

const components: MDXComponents = {
  a: Anchor,
  input: Input,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

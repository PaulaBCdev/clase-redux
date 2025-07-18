import "./textarea.css";
import clsx from "clsx";
import type { ComponentProps } from "react";

const Textarea = ({ className, ...props }: ComponentProps<"textarea">) => {
  return (
    <div className={clsx("textarea", className)}>
      <textarea className="textarea-input" {...props} />
    </div>
  );
};

export default Textarea;

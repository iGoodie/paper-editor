import React from "react";
import styles from "../styles/editable-text.scss";
import { classes } from "../util/classes.util";
import { ReactComponent as PencilIcon } from "../assets/icon/edit-pencil.svg";
import { useEventListener } from "../hooks/useEventListener.hook";

interface Props {
  className?: string;
  defaultValue: string;
  value: string;
  onChange: (value: string | null) => void;
}

export const EditableText = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  const [editable, setEditable] = React.useState(false);

  const makeEditable = () => {
    setEditable(true);
  };

  const makeUneditable = () => {
    if (document.activeElement != inputRef.current) {
      setEditable(false);
    }
  };

  useEventListener(spanRef, "mouseenter", makeEditable);
  useEventListener(inputRef, "mouseleave", makeUneditable);
  useEventListener(inputRef, "focusout", makeUneditable);

  return (
    <div className={classes(props.className, styles.container)}>
      <input
        ref={inputRef}
        style={{ display: !editable ? "none" : "unset" }}
        placeholder={props.defaultValue}
        value={props.value || ""}
        onChange={(event) => props.onChange(event.target.value || null)}
        onKeyDown={(event) =>
          !event.repeat && event.key == "Enter" && inputRef.current?.blur()
        }
      />

      <PencilIcon style={{ display: "none" }} />

      <span
        ref={spanRef}
        style={{ display: editable ? "none" : "unset" }}
        children={props.value || props.defaultValue}
      />
    </div>
  );
};

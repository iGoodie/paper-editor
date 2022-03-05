import React from "react";
import styles from "../styles/editable-text.scss";
import { classes } from "../util/classes.util";
import { ReactComponent as PencilIcon } from "../assets/icon/edit-pencil.svg";

interface Props {
  className?: string;
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
}

export const EditableText = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    const makeEditable = () => {
      setEditable(true);
    };
    const makeUneditable = () => {
      if (document.activeElement != inputRef.current) {
        setEditable(false);
      }
    };
    spanRef.current?.addEventListener("mouseenter", makeEditable);
    inputRef.current?.addEventListener("mouseleave", makeUneditable);
    inputRef.current?.addEventListener("focusout", makeUneditable);
    return () => {
      spanRef.current?.removeEventListener("mouseenter", makeEditable);
      inputRef.current?.removeEventListener("mouseleave", makeUneditable);
      inputRef.current?.removeEventListener("focusout", makeUneditable);
    };
  }, []);

  return (
    <div className={classes(props.className, styles.container)}>
      <input
        ref={inputRef}
        style={{ display: !editable ? "none" : "unset" }}
        placeholder={props.defaultValue}
        value={props.value || ""}
        onChange={(event) => props.onChange(event.target.value)}
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

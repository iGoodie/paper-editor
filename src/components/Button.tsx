import React from "react";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import styles from "../styles/button.scss";
import { classes } from "../util/classes.util";

interface Props {
  className?: string;
  onClick?: React.MouseEventHandler;
  bgColor?: string;
}

export const Button: React.FC<Props> = (props) => {
  const style = useInlineStyle(
    () => ({ "--bg-color": props.bgColor }),
    [props.bgColor]
  );

  return (
    <button
      className={classes(styles.button, props.className)}
      onClick={props.onClick}
      style={style}
    >
      {props.children}
    </button>
  );
};

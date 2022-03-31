import React from "react";
import styles from "../styles/button.scss";
import { classes } from "../util/classes.util";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";

interface Props {
  icon: React.ReactNode;
  size?: number;
  onClick?: React.MouseEventHandler;
  className?: string;
}

export const IconButton = (props: Props) => {
  const style = useInlineStyle(
    () => ({ "--size": `${props.size || 40}px` }),
    [props.size]
  );

  return (
    <button
      style={style}
      className={classes(styles["icon-button"], props.className)}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
};

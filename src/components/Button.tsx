import React from "react";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import styles from "../styles/button.scss";

interface Props {
  onClick?: React.MouseEventHandler;
  bgColor?: string;
}

export const Button: React.FC<Props> = (props) => {
  const style = useInlineStyle(
    () => ({ "--bg-color": props.bgColor }),
    [props.bgColor]
  );

  return (
    <button className={styles.button} onClick={props.onClick} style={style}>
      {props.children}
    </button>
  );
};

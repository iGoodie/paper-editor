import React from "react";
import styles from "../../styles/controls/accordion-control.scss";
import { classes } from "../../util/classes.util";
import { ReactComponent as Chevron } from "../../assets/icon/chevron-right.svg";

interface Props {
  header: React.ReactNode;
}

export const AccordionControl: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={classes(styles.accordion, open && styles["accordion--open"])}
    >
      <button
        className={styles.accordion__header}
        onClick={() => setOpen(!open)}
      >
        <Chevron height={16} /> {props.header}
      </button>

      <div className={styles.accordion__content}>
        <div className={styles.accordion__content__inner}>{props.children}</div>
      </div>
    </div>
  );
};

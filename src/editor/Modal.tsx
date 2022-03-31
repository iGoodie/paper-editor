import React from "react";
import styles from "../styles/modal.scss";
import { ReactComponent as CloseIcon } from "../assets/icon/close.svg";
import { useModalContext } from "../context/ModalContext";
import { IconButton } from "../components/IconButton";

export const Modal = () => {
  const ctx = useModalContext();

  if (!ctx.dialog) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.backdrop} />
      <div className={styles.dialog}>{ctx.dialog}</div>
    </div>
  );
};

export const DialogDivider = () => {
  return <div className={styles.divider} />;
};

export const DialogHeader: React.FC = (props) => {
  const ctx = useModalContext();

  return (
    <div className={styles.header}>
      {props.children}
      <IconButton
        icon={<CloseIcon />}
        className={styles.header__close}
        onClick={() => ctx.closeDialog()}
      />
    </div>
  );
};

export const DialogContent: React.FC = (props) => {
  return <div className={styles.content}>{props.children}</div>;
};

export const DialogFooter: React.FC = (props) => {
  return <div className={styles.footer}>{props.children}</div>;
};

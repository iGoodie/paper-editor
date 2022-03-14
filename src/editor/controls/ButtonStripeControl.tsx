import React from "react";
import styles from "../../styles/controls/button-stripe-control.scss";

interface StripeProps {}

interface ButtonProps {
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export const Stripe: React.FC<StripeProps> = (props) => {
  return <div className={styles.stripe}>{props.children}</div>;
};

export const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.icon}
    </button>
  );
};

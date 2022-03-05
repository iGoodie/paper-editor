import React from "react";
import { Layer } from "..";
import { getIntlMessage } from "../registry/intl/intl";
import styles from "../styles/layers-list.scss";

interface Props {
  layer: Layer;
}

export const LayerItem = (props: Props) => {
  return (
    <li className={styles.item}>
      <div className={styles.item__icon}>{props.layer.renderIcon()}</div>

      <span className={styles.item__header}>
        <span>{props.layer.renderTypeText()}</span>{" "}
        <span>
          • ({props.layer.width ?? 0} x {props.layer.height ?? 0} unit)
        </span>
      </span>

      <span className={styles.item__title}>
        {props.layer.layerName ?? getIntlMessage("papereditor.value.untitled")}
      </span>
    </li>
  );
};

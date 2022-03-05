import React from "react";
import { Layer } from "..";
import { getIntlMessage } from "../registry/intl/intl";
import styles from "../styles/layers-list.scss";
import { MeasurementUnit } from "../util/units.util";

interface Props {
  layer: Layer;
  paperUnit: MeasurementUnit;
  onClick: () => void;
}

export const LayerItem = (props: Props) => {
  return (
    <li className={styles.item} onClick={props.onClick}>
      <div className={styles.item__icon}>{props.layer.renderIcon()}</div>

      <span className={styles.item__header}>
        <span>{props.layer.renderTypeText()}</span>{" "}
        <span>
          • ({props.paperUnit.fromMillimeters(props.layer.width) ?? 0} x{" "}
          {props.paperUnit.fromMillimeters(props.layer.height) ?? 0}{" "}
          {props.paperUnit.abbr})
        </span>
      </span>

      <span className={styles.item__title}>
        {props.layer.layerName ?? getIntlMessage("papereditor.value.untitled")}
      </span>
    </li>
  );
};

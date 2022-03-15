import React from "react";
import styles from "../styles/layers-list.scss";
import { Layer } from "..";
import { useEditorContext } from "../context/EditorContext";
import { getIntlMessage } from "../registry/intl/intl";

interface Props {
  layer: Layer;
  onClick: () => void;
}

export const LayerItem = (props: Props) => {
  const ctx = useEditorContext();

  return (
    <li className={styles.item} onClick={props.onClick}>
      <div className={styles.item__icon}>{props.layer.renderIcon(ctx)}</div>

      <span className={styles.item__header}>
        <span>{props.layer.renderTypeText(ctx)}</span>{" "}
        <span>
          • ({ctx.paperUnit.fromMillimeters(props.layer.width) ?? 0} x{" "}
          {ctx.paperUnit.fromMillimeters(props.layer.height) ?? 0}{" "}
          {ctx.paperUnit.abbr})
        </span>
      </span>

      <span className={styles.item__title}>
        {props.layer.layerName ?? getIntlMessage("papereditor.value.untitled")}
      </span>
    </li>
  );
};

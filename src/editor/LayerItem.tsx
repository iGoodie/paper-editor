import React from "react";
import styles from "../styles/layers-list.scss";
import { Layer } from "..";
import { useEditorContext } from "../context/EditorContext";
import { ReactComponent as LockIcon } from "../assets/icon/lock.svg";

interface Props {
  layer: Layer;
  onClick: () => void;
  locked?: boolean;
  actions?: React.ReactNode;
}

export const LayerItem = (props: Props) => {
  const ctx = useEditorContext();
  const node = ctx.layers.getNode(props.layer, ctx);
  const width = ctx.layers.getWidth(props.layer, ctx);
  const height = ctx.layers.getHeight(props.layer, ctx);

  return (
    <li className={styles.item} onClick={props.onClick}>
      <div className={styles.item__icon}>{props.layer.renderIcon(ctx)}</div>

      <span className={styles.item__header}>
        <span>{props.layer.renderTypeText(ctx)}</span>{" "}
        {node && (
          <span>
            • ({width} x {height} {ctx.paperUnit.abbr})
          </span>
        )}
      </span>

      <span className={styles.item__title}>{props.layer.getLayerName()}</span>

      <div className={styles.item__actions}>
        {props.locked && (
          <LockIcon data-always-visible width={28} fill="#646464" />
        )}
        {props.actions}
      </div>
    </li>
  );
};

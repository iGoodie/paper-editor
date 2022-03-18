import React from "react";
import styles from "../../styles/control-panels.scss";
import { getIntlMessage } from "../../registry/intl/intl";
import { ReactComponent as CloseIcon } from "../../assets/icon/close.svg";
import { ReactComponent as SelectionBoxIcon } from "../../assets/icon/selection-box.svg";
import { EditableText } from "../../components/EditableText";
import { useEditorContext } from "../../context/EditorContext";
import { PreviewBackgroundLayer } from "../../built-in/layer/PreviewBackgroundLayer";

export const BgControlPanel = () => {
  const ctx = useEditorContext();
  const layer = new PreviewBackgroundLayer();

  return (
    <div className={styles.panel}>
      <div className={styles.panel__header}>
        <div className={styles.panel__header__icon}>
          {layer.renderIcon(ctx)}
          <SelectionBoxIcon />
        </div>
        <h2 className={styles.panel__header__desc}>Editing Background</h2>
        <p className={styles.panel__header__title}>{layer.layerName}</p>
        <button
          className={styles.panel__header__unselect}
          onClick={ctx.layers.stopEditingBg}
        >
          <CloseIcon />
        </button>
      </div>

      <div className={styles.panel__content}>{layer.renderControls(ctx)}</div>
    </div>
  );
};

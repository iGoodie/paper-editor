import React from "react";
import styles from "../../styles/control-panels.scss";
import { getIntlMessage } from "../../registry/intl/intl";
import { ReactComponent as CloseIcon } from "../../assets/icon/close.svg";
import { ReactComponent as SelectionBoxIcon } from "../../assets/icon/selection-box.svg";
import { EditableText } from "../../components/EditableText";
import { useEditorContext } from "../../context/EditorContext";

export const SingularControlPanel = () => {
  const ctx = useEditorContext();
  const selectedLayer = ctx.layers.selectedLayers[0];

  const renameLayerName = (newName: string) => {
    selectedLayer.layerName = newName;
    ctx.layers.updateLayers();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panel__header}>
        <div className={styles.panel__header__icon}>
          {selectedLayer.renderIcon(ctx)}
          <SelectionBoxIcon />
        </div>
        <h2 className={styles.panel__header__desc}>Selected Layer</h2>
        <EditableText
          className={styles.panel__header__title}
          defaultValue={getIntlMessage("papereditor.value.untitled")}
          value={selectedLayer.layerName}
          onChange={renameLayerName}
        />
        <button
          className={styles.panel__header__unselect}
          onClick={ctx.layers.unselectAll}
        >
          <CloseIcon />
        </button>
      </div>

      <div className={styles.panel__content}>
        {selectedLayer.renderControls(ctx)}
      </div>
    </div>
  );
};

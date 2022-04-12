import React from "react";
import styles from "../../styles/control-panels.scss";
import { formatIntlMessage } from "../../registry/intl/intl";
import { ReactComponent as CloseIcon } from "../../assets/icon/close.svg";
import { ReactComponent as SelectionBoxIcon } from "../../assets/icon/selection-box.svg";
import { EditableText } from "../../components/EditableText";
import { useEditorContext } from "../../context/EditorContext";
import { Button } from "../../components/Button";

export const SingularControlPanel = () => {
  const ctx = useEditorContext();
  const selectedLayer = ctx.layers.selectedLayers[0];
  const [deleting, setDeleting] = React.useState(false);

  const renameLayerName = (newName: string) => {
    selectedLayer.layerName = newName;
    ctx.layers.updateLayers();
  };

  const beginDeletion = () => {
    setDeleting(true);
    setTimeout(() => setDeleting(false), 3000);
  };

  const deleteLayer = () => {
    ctx.layers.deleteLayer(selectedLayer);
    setDeleting(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panel__header}>
        <div className={styles.panel__header__icon}>
          {selectedLayer.renderIcon(ctx)}
          <SelectionBoxIcon />
        </div>
        <h2 className={styles.panel__header__desc}>
          {formatIntlMessage("papereditor.title.selected-layer")}
        </h2>
        <EditableText
          className={styles.panel__header__title}
          defaultValue={formatIntlMessage("papereditor.value.untitled-layer")}
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
        <Button
          className={styles.panel__content__deletion}
          bgColor={deleting ? "#E34646" : undefined}
          onClick={deleting ? deleteLayer : beginDeletion}
        >
          {deleting
            ? formatIntlMessage("papereditor.btn.confirm-deletion")
            : formatIntlMessage("papereditor.btn.delete-layer")}
        </Button>
      </div>
    </div>
  );
};

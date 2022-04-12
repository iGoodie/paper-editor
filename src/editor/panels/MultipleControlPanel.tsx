import React from "react";
import styles from "../../styles/control-panels.scss";
import { useEditorContext } from "../../context/EditorContext";
import { AlignControls } from "../controls/AlignControls";
import { ReactComponent as LayersIcon } from "../../assets/icon/layers.svg";
import { ReactComponent as CloseIcon } from "../../assets/icon/close.svg";
import { ReactComponent as SelectionBoxIcon } from "../../assets/icon/selection-box.svg";
import { Button } from "../../components/Button";
import { formatIntlMessage } from "../../registry/intl/intl";

export const MultipleControlPanel = () => {
  const ctx = useEditorContext();
  const [deleting, setDeleting] = React.useState(false);
  const deletionTimeout = React.useRef<NodeJS.Timeout>();

  const beginDeletion = () => {
    setDeleting(true);
    deletionTimeout.current = setTimeout(() => {
      setDeleting(false);
      deletionTimeout.current = undefined;
    }, 3000);
  };

  const deleteLayers = () => {
    ctx.layers.selectedLayers.forEach((layer) => ctx.layers.deleteLayer(layer));
    ctx.layers.unselectAll();
    ctx.layers.updateLayers();
    setDeleting(false);
    if (deletionTimeout.current != null) {
      clearTimeout(deletionTimeout.current);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panel__header}>
        <div className={styles.panel__header__icon}>
          <LayersIcon />
          <SelectionBoxIcon />
        </div>
        <h2 className={styles.panel__header__desc}>
          {formatIntlMessage("papereditor.title.layers")}
        </h2>
        <span className={styles.panel__header__title}>
          {formatIntlMessage(
            "papereditor.title.layer-count",
            ctx.layers.selectedLayers.length
          )}
        </span>
        {/* <EditableText
          className={styles.panel__header__title}
          defaultValue={getIntlMessage("papereditor.value.untitled")}
          value={selectedLayer.layerName}
          onChange={renameLayerName}
        /> */}
        <button
          className={styles.panel__header__unselect}
          onClick={ctx.layers.unselectAll}
        >
          <CloseIcon />
        </button>
      </div>

      <div className={styles.panel__content}>
        <AlignControls layers={ctx.layers} />
        <Button
          className={styles.panel__content__deletion}
          bgColor={deleting ? "#E34646" : undefined}
          onClick={deleting ? deleteLayers : beginDeletion}
        >
          {deleting
            ? formatIntlMessage("papereditor.btn.confirm-deletion")
            : formatIntlMessage("papereditor.btn.delete-selected-layers")}
        </Button>
      </div>
    </div>
  );
};

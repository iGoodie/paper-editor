import React from "react";
import styles from "../styles/control-panels.scss";
import { Layer } from "..";
import { getIntlMessage } from "../registry/intl/intl";
import { ReactComponent as CloseIcon } from "../assets/icon/close.svg";
import { ReactComponent as SelectionBoxIcon } from "../assets/icon/selection-box.svg";
import { EditableText } from "../components/EditableText";

interface Props {
  layer: Layer;
  changeLayer: (layer: Layer) => void;
  unselectLayers: () => void;
}

export const SingularControlPanel = (props: Props) => {
  const [editingTitle, setEditingTitle] = React.useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.panel__header}>
        <div className={styles.panel__header__icon}>
          {props.layer.renderIcon()}
          <SelectionBoxIcon />
        </div>
        <h2 className={styles.panel__header__desc}>Selected Layer</h2>
        <EditableText
          className={styles.panel__header__title}
          defaultValue={getIntlMessage("papereditor.value.untitled")}
          value={props.layer.layerName}
          onChange={(value) => {
            props.layer.layerName = value;
            props.changeLayer(props.layer);
          }}
        />
        <button
          className={styles.panel__header__unselect}
          onClick={props.unselectLayers}
        >
          <CloseIcon />
        </button>
      </div>

      <div className={styles.panel__content}>Content</div>
    </div>
  );
};

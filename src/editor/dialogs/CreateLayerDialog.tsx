import React from "react";
import styles from "./CreateLayerDialog.style.scss";
import { useEditorContext } from "../../context/EditorContext";
import { ReactComponent as LayersIcon } from "../../assets/icon/layers.svg";
import {
  DialogContent,
  DialogDivider,
  DialogFooter,
  DialogHeader,
} from "../Modal";
import { mapLayerTypes } from "../../registry/layers.registry";
import { Layer } from "../base/Layer";
import { useModalContext } from "../../context/ModalContext";

interface OptionProps {
  layer: Layer;
  onClick?: () => void;
}

const LayerOption = (props: OptionProps) => {
  const ctx = useEditorContext();

  return (
    <div className={styles.option} onClick={props.onClick}>
      <div className={styles.option__icon}>{props.layer.renderIcon(ctx)}</div>
      <div className={styles.option__title}>
        {props.layer.renderTypeText(ctx)}
      </div>
      <div className={styles.option__desc}>Description here</div>
    </div>
  );
};

export const CreateLayerDialog = () => {
  const ctx = useEditorContext();
  const modal = useModalContext();

  const createLayer = (layer: Layer) => {
    ctx.layers.prependLayer(layer);
  };

  return (
    <React.Fragment>
      <DialogHeader>
        <LayersIcon />
        <h1>New Layer</h1>
      </DialogHeader>

      <DialogDivider />

      <DialogContent>
        <div className={styles.layers}>
          {mapLayerTypes((layerType) => (
            <LayerOption
              layer={new layerType()}
              onClick={() => {
                createLayer(new layerType());
                modal.closeDialog();
              }}
            />
          ))}
        </div>
      </DialogContent>

      <DialogDivider />

      <DialogFooter></DialogFooter>
    </React.Fragment>
  );
};

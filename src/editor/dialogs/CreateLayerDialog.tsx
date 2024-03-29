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
import { getLayerTypes } from "../../registry/layers.registry";
import { Layer } from "../base/Layer";
import { useModalContext } from "../../context/ModalContext";
import { formatIntlMessage } from "../../registry/intl/intl";

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
      <div className={styles.option__desc}>
        {props.layer.renderDescription(ctx)}
      </div>
    </div>
  );
};

export const CreateLayerDialog = () => {
  const ctx = useEditorContext();
  const modal = useModalContext();

  const createLayer = (layer: Layer) => {
    const createdLayer = layer.createLayer(ctx);
    ctx.layers.prependLayer(createdLayer);
  };

  return (
    <React.Fragment>
      <DialogHeader>
        <LayersIcon />
        <h1>{formatIntlMessage("papereditor.title.new-layer")}</h1>
      </DialogHeader>

      <DialogDivider />

      <DialogContent>
        <div className={styles.layers}>
          {getLayerTypes().map((layerType, index) => (
            <LayerOption
              key={index}
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

import React from "react";
import styles from "../styles/layers-panel.scss";
import { ReactComponent as LayersIcon } from "../assets/icon/layers.svg";
import { formatIntlMessage } from "../registry/intl/intl";
import { LayerItem } from "./LayerItem";
import { classes } from "../util/classes.util";
import { SingularControlPanel } from "./panels/SingularControlPanel";
import { useEditorContext } from "../context/EditorContext";
import { PreviewBackgroundLayer } from "../built-in/layer/PreviewBackgroundLayer";
import { BgControlPanel } from "./panels/BgControlPanel";
import { IconButton } from "../components/IconButton";

import { ReactComponent as MoveUp } from "../assets/icon/move-up.svg";
import { ReactComponent as MoveDown } from "../assets/icon/move-down.svg";
import { ReactComponent as AddIcon } from "../assets/icon/add.svg";
import { useModalContext } from "../context/ModalContext";
import { CreateLayerDialog } from "./dialogs/CreateLayerDialog";
import { MultipleControlPanel } from "./panels/MultipleControlPanel";

export const LayersPanel = () => {
  const ctx = useEditorContext();
  const modal = useModalContext();

  const moveLayerUp = (index: number) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const thisLayer = ctx.layers.list[index];
    const upperLayer = ctx.layers.list[index - 1];
    ctx.layers.list[index] = upperLayer;
    ctx.layers.list[index - 1] = thisLayer;
    ctx.layers.updateLayers();
  };

  const moveLayerDown = (index: number) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const thisLayer = ctx.layers.list[index];
    const lowerLayer = ctx.layers.list[index + 1];
    ctx.layers.list[index] = lowerLayer;
    ctx.layers.list[index + 1] = thisLayer;
    ctx.layers.updateLayers();
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <LayersIcon />
        <h1>{formatIntlMessage("papereditor.title.layers")}</h1>
        <IconButton
          className={styles.header__add}
          icon={<AddIcon />}
          onClick={() => modal.setDialog(<CreateLayerDialog />)}
        />
      </div>

      <div className={styles.content}>
        <ol className={styles.content__list}>
          {ctx.layers.list.map((layer, index) => (
            <LayerItem
              key={index}
              layer={layer}
              onClick={() => ctx.layers.selectLayers(index)}
              actions={
                <React.Fragment>
                  {index != 0 && (
                    <MoveUp width={18} onClick={moveLayerUp(index)} />
                  )}
                  {index != ctx.layers.list.length - 1 && (
                    <MoveDown width={18} onClick={moveLayerDown(index)} />
                  )}
                </React.Fragment>
              }
            />
          ))}
          <LayerItem
            locked
            layer={new PreviewBackgroundLayer()}
            onClick={ctx.layers.beginEditingBg}
          />
        </ol>
      </div>

      <div
        className={classes(
          styles["selection-controls"],
          ctx.layers.editingBg && styles["selection-controls--active"],
          ctx.layers.selectedLayers.length !== 0 &&
            styles["selection-controls--active"]
        )}
      >
        {ctx.layers.editingBg ? (
          <BgControlPanel />
        ) : ctx.layers.singularSelected ? (
          <SingularControlPanel />
        ) : ctx.layers.multipleSelected ? (
          <MultipleControlPanel />
        ) : null}
      </div>
    </React.Fragment>
  );
};

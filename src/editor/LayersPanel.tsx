import React from "react";
import styles from "../styles/layers-panel.scss";
import { Layer, MeasurementUnit } from "..";
import { ReactComponent as LayersIcon } from "../assets/icon/layers.svg";
import { getIntlMessage } from "../registry/intl/intl";
import { LayerItem } from "./LayerItem";
import { classes } from "../util/classes.util";
import { SingularControlPanel } from "./SingularControlPanel";
import { Layers } from "../hooks/useLayers.hook";

interface Props {
  layers: Layers;
  paperUnit: MeasurementUnit;
}

export const LayersPanel = (props: Props) => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <LayersIcon />
        <h1>{getIntlMessage("papereditor.title.layers")}</h1>
      </div>

      <div className={styles.content}>
        <ol className={styles.content__list}>
          {props.layers.list.map((layer, index) => (
            <LayerItem
              key={index}
              layer={layer}
              paperUnit={props.paperUnit}
              onClick={() => props.layers.selectLayers(index)}
            />
          ))}
        </ol>
      </div>

      <div
        className={classes(
          styles["selection-controls"],
          props.layers.singularSelected && styles["selection-controls--active"]
        )}
      >
        {props.layers.singularSelected && (
          <SingularControlPanel layers={props.layers} />
        )}
      </div>

      <div
        className={classes(
          styles["selection-controls"],
          props.layers.multipleSelected && styles["selection-controls--active"]
        )}
      >
        Multiple items selected
      </div>
    </React.Fragment>
  );
};

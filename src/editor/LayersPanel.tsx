import React from "react";
import styles from "../styles/layers-panel.scss";
import { Layer, MeasurementUnit } from "..";
import { ReactComponent as LayersIcon } from "../assets/icon/layers.svg";
import { getIntlMessage } from "../registry/intl/intl";
import { LayerItem } from "./LayerItem";
import { classes } from "../util/classes.util";

interface Props {
  layers: Layer[];
  paperUnit: MeasurementUnit;
}

export const LayersPanel = (props: Props) => {
  const [selectedLayer, setSelectedLayer] = React.useState<Layer>();

  return (
    <React.Fragment>
      <div className={styles.header}>
        <LayersIcon />
        <h1>{getIntlMessage("papereditor.title.layers")}</h1>
      </div>

      <div className={styles.content}>
        <ol className={styles.content__list}>
          {props.layers.map((layer) => (
            <LayerItem
              layer={layer}
              paperUnit={props.paperUnit}
              onClick={() => setSelectedLayer(layer)}
            />
          ))}
        </ol>
      </div>

      <div
        className={classes(
          styles["selection-controls"],
          selectedLayer && styles["selection-controls--active"]
        )}
      >
        Selection Controls
        <button onClick={() => setSelectedLayer(undefined)}>Unselect</button>
      </div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "../styles/layers-panel.scss";
import { Layer, MeasurementUnit } from "..";
import { ReactComponent as LayersIcon } from "../assets/icon/layers.svg";
import { getIntlMessage } from "../registry/intl/intl";
import { LayerItem } from "./LayerItem";
import { classes } from "../util/classes.util";
import { SingularControlPanel } from "./SingularControlPanel";

interface Props {
  layers: Layer[];
  onLayersChange: (layers: Layer[]) => void;
  paperUnit: MeasurementUnit;
}

export const LayersPanel = (props: Props) => {
  const [selectedLayers, setSelectedLayers] = React.useState<number[]>([]);

  const unselectLayers = () => setSelectedLayers([]);

  const changeLayer = (index: number) => (layer: Layer) => {
    const newLayers = [...props.layers];
    newLayers[index] = layer;
    props.onLayersChange(newLayers);
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <LayersIcon />
        <h1>{getIntlMessage("papereditor.title.layers")}</h1>
      </div>

      <div className={styles.content}>
        <ol className={styles.content__list}>
          {props.layers.map((layer, index) => (
            <LayerItem
              key={index}
              layer={layer}
              paperUnit={props.paperUnit}
              onClick={() => setSelectedLayers([index])}
            />
          ))}
        </ol>
      </div>

      <div
        className={classes(
          styles["selection-controls"],
          selectedLayers.length != 0 && styles["selection-controls--active"]
        )}
      >
        {selectedLayers.length == 1 ? (
          <SingularControlPanel
            layer={props.layers[selectedLayers[0]]}
            changeLayer={changeLayer(selectedLayers[0])}
            unselectLayers={unselectLayers}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "../styles/layers-panel.scss";
import { Layer } from "..";
import { ReactComponent as LayersIcon } from "../assets/icon/layers.svg";
import { getIntlMessage } from "../registry/intl/intl";
import { LayerItem } from "./LayerItem";

interface Props {
  layers: Layer[];
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
          {props.layers.map((layer) => (
            <LayerItem layer={layer} />
          ))}
        </ol>
      </div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "../styles/canvas-item.scss";
import { Layer } from "./base/Layer";
import { Layers } from "../hooks/useLayers.hook";
import { Transformations } from "../hooks/useTransformation.hook";
import { classes } from "../util/classes.util";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { getUnitByAbbr, MeasurementUnit } from "../util/units.util";

interface Props {
  index: number;
  layer: Layer;
  layers: Layers;
  transformations: Transformations;
}

export const CanvasItem = (props: Props) => {
  const selected = props.layers.selectedLayers.includes(props.layer);

  const outterStyles = useInlineStyle(
    () => ({
      "--x": getUnitByAbbr("mm").toPixels(props.layer.x) + "px",
      "--y": getUnitByAbbr("mm").toPixels(props.layer.y) + "px",
      "--width": props.layer.width,
      "--height": props.layer.height,
      "--scale": props.transformations.scale,
    }),
    [
      props.layer.x,
      props.layer.y,
      props.layer.width,
      props.layer.height,
      props.transformations.scale,
    ]
  );

  return (
    <div
      data-layerindex={props.index}
      className={classes(styles.outter, selected && styles["outter--selected"])}
      style={outterStyles}
    >
      {props.layer.renderCanvas()}
    </div>
  );
};

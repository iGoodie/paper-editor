import React from "react";
import styles from "../styles/canvas-item.scss";
import { Layer } from "./base/Layer";
import { classes } from "../util/classes.util";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { getUnitByAbbr } from "../util/units.util";
import { useEditorContext } from "../context/EditorContext";

interface Props {
  index: number;
  layer: Layer;
}

export const CanvasItem = (props: Props) => {
  const ctx = useEditorContext();
  const selected = ctx.layers.selectedLayers.includes(props.layer);

  const unit = getUnitByAbbr("mm");

  const outterStyles = useInlineStyle(
    () => ({
      "--x": unit.toPixels(props.layer.x) + "px",
      "--y": unit.toPixels(props.layer.y) + "px",
      "--scale": ctx.transformations.scale,
      "--width": props.layer.width
        ? "fit-content"
        : unit.toPixels(props.layer.width) + "px",
      "--height": props.layer.height
        ? "fit-content"
        : unit.toPixels(props.layer.height) + "px",
    }),
    [
      props.layer.x,
      props.layer.y,
      props.layer.width,
      props.layer.height,
      ctx.transformations.scale,
    ]
  );

  return (
    <div
      data-layerindex={props.index}
      className={classes(styles.outter, selected && styles["outter--selected"])}
      style={outterStyles}
    >
      {props.layer.renderCanvas(ctx)}
    </div>
  );
};

import React from "react";
import styles from "../styles/canvas-item.scss";
import { Layer } from "./base/Layer";
import { classes } from "../util/classes.util";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { getUnitByAbbr } from "../util/units.util";
import { useEditorContext } from "../context/EditorContext";
import { Coordinate, useMouseGrab } from "../hooks/useMouseGrab.hook";
import { useEventListener } from "../hooks/useEventListener.hook";

interface Props {
  index: number;
  layer: Layer;
}

export const CanvasItem = (props: Props) => {
  const ctx = useEditorContext();
  const selected = ctx.layers.selectedLayers.includes(props.layer);

  const unitMm = getUnitByAbbr("mm");

  const [prevPos, setPrevPos] = React.useState<Coordinate>({ x: 0, y: 0 });
  const grabber = useMouseGrab({
    onGrabBegin: () => {
      setPrevPos({
        x: props.layer.x,
        y: props.layer.y,
      });
    },
    onGrabTick: (delta) => {
      ctx.layers.selectedLayers.forEach((layer) => {
        layer.x =
          prevPos.x + unitMm.fromPixels(delta.x) / ctx.transformations.scale;
        layer.y =
          prevPos.y + unitMm.fromPixels(delta.y) / ctx.transformations.scale;
      });
      ctx.layers.updateLayers();
    },
  });

  const onMouseDown: React.MouseEventHandler = (event) => {
    if (event.button !== 0 /* Left-click */) return;
    if (!selected) return;
    grabber.beginGrab({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const onMouseUp = (event: MouseEvent) => {
    if (event.button !== 0 /* Left-click */) return;
    grabber.endGrab();
  };

  const onMouseMove = (event: MouseEvent) => {
    grabber.tickGrab({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEventListener(ctx.refs.editorRef, "mouseup", onMouseUp);
  useEventListener(ctx.refs.editorRef, "mousemove", onMouseMove);

  const outterStyles = useInlineStyle(
    () => ({
      "--x": unitMm.toPixels(props.layer.x) + "px",
      "--y": unitMm.toPixels(props.layer.y) + "px",
      "--scale": ctx.transformations.scale,
      "--width": props.layer.autoFit
        ? "fit-content"
        : unitMm.toPixels(props.layer.width) + "px",
      "--height": props.layer.autoFit
        ? "fit-content"
        : unitMm.toPixels(props.layer.height) + "px",
    }),
    [
      props.layer.x,
      props.layer.y,
      props.layer.width,
      props.layer.height,
      props.layer.autoFit,
      ctx.transformations.scale,
    ]
  );

  return (
    <div
      data-layerindex={props.index}
      className={classes(styles.outter, selected && styles["outter--selected"])}
      style={outterStyles}
      onMouseDown={onMouseDown}
    >
      {props.layer.renderCanvas(ctx)}
    </div>
  );
};

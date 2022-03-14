import React from "react";
import styles from "../styles/canvas.scss";
import { MeasurementUnit } from "..";
import { Transformations } from "../hooks/useTransformation.hook";
import { useEventListener } from "../hooks/useEventListener.hook";
import { Layers } from "../hooks/useLayers.hook";
import { CanvasItem } from "./CanvasItem";

interface Props {
  layers: Layers;
  transformations: Transformations;
  paperDimensions: { width: number; height: number };
  paperUnit: MeasurementUnit;
  title?: string;
}

export const Canvas = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const viewportRef = props.transformations.refs.viewport;

  const onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();

    const delta = event.deltaY * -0.01;
    props.transformations.zoom(delta * 0.1);
  };

  const onMouseUp = (event: MouseEvent) => {
    if (event.button === 1 /* Mid-click */) {
      // Stop grabbing if grabbing
    }
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();

    if (event.button === 0 /* Left-click */) {
      const canvasItem = (event.target as HTMLElement).closest<HTMLDivElement>(
        "[data-layerindex]"
      );

      if (!canvasItem) {
        props.layers.unselectAll();
        return;
      }

      const layerIndex = parseInt(canvasItem.dataset.layerindex || "-1");

      if (event.shiftKey) {
        if (props.layers.selectedLayerIndices.includes(layerIndex)) {
          return props.layers.unselectLayer(layerIndex);
        }

        return props.layers.selectLayers(
          ...props.layers.selectedLayerIndices,
          layerIndex
        );
      }

      return props.layers.selectLayers(layerIndex);
    }

    if (event.button === 1 /* Mid-click */) {
      // Grab clicked point
    }
  };

  const disableAction = (event: MouseEvent) => {
    event.preventDefault();
  };

  useEventListener(viewportRef, "wheel", onMouseWheel);
  useEventListener(viewportRef, "mouseup", onMouseUp);
  useEventListener(viewportRef, "mousedown", onMouseDown);
  useEventListener(viewportRef, "contextmenu", disableAction);

  return (
    <div
      className={styles.canvas}
      style={{
        transform: [
          `translateX(${props.transformations.offset.x}px)`,
          `translateY(${props.transformations.offset.y}px)`,
          `scale(${props.transformations.scale})`,
        ].join(" "),
      }}
    >
      <div ref={ref} className={styles.paper}>
        {props.layers.list.map((layer, index) => (
          <CanvasItem
            index={index}
            layer={layer}
            layers={props.layers}
            transformations={props.transformations}
          />
        ))}
      </div>

      <div
        className={styles.manifest}
        style={{
          transform: `translateY(100%) translateY(5px) scale(${
            1 / props.transformations.scale
          })`,
        }}
      >
        <h1>{props.title || "Untitled Document"}</h1>
        <h2>
          {props.paperDimensions.width ?? 0} x{" "}
          {props.paperDimensions.height ?? 0} {props.paperUnit.abbr}
        </h2>
      </div>
    </div>
  );
});

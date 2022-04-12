import React from "react";
import styles from "../styles/canvas.scss";
import { useEventListener } from "../hooks/useEventListener.hook";
import { CanvasItem } from "./CanvasItem";
import { useEditorContext } from "../context/EditorContext";
import { reverseMap } from "../util/reverse-map.util";
import { formatIntlMessage } from "../registry/intl/intl";

export const Canvas = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const ctx = useEditorContext();

  const viewportRef = ctx.refs.viewportRef;

  const onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();

    const delta = event.deltaY * -0.01;
    ctx.transformations.zoom(delta * 0.1);
  };

  const onMouseUp = (event: MouseEvent) => {
    if (event.button === 1 /* Mid-click */) {
      ctx.transformations.endGrab();
    }
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();

    if (event.button === 0 /* Left-click */) {
      const canvasItem = (event.target as HTMLElement).closest<HTMLDivElement>(
        "[data-layerindex]"
      );

      if (!canvasItem) {
        ctx.layers.unselectAll();
        return;
      }

      const layerIndex = parseInt(canvasItem.dataset.layerindex || "-1");

      if (event.shiftKey) {
        if (ctx.layers.selectedLayerIndices.includes(layerIndex)) {
          return ctx.layers.unselectLayer(layerIndex);
        }

        return ctx.layers.selectLayers(
          ...ctx.layers.selectedLayerIndices,
          layerIndex
        );
      }

      return ctx.layers.selectLayers(layerIndex);
    }

    if (event.button === 1 /* Mid-click */) {
      ctx.transformations.beginGrab({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (ctx.transformations.grabbing) {
      ctx.transformations.tickGrab({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const disableAction = (event: MouseEvent) => {
    event.preventDefault();
  };

  useEventListener(viewportRef, "wheel", onMouseWheel);
  useEventListener(viewportRef, "mouseup", onMouseUp);
  useEventListener(viewportRef, "mousedown", onMouseDown);
  useEventListener(viewportRef, "mousemove", onMouseMove);
  useEventListener(viewportRef, "contextmenu", disableAction);

  return (
    <div
      className={styles.canvas}
      style={{
        transform: [
          `translateX(${ctx.transformations.offset.x}px)`,
          `translateY(${ctx.transformations.offset.y}px)`,
          `scale(${ctx.transformations.scale})`,
        ].join(" "),
      }}
    >
      <div ref={ref} className={styles.paper}>
        {reverseMap(ctx.layers.list, (layer, reverseIndex) => (
          <CanvasItem key={reverseIndex} index={reverseIndex} layer={layer} />
        ))}
      </div>

      <div
        className={styles.manifest}
        style={{
          transform: `translateY(100%) translateY(5px) scale(${
            1 / ctx.transformations.scale
          })`,
        }}
      >
        <h1>
          {ctx.editorProps.title ||
            formatIntlMessage("papereditor.value.untitled-document")}
        </h1>
        <h2>
          {ctx.editorProps.paperDimensions.width ?? 0} x{" "}
          {ctx.editorProps.paperDimensions.height ?? 0} {ctx.paperUnit.abbr}
        </h2>
      </div>
    </div>
  );
});

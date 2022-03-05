import React from "react";
import styles from "../styles/canvas.scss";
import { MeasurementUnit } from "..";
import { useTransformation } from "../hooks/useTransformation.hook";
import { useEventListener } from "../hooks/useEventListener.hook";

interface Props {
  transformations: ReturnType<typeof useTransformation>;
  paperDimensions: { width: number; height: number };
  paperUnit: MeasurementUnit;
  title?: string;
}

export const Canvas = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const viewportRef = props.transformations.viewportRef;

  const onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();

    const delta = event.deltaY * -0.01;
    props.transformations.zoom(delta * 0.1);
  };

  useEventListener(viewportRef, "wheel", onMouseWheel);

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
      <div ref={ref} className={styles.paper}></div>

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
          {props.paperUnit.fromMillimeters(props.paperDimensions.width) ?? 0} x{" "}
          {props.paperUnit.fromMillimeters(props.paperDimensions.height) ?? 0}{" "}
          {props.paperUnit.abbr}
        </h2>
      </div>
    </div>
  );
});

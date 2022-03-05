import React from "react";
import styles from "../styles/canvas.scss";
import { MeasurementUnit } from "..";
import { useTransformation } from "../hooks/useTransformation.hook";

interface Props {
  transformations: ReturnType<typeof useTransformation>;
  paperDimensions: { width: number; height: number };
  paperUnit: MeasurementUnit;
  title?: string;
}

export const Canvas = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
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
        Elements here!
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
        <h2>Size Here</h2>
      </div>
    </div>
  );
});

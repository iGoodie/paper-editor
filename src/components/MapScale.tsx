import React from "react";
import styles from "../styles/map-scale.scss";
import { MeasurementUnit } from "..";
import { Transformations } from "../hooks/useTransformation.hook";
import { ReactComponent as ScaleShape } from "../assets/icon/map-scale.svg";
import { classes } from "../util/classes.util";

interface Props {
  className?: string;
  width: number;
  transformations: Transformations;
  paperUnit: MeasurementUnit;
}

export const MapScale = (props: Props) => {
  const value =
    props.paperUnit.fromPixels(props.width) / props.transformations.scale;

  return (
    <div className={classes(props.className, styles.container)}>
      <h1>
        ~ {value.toFixed(2)} {props.paperUnit.abbr}
      </h1>
      <ScaleShape width={props.width} />
    </div>
  );
};

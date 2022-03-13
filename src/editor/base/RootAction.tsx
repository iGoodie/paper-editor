import React from "react";
import { Transformations } from "../../hooks/useTransformation.hook";

export abstract class RootAction {
  abstract isVisible(transformation: Transformations): boolean;

  abstract renderIcon(transformation: Transformations): React.ReactNode;

  abstract onClick(transformation: Transformations): void;
}

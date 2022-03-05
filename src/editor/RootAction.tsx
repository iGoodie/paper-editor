import React from "react";
import { TransformationHook } from "../hooks/useTransformation.hook";

export abstract class RootAction {
  abstract isVisible(transformation: TransformationHook): boolean;

  abstract renderIcon(transformation: TransformationHook): React.ReactNode;

  abstract onClick(transformation: TransformationHook): void;
}

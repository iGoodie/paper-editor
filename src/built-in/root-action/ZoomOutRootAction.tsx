import React, { ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { TransformationHook } from "../../hooks/useTransformation.hook";

export class ZoomOutRootAction extends RootAction {
  isVisible(transformation: TransformationHook): boolean {
    return true;
  }

  renderIcon(transformation: TransformationHook): ReactNode {
    return <p>-</p>;
  }

  onClick(transformation: TransformationHook): void {
    transformation.zoom(-0.1);
  }
}

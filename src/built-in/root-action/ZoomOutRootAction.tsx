import React, { ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { Transformations } from "../../hooks/useTransformation.hook";

export class ZoomOutRootAction extends RootAction {
  isVisible(transformation: Transformations): boolean {
    return true;
  }

  renderIcon(transformation: Transformations): ReactNode {
    return <p>-</p>;
  }

  onClick(transformation: Transformations): void {
    transformation.zoom(-0.1);
  }
}

import React, { ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { TransformationHook } from "../../hooks/useTransformation.hook";
import { MathUtils } from "../../util/math.util";

export class ZoomInRootAction extends RootAction {
  isVisible(transformation: TransformationHook): boolean {
    return true;
  }

  renderIcon(transformation: TransformationHook): ReactNode {
    return <p>+</p>;
  }

  onClick(transformation: TransformationHook): void {
    const newScale = transformation.scale + 0.1;
    transformation.setScale(MathUtils.clamp(newScale, 0.1, 5));
  }
}

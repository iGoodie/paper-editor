import React, {  ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { TransformationHook } from "../../hooks/useTransformation.hook";

export class ZoomCenterRootAction extends RootAction {
  isVisible(transformation: TransformationHook): boolean {
    return true;
  }

  renderIcon(transformation: TransformationHook): ReactNode {
    return <p>C</p>;
  }

  onClick(transformation: TransformationHook): void {
    transformation.centerView();
  }
}

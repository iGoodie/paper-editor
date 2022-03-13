import React, {  ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { Transformations } from "../../hooks/useTransformation.hook";

export class ZoomCenterRootAction extends RootAction {
  isVisible(transformation: Transformations): boolean {
    return true;
  }

  renderIcon(transformation: Transformations): ReactNode {
    return <p>C</p>;
  }

  onClick(transformation: Transformations): void {
    transformation.centerView();
  }
}

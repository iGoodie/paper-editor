import React, { ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { ReactComponent as Icon } from "../../assets/icon/center-view.svg";
import { IEditorContext } from "../../context/EditorContext";

export class ZoomCenterRootAction extends RootAction {
  renderIcon(ctx: IEditorContext): ReactNode {
    return <Icon />;
  }

  onClick(ctx: IEditorContext): void {
    ctx.transformations.centerView();
  }
}

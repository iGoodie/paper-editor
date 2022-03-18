import React, { ReactNode } from "react";
import { IEditorContext } from "../../context/EditorContext";
import { RootAction } from "../../editor/base/RootAction";
import { ReactComponent as Icon } from "../../assets/icon/zoom-out.svg";

export class ZoomOutRootAction extends RootAction {
  renderIcon(ctx: IEditorContext): ReactNode {
    return <Icon />;
  }

  onClick(ctx: IEditorContext): void {
    ctx.transformations.zoom(-0.1);
  }
}

import React, { ReactNode } from "react";
import { IEditorContext } from "../../context/EditorContext";
import { RootAction } from "../../editor/base/RootAction";

export class ZoomInRootAction extends RootAction {
  renderIcon(ctx: IEditorContext): ReactNode {
    return <p>+</p>;
  }

  onClick(ctx: IEditorContext): void {
    ctx.transformations.zoom(0.1);
  }
}

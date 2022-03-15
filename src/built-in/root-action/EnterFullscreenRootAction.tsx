import React, { ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { enterFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/enter-fullscreen.svg";
import { IEditorContext } from "../../context/EditorContext";

export class EnterFullscreenRootAction extends RootAction {
  isVisible(ctx: IEditorContext): boolean {
    return document.fullscreenEnabled && !isFullscreenActive();
  }

  renderIcon(ctx: IEditorContext): ReactNode {
    return <Icon />;
  }

  onClick(ctx: IEditorContext): void {
    if (ctx.refs.editorRef.current != null) {
      enterFullscreen(ctx.refs.editorRef.current);
    }
  }
}

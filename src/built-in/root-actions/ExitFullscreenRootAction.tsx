import React, { ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { exitFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/exit-fullscreen.svg";
import { IEditorContext } from "../../context/EditorContext";

export class ExitFullscreenRootAction extends RootAction {
  isVisible(ctx: IEditorContext): boolean {
    return isFullscreenActive();
  }

  renderIcon(ctx: IEditorContext): ReactNode {
    return <Icon />;
  }

  onClick(ctx: IEditorContext): void {
    if (ctx.refs.editorRef.current != null) {
      exitFullscreen(ctx.refs.editorRef.current);
    }
  }
}

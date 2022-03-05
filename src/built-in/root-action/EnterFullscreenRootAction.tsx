import React, { ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { enterFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/enter-fullscreen.svg";
import { TransformationHook } from "../../hooks/useTransformation.hook";

export class EnterFullscreenRootAction extends RootAction {
  isVisible(transformation: TransformationHook): boolean {
    return !isFullscreenActive();
  }

  renderIcon(transformation: TransformationHook): ReactNode {
    return <Icon />;
  }

  onClick(transformation: TransformationHook): void {
    if (transformation.editorRef.current != null) {
      enterFullscreen(transformation.editorRef.current);
    }
  }
}

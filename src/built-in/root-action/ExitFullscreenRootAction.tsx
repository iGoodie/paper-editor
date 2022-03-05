import React, { ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { exitFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/exit-fullscreen.svg";
import { TransformationHook } from "../../hooks/useTransformation.hook";

export class ExitFullscreenRootAction extends RootAction {
  isVisible(transformation: TransformationHook): boolean {
    return isFullscreenActive();
  }

  renderIcon(transformation: TransformationHook): ReactNode {
    return <Icon />;
  }

  onClick(transformation: TransformationHook): void {
    if (transformation.editorRef.current != null) {
      exitFullscreen(transformation.editorRef.current);
    }
  }
}

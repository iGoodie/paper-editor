import React, { ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { enterFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/enter-fullscreen.svg";
import { Transformations } from "../../hooks/useTransformation.hook";

export class EnterFullscreenRootAction extends RootAction {
  isVisible(transformation: Transformations): boolean {
    return document.fullscreenEnabled && !isFullscreenActive();
  }

  renderIcon(transformation: Transformations): ReactNode {
    return <Icon />;
  }

  onClick(transformation: Transformations): void {
    if (transformation.refs.editor.current != null) {
      enterFullscreen(transformation.refs.editor.current);
    }
  }
}

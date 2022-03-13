import React, { ReactNode } from "react";
import { RootAction } from "../../editor/base/RootAction";
import { exitFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/exit-fullscreen.svg";
import { Transformations } from "../../hooks/useTransformation.hook";

export class ExitFullscreenRootAction extends RootAction {
  isVisible(transformation: Transformations): boolean {
    return isFullscreenActive();
  }

  renderIcon(transformation: Transformations): ReactNode {
    return <Icon />;
  }

  onClick(transformation: Transformations): void {
    if (transformation.refs.editor.current != null) {
      exitFullscreen(transformation.refs.editor.current);
    }
  }
}

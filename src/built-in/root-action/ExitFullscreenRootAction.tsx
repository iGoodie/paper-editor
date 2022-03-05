import React, { RefObject, ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { exitFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/exit-fullscreen.svg";

export class ExitFullscreenRootAction extends RootAction {
  isVisible(editorRef: RefObject<HTMLDivElement>): boolean {
    return isFullscreenActive();
  }

  renderIcon(editorRef: RefObject<HTMLDivElement>): ReactNode {
    return <Icon />;
  }

  onClick(editorRef: RefObject<HTMLDivElement>): void {
    if (editorRef.current != null) {
      exitFullscreen(editorRef.current);
    }
  }
}

import React, { RefObject, ReactNode } from "react";
import { RootAction } from "../../editor/RootAction";
import { enterFullscreen } from "../../util/fullscreen.util";
import { isFullscreenActive } from "../../util/fullscreen.util";
import { ReactComponent as Icon } from "../../assets/icon/enter-fullscreen.svg";

export class EnterFullscreenRootAction extends RootAction {
  isVisible(editorRef: RefObject<HTMLDivElement>): boolean {
    return !isFullscreenActive();
  }

  renderIcon(editorRef: RefObject<HTMLDivElement>): ReactNode {
    return <Icon />;
  }

  onClick(editorRef: RefObject<HTMLDivElement>): void {
    if (editorRef.current != null) {
      enterFullscreen(editorRef.current);
    }
  }
}

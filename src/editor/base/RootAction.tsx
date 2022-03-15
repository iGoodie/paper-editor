import React from "react";
import { IEditorContext } from "../../context/EditorContext";

export abstract class RootAction {
  isVisible(ctx: IEditorContext): boolean {
    return true;
  }

  abstract renderIcon(ctx: IEditorContext): React.ReactNode;

  abstract onClick(ctx: IEditorContext): void;
}

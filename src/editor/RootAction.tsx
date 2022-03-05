import React from "react";

export abstract class RootAction {
  abstract isVisible(editorRef: React.RefObject<HTMLDivElement>): boolean;

  abstract renderIcon(editorRef: React.RefObject<HTMLDivElement>): React.ReactNode;

  abstract onClick(editorRef: React.RefObject<HTMLDivElement>): void;
}

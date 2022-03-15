import React from "react";
import { useEditorContext } from "../context/EditorContext";
import { RootAction } from "./base/RootAction";

interface Props {
  rootAction: RootAction;
}

export const RootActionButton = (props: Props) => {
  const ctx = useEditorContext();

  return (
    <button onClick={() => props.rootAction.onClick(ctx.transformations)}>
      {props.rootAction.renderIcon(ctx.transformations)}
    </button>
  );
};

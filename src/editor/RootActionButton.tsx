import React from "react";
import { useEditorContext } from "../context/EditorContext";
import { RootAction } from "./base/RootAction";

interface Props {
  rootAction: RootAction;
}

export const RootActionButton = (props: Props) => {
  const ctx = useEditorContext();

  return (
    <button onClick={() => props.rootAction.onClick(ctx)}>
      {props.rootAction.renderIcon(ctx)}
    </button>
  );
};

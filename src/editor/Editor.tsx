import React from "react";
import style from "../styles/editor.scss";
import { Theme, themeToCssVars } from "./Theme";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { LayersPanel } from "./LayersPanel";
import { Layer } from "./Layer";

interface Props {
  viewportHeight: number;

  paperDimensions: { width: number; height: number };
  layers: Layer[];

  title?: string;
  paperBackground?: string;

  theme?: Theme;
}

export const Editor = (props: Props) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const editorVars = useInlineStyle(
    () => ({
      "--viewport-height": props.viewportHeight + "px",
      ...(props.theme ? themeToCssVars(props.theme) : {}),
    }),
    [props.viewportHeight, props.theme]
  );

  return (
    <div className={style.editor} style={editorVars}>
      <div className={style.editor__layers}>
        <LayersPanel layers={props.layers} />
      </div>

      <div ref={viewportRef} className={style.editor__viewport}>
        <p>Viewport</p>
      </div>
    </div>
  );
};

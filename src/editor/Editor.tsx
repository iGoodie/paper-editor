import React from "react";
import style from "../styles/editor.scss";
import { Theme, themeToCssVars } from "./Theme";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { LayersPanel } from "./LayersPanel";
import { Layer } from "./Layer";
import { MeasurementUnit } from "../util/units.util";

interface Props {
  viewportHeight: number;

  paperDimensions: { width: number; height: number };
  paperUnit: MeasurementUnit;
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

  console.log(props.layers.map((layer) => layer.serialize()));

  return (
    <div className={style.editor} style={editorVars}>
      <div className={style.editor__layers}>
        <LayersPanel layers={props.layers} paperUnit={props.paperUnit} />
      </div>

      <div ref={viewportRef} className={style.editor__viewport}>
        <p>Viewport</p>
      </div>
    </div>
  );
};

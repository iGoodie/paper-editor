import React from "react";
import styles from "../styles/editor.scss";
import { Theme, themeToCssVars } from "./Theme";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { LayersPanel } from "./LayersPanel";
import { Layer } from "./Layer";
import { MeasurementUnit } from "../util/units.util";
import { mapRootActions } from "../registry/root-actions.registry";
import { useFullscreen } from "../hooks/useFullscreen.hook";

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
  const editorRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  useFullscreen();

  const editorVars = useInlineStyle(
    () => ({
      "--viewport-height": props.viewportHeight + "px",
      ...(props.theme ? themeToCssVars(props.theme) : {}),
    }),
    [props.viewportHeight, props.theme]
  );

  console.log(props.layers.map((layer) => layer.serialize()));

  return (
    <div ref={editorRef} className={styles.editor} style={editorVars}>
      <div className={styles.editor__layers}>
        <LayersPanel layers={props.layers} paperUnit={props.paperUnit} />
      </div>

      <div ref={viewportRef} className={styles.editor__viewport}>
        <p>Viewport</p>
      </div>

      <div className={styles.editor__rootactions}>
        {mapRootActions(editorRef, (rootAction) => (
          <button onClick={() => rootAction.onClick(editorRef)}>
            {rootAction.renderIcon(editorRef)}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ---------------- */

type DigiconLayerShape = {
  x: number;
  y: number;
  width: number;
  height: number;
  fieldName: string;
  color: string;
  textAlign: "left" | "right" | "center";
  autoFit: boolean;
  fontSize: number;
  fontFamily: string;
  data: any | null;
  value: any | null;
};

import React from "react";
import styles from "../styles/editor.scss";
import { Theme, themeToCssVars } from "./Theme";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { LayersPanel } from "./LayersPanel";
import { Layer } from "./Layer";
import { MeasurementUnit } from "../util/units.util";
import { mapRootActions } from "../registry/root-actions.registry";
import { useFullscreen } from "../hooks/useFullscreen.hook";
import { useTransformation } from "../hooks/useTransformation.hook";
import { Canvas } from "./Canvas";

interface Props {
  viewportHeight: number;
  paperDimensions: { width: number; height: number };
  paperUnit: MeasurementUnit;

  title?: string;
  paperBackground?: string;
  layers: Layer[];
  onLayersChange: (layers: Layer[]) => void;

  theme?: Theme;
}

export const Editor = (props: Props) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const paperRef = React.useRef<HTMLDivElement>(null);

  const transformations = useTransformation(editorRef, viewportRef, paperRef);

  const fullscreen = useFullscreen(); // Re-render on fullscreen changes

  const editorVars = useInlineStyle(
    () => ({
      "--viewport-height": props.viewportHeight + "px",
      "--paper-width":
        props.paperUnit.toPixels(props.paperDimensions.width) + "px",
      "--paper-height":
        props.paperUnit.toPixels(props.paperDimensions.height) + "px",
      "--paper-background":
        props.paperBackground || "linear-gradient(180deg,#fff,#e8e8e8)",
      ...(props.theme ? themeToCssVars(props.theme) : {}),
    }),
    [props.viewportHeight, props.theme]
  );

  React.useEffect(() => {
    transformations.centerView();
  }, [fullscreen.active]);

  console.log(props.layers.map((layer) => layer.serialize()));

  return (
    <div ref={editorRef} className={styles.editor} style={editorVars}>
      <div className={styles.editor__layers}>
        <LayersPanel
          layers={props.layers}
          onLayersChange={props.onLayersChange}
          paperUnit={props.paperUnit}
        />
      </div>

      <div ref={viewportRef} className={styles.editor__viewport}>
        <Canvas
          ref={paperRef}
          transformations={transformations}
          paperDimensions={props.paperDimensions}
          paperUnit={props.paperUnit}
          title={props.title}
        />
      </div>

      <div className={styles.editor__rootactions}>
        {mapRootActions(editorRef, (rootAction, index) => (
          <button
            key={index}
            onClick={() => rootAction.onClick(transformations)}
          >
            {rootAction.renderIcon(transformations)}
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

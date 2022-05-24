import React from "react";
import styles from "../styles/editor.scss";
import { Theme } from "../styles/Theme";
import { LayersPanel } from "./LayersPanel";
import { SerializedLayer } from "./base/Layer";
import { MeasurementUnit } from "../util/units.util";
import { mapRootActions } from "../registry/root-actions.registry";
import { Canvas } from "./Canvas";
import { MapScale } from "../components/MapScale";
import { EditorContextProvider } from "../context/EditorContext";
import { RootActionButton } from "./RootActionButton";
import { Modal } from "./Modal";
import { ModalContextProvider } from "../context/ModalContext";

export interface EditorProps {
  viewportHeight: number;
  printerMargin?: { left: number; top: number };
  paperDimensions: { width: number; height: number }; // in paperUnits
  paperUnit: MeasurementUnit;

  title?: string;
  paperBackground?: string;
  onBackgroundChange: (bg: string) => void;
  layers: SerializedLayer[];
  onLayersChange: (layers: SerializedLayer[]) => void;

  theme?: Theme;
}

export const Editor = (props: EditorProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const paperRef = React.useRef<HTMLDivElement>(null);

  return (
    <ModalContextProvider>
      <EditorContextProvider
        refs={{ editorRef, viewportRef, paperRef }}
        editorProps={props}
      >
        {(ctx, editorVars) => (
          <div ref={editorRef} className={styles.editor} style={editorVars}>
            <div className={styles.editor__layers}>
              <LayersPanel />
            </div>

            <div ref={viewportRef} className={styles.editor__viewport}>
              <Canvas ref={paperRef} />
            </div>

            <div className={styles.editor__rootactions}>
              {mapRootActions(ctx, (rootAction, index) => (
                <RootActionButton key={index} rootAction={rootAction} />
              ))}
            </div>

            <MapScale
              width={100}
              className={styles.editor__mapscale}
              transformations={ctx.transformations}
              paperUnit={props.paperUnit}
            />

            <Modal />
          </div>
        )}
      </EditorContextProvider>
    </ModalContextProvider>
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

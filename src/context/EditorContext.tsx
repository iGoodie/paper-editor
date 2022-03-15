import React from "react";
import { EditorProps } from "../editor/Editor";
import { useFullscreen } from "../hooks/useFullscreen.hook";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { Layers, useLayers } from "../hooks/useLayers.hook";
import { Transformations } from "../hooks/useTransformation.hook";
import { useTransformation } from "../hooks/useTransformation.hook";
import { Theme, themeToCssVars } from "../styles/Theme";
import { MeasurementUnit } from "../util/units.util";

interface EditorRefs {
  editorRef: React.RefObject<HTMLDivElement>;
  viewportRef: React.RefObject<HTMLDivElement>;
  paperRef: React.RefObject<HTMLDivElement>;
}

export interface IEditorContext {
  refs: EditorRefs;
  editorProps: EditorProps;
  transformations: Transformations;
  layers: Layers;
  paperUnit: MeasurementUnit;
  theme?: Theme;
}

const EditorContext = React.createContext<IEditorContext | undefined>(
  undefined
);

/* ---------------------------- */

interface Props {
  refs: EditorRefs;
  editorProps: EditorProps;
  children?: (
    ctx: IEditorContext,
    editorVars: Record<string, any>
  ) => React.ReactNode;
}

export const EditorContextProvider: React.FC<Props> = (props) => {
  const layers = useLayers(
    props.editorProps.layers,
    props.editorProps.onLayersChange
  );

  const transformations = useTransformation(
    props.refs.editorRef,
    props.refs.viewportRef,
    props.refs.paperRef
  );

  const fullscreen = useFullscreen();

  React.useEffect(() => {
    transformations.centerView();
  }, [fullscreen.active]);

  const ctx: IEditorContext = {
    refs: props.refs,
    editorProps: props.editorProps,
    transformations,
    layers,
    paperUnit: props.editorProps.paperUnit,
    theme: props.editorProps.theme,
  };

  const editorVars = useInlineStyle(
    () => ({
      "--viewport-height": props.editorProps.viewportHeight + "px",
      "--viewport-scale": transformations.scale,
      "--viewport-offset-x": transformations.offset.x + "px",
      "--viewport-offset-y": transformations.offset.y + "px",
      "--paper-width":
        ctx.paperUnit.toPixels(ctx.editorProps.paperDimensions.width) + "px",
      "--paper-height":
        ctx.paperUnit.toPixels(ctx.editorProps.paperDimensions.height) + "px",
      "--paper-background":
        ctx.editorProps.paperBackground ||
        "linear-gradient(180deg,#fff,#e8e8e8)",
      ...(ctx.theme ? themeToCssVars(ctx.theme) : {}),
    }),
    [
      ctx.editorProps.viewportHeight,
      transformations.scale,
      transformations.offset.x,
      transformations.offset.y,
      ctx.editorProps.paperDimensions.width,
      ctx.editorProps.paperDimensions.height,
      ctx.editorProps.paperBackground,
      ctx.paperUnit,
      ctx.theme,
    ]
  );

  return (
    <EditorContext.Provider value={ctx}>
      {typeof props.children === "function"
        ? props.children(ctx, editorVars)
        : props.children}
    </EditorContext.Provider>
  );
};

export function useEditorContext() {
  const context = React.useContext(EditorContext);
  if (!context) {
    throw new Error(
      "No <EditorContextProvider> found when calling useEditorContext"
    );
  }
  return context;
}

import React from "react";
import { ReactNode, ReactFragment } from "react";
import { IEditorContext } from "../../context/EditorContext";
import { Layer } from "../../editor/base/Layer";
import { ReactComponent as Icon } from "../../assets/icon/background.svg";
import { ImagePicker } from "../../components/ImagePicker";

export class PreviewBackgroundLayer extends Layer {
  constructor() {
    super();
    this.layerName = "Background";
  }

  getType(): string {
    return "preview-background-layer";
  }

  renderIcon(ctx: IEditorContext): ReactNode {
    return <Icon />;
  }

  renderTypeText(ctx: IEditorContext): ReactNode {
    return "Preview Element";
  }

  renderCanvas(ctx: IEditorContext): ReactNode {
    return <div>BG Here</div>;
  }

  renderControls(ctx: IEditorContext): ReactFragment {
    return (
      <React.Fragment>
        <p style={{ padding: 10, margin: 0, color: "#fff" }}>
          This is a preview layer! Here to guide you while constructing your
          template. This layer will not be present while printing.
        </p>

        <ImagePicker
          imageB64={ctx.editorProps.paperBackground}
          onChange={ctx.editorProps.onBackgroundChange}
        />
      </React.Fragment>
    );
  }
}

import React from "react";
import { ReactNode, ReactFragment } from "react";
import { IEditorContext } from "../../context/EditorContext";
import { Layer } from "../../editor/base/Layer";
import { ReactComponent as Icon } from "../../assets/icon/background.svg";
import { ImagePicker } from "../../components/ImagePicker";
import { formatIntlMessage } from "../../registry/intl/intl";

export class PreviewBackgroundLayer extends Layer {
  createLayer(ctx: IEditorContext) {
    return new PreviewBackgroundLayer();
  }

  getLayerName(): string {
    return formatIntlMessage("papereditor.title.background");
  }

  getType(): string {
    return "preview-background-layer";
  }

  renderDescription(ctx: IEditorContext): React.ReactNode {
    return "";
  }

  renderIcon(ctx: IEditorContext): ReactNode {
    return <Icon />;
  }

  renderTypeText(ctx: IEditorContext): ReactNode {
    return formatIntlMessage("papereditor.title.preview-element");
  }

  renderCanvas(ctx: IEditorContext): ReactNode {
    return <div>BG Here</div>;
  }

  renderControls(ctx: IEditorContext): ReactFragment {
    return (
      <React.Fragment>
        <p style={{ padding: 10, margin: 0, color: "#fff" }}>
          {formatIntlMessage("papereditor.info.background")}
        </p>

        <ImagePicker
          imageB64={ctx.editorProps.paperBackground}
          onChange={ctx.editorProps.onBackgroundChange}
        />
      </React.Fragment>
    );
  }
}

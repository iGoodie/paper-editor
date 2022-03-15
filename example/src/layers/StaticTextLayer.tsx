import React from "react";
import {
  AccordionControl,
  AlignControls,
  Layer,
  SerializedLayer,
  getUnitByAbbr,
  IEditorContext,
} from "paper-editor";
import { ReactComponent as Icon } from "../assets/icon/static-text-icon.svg";

export class StaticTextLayer extends Layer {
  data?: string = "";
  fontSize?: number; // in millimeters

  getType(): string {
    return "static-text";
  }

  renderIcon(): React.ReactNode {
    return <Icon />;
  }

  renderTypeText(): React.ReactNode {
    return "Static Text";
  }

  renderCanvas(ctx: IEditorContext): React.ReactNode {
    return (
      <p
        style={{
          margin: 0,
          fontSize: getUnitByAbbr("mm").toPixels(this.fontSize || 10) + "px",
        }}
      >
        {this.data}
      </p>
    );
  }

  renderControls(ctx: IEditorContext): React.ReactFragment {
    return (
      <>
        <p style={{ padding: 10, margin: 0, color: "#fff" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem commodi,
          ut ad minus fuga velit cupiditate.
        </p>

        <AlignControls layers={ctx.layers} />

        <AccordionControl header={"Header here!"}>
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
        </AccordionControl>

        <AccordionControl header={"Header here!"}>
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
          Hey, content here! <br />
        </AccordionControl>

        <AccordionControl header={"Header here!"}>
          Hey, content here!
        </AccordionControl>
      </>
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      data: this.data,
      fontSize: this.fontSize,
    };
  }

  deserialize(serialized: SerializedLayer<StaticTextLayer>): this {
    super.deserialize(serialized);
    this.data = serialized.data;
    this.fontSize = serialized.fontSize;
    return this;
  }
}

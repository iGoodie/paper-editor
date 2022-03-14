import React from "react";
import {
  AccordionControl,
  AlignControls,
  Layer,
  Layers,
  SerializedLayer,
} from "paper-editor";
import { ReactComponent as Icon } from "../assets/icon/static-text-icon.svg";

export class StaticTextLayer extends Layer {
  data?: string = "";

  getType(): string {
    return "static-text";
  }

  renderIcon(): React.ReactNode {
    return <Icon />;
  }

  renderTypeText(): React.ReactNode {
    return "Static Text";
  }

  renderCanvas(): React.ReactNode {
    throw new Error("Method not implemented.");
  }

  renderControls(layer: StaticTextLayer, layers: Layers): React.ReactFragment {
    return (
      <>
        <p style={{ padding: 10, margin: 0, color: "#fff" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem commodi,
          ut ad minus fuga velit cupiditate.
        </p>

        <AlignControls layers={layers} />

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
    };
  }

  deserialize(serialized: SerializedLayer<StaticTextLayer>): this {
    super.deserialize(serialized);
    this.data = serialized.data;
    return this;
  }
}

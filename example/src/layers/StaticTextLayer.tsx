import React from "react";
import { Layer } from "paper-editor";

export class StaticTextLayer extends Layer {
  data: string = "";

  getType(): string {
    return "static-text";
  }

  renderIcon(): React.ReactNode {
    return <p>.txt</p>;
  }

  renderTypeText(): React.ReactNode {
    return "Static Text";
  }

  renderCanvas(): React.ReactNode {
    throw new Error("Method not implemented.");
  }

  serialize() {
    return {
      ...super.serialize(),
      data: this.data,
    };
  }

  deserialize(serialized: Partial<Record<keyof StaticTextLayer, any>>): this {
    super.deserialize(serialized);
    this.data = serialized.data;
    return this;
  }
}

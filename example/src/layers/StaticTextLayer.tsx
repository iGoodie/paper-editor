import React from "react";
import { Layer } from "paper-editor";
import { ReactComponent as Icon } from "../assets/icon/static-text-icon.svg";

export class StaticTextLayer extends Layer {
  data: string = "";

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

import React from "react";

export abstract class Layer {
  layerName: string;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  abstract getType(): string;

  abstract renderIcon(): React.ReactNode;

  abstract renderTypeText(): React.ReactNode;

  abstract renderCanvas(): React.ReactNode;

  serialize(): any {
    return {
      type: this.getType(),
      layerName: this.layerName,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  deserialize(serialized: Partial<Record<keyof Layer, any>>) {
    this.layerName = serialized.layerName;
    if ("x" in serialized) this.x = serialized.x;
    if ("y" in serialized) this.y = serialized.y;
    if ("width" in serialized) this.width = serialized.width;
    if ("height" in serialized) this.height = serialized.height;
    return this;
  }
}

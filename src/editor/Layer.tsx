import React from "react";

export abstract class Layer {
  layerName: string;
  x: number;
  y: number;
  width: number;
  height: number;

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
    this.x = serialized.x;
    this.y = serialized.y;
    this.width = serialized.width;
    this.height = serialized.height;
    return this;
  }
}

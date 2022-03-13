import React from "react";
import { getLayerType } from "../../registry/layers.registry";

export type SerializedLayer<T = any> = { type: string } & PropertiesOnly<T>;

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

  serialize(): SerializedLayer<Layer> {
    return {
      type: this.getType(),
      layerName: this.layerName,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  deserialize(serialized: SerializedLayer<Layer>) {
    this.layerName = serialized.layerName!;
    if ("x" in serialized) this.x = serialized.x!;
    if ("y" in serialized) this.y = serialized.y!;
    if ("width" in serialized) this.width = serialized.width!;
    if ("height" in serialized) this.height = serialized.height!;
    return this;
  }

  static createSerialized<T extends Layer>(
    layerType: new () => T,
    serialized: Omit<SerializedLayer<T>, "type">
  ) {
    const sample = new layerType();
    return { type: sample.getType(), ...serialized };
  }

  static create(serialized: SerializedLayer) {
    const LayerType = getLayerType(serialized.type);
    if (!LayerType) throw new Error("Unknown layer type = " + serialized.type);
    return new LayerType().deserialize(serialized);
  }
}

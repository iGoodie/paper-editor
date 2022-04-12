import React from "react";
import { IEditorContext } from "../../context/EditorContext";
import { getLayerType } from "../../registry/layers.registry";

export type PropertiesOnly<T> = Partial<
  Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>
>;

export type SerializedLayer<T = any> = { type: string } & PropertiesOnly<T>;

export abstract class Layer {
  layerName: string;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  autoFit: boolean = false;

  getLayerName() {
    return this.layerName;
  }

  abstract getType(): string;

  abstract renderDescription(ctx: IEditorContext): React.ReactNode;

  abstract renderIcon(ctx: IEditorContext): React.ReactNode;

  abstract renderTypeText(ctx: IEditorContext): React.ReactNode;

  abstract renderCanvas(ctx: IEditorContext): React.ReactNode;

  abstract renderControls(ctx: IEditorContext): React.ReactFragment;

  serialize(): SerializedLayer<Layer> {
    return {
      type: this.getType(),
      layerName: this.layerName,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      autoFit: this.autoFit,
    };
  }

  deserialize(serialized: SerializedLayer<Layer>) {
    this.layerName = serialized.layerName!;
    if ("x" in serialized) this.x = serialized.x!;
    if ("y" in serialized) this.y = serialized.y!;
    if ("width" in serialized) this.width = serialized.width!;
    if ("height" in serialized) this.height = serialized.height!;
    if ("autoFit" in serialized) this.autoFit = serialized.autoFit!;
    return this;
  }

  static createSerialized<T extends Layer>(
    layerType: new () => T,
    serialized: Omit<SerializedLayer<T>, "type">
  ) {
    const sample = new layerType();
    return { type: sample.getType(), ...serialized };
  }

  static create(serialized: SerializedLayer<Layer>) {
    const LayerType = getLayerType(serialized.type);
    if (!LayerType) throw new Error("Unknown layer type = " + serialized.type);
    return new LayerType().deserialize(serialized);
  }
}

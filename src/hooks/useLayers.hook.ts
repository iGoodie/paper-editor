import React from "react";
import { Layer, SerializedLayer } from "../editor/base/Layer";

export function useLayers(
  serializedLayers: SerializedLayer[],
  onLayersChange: (serializedLayers: SerializedLayer[]) => void
) {
  const layers = serializedLayers.map(Layer.create);

  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);

  const selectLayers = (...layerIndices: number[]) => {
    setSelectedIndices(layerIndices);
  };

  const unselectLayer = (layerIndex: number) => {
    const selectionIndex = selectedIndices.findIndex((i) => i === layerIndex);
    if (selectionIndex != -1) {
      setSelectedIndices(selectedIndices.filter((i) => i !== selectionIndex));
    }
  };

  const unselectAll = () => setSelectedIndices([]);

  const updateLayers = () => {
    console.debug({ layers });
    onLayersChange(layers.map((layer) => layer.serialize()));
  };

  const createLayer = (layer: Layer) => {
    onLayersChange([layer.serialize(), ...serializedLayers]);
    setSelectedIndices(selectedIndices.map((index) => index + 1));
  };

  console.log({ layers, selectedIndices });

  return {
    list: layers,
    selectedLayers: selectedIndices.map((i) => layers[i]),
    singularSelected: selectedIndices.length === 1,
    multipleSelected: selectedIndices.length > 1,
    selectLayers,
    unselectLayer,
    unselectAll,
    updateLayers,
    createLayer,
  };
}

export type Layers = ReturnType<typeof useLayers>;

import React from "react";
import { IEditorContext } from "../context/EditorContext";
import { Layer, SerializedLayer } from "../editor/base/Layer";
import { getUnitByAbbr, MeasurementUnit } from "../util/units.util";

export function useLayers(
  serializedLayers: SerializedLayer[],
  onLayersChange: (serializedLayers: SerializedLayer[]) => void
) {
  const layerList = serializedLayers.map(Layer.create);
  const unitMm = getUnitByAbbr("mm");

  const [editingBg, setEditingBg] = React.useState(false);
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);

  const beginEditingBg = () => {
    setEditingBg(true);
    unselectAll();
  };

  const stopEditingBg = () => {
    setEditingBg(false);
    unselectAll();
  };

  const selectLayers = (...layerIndices: number[]) => {
    setSelectedIndices(layerIndices);
  };

  const unselectLayer = (layerIndex: number) => {
    setSelectedIndices(selectedIndices.filter((i) => i !== layerIndex));
  };

  const unselectAll = () => setSelectedIndices([]);

  const updateLayers = () => {
    console.debug({ layerList });
    onLayersChange(layerList.map((layer) => layer.serialize()));
  };

  const prependLayer = (layer: Layer) => {
    onLayersChange([layer.serialize(), ...serializedLayers]);
    setSelectedIndices(selectedIndices.map((index) => index + 1));
  };

  const appendLayer = (layer: Layer) => {
    onLayersChange([...serializedLayers, layer.serialize()]);
  };

  const deleteLayer = (layer: Layer) => {
    const index = layerList.indexOf(layer);
    return deleteLayerByIndex(index);
  };

  const deleteLayerByIndex = (index: number) => {
    layerList.splice(index, 1);
    setSelectedIndices(
      selectedIndices
        .filter((selectedIndex) => selectedIndex != index)
        .map((selectedIndex) =>
          selectedIndex > index ? selectedIndex - 1 : selectedIndex
        )
    );
    updateLayers();
  };

  const getNode = (layer: Layer, ctx: IEditorContext) => {
    const index = layerList.indexOf(layer);

    if (index === -1) {
      return null;
    }

    return ctx.refs.paperRef.current?.querySelector(`:nth-child(${index + 1})`);
  };

  const getWidth = (layer: Layer, ctx: IEditorContext) => {
    if (!layer.autoFit) {
      return ctx.paperUnit.fromMillimeters(layer.width);
    }

    const node = getNode(layer, ctx);

    if (node == null) {
      return -1;
    }

    return ctx.paperUnit.fromPixels(node.clientWidth);
  };

  const getHeight = (layer: Layer, ctx: IEditorContext) => {
    if (!layer.autoFit) {
      return ctx.paperUnit.fromMillimeters(layer.height);
    }

    const node = getNode(layer, ctx);

    if (node == null) {
      return -1;
    }

    if (node == null) {
      return -1;
    }

    return ctx.paperUnit.fromPixels(node.clientHeight);
  };

  return {
    list: layerList,
    selectedLayerIndices: selectedIndices,
    selectedLayers: selectedIndices.map((i) => layerList[i]),
    singularSelected: selectedIndices.length === 1,
    multipleSelected: selectedIndices.length > 1,
    editingBg,
    beginEditingBg,
    stopEditingBg,
    selectLayers,
    unselectLayer,
    unselectAll,
    updateLayers,
    prependLayer,
    appendLayer,
    deleteLayer,
    deleteLayerByIndex,
    getNode,
    getWidth,
    getHeight,
  };
}

export type Layers = ReturnType<typeof useLayers>;

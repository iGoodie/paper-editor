import React from "react";
import ReactJson from "react-json-view";

import { StaticTextLayer } from "./layers/StaticTextLayer";

import * as paperEditor from "paper-editor";
import { SerializedLayer } from "paper-editor";
import { getUnitByName } from "paper-editor";
import { Editor } from "paper-editor";
import { theme } from "./theme";
import "paper-editor/dist/index.css";

paperEditor.configure({
  millimeterToPixelRatio: 2,
});

paperEditor.registries.LayersRegistry.register(StaticTextLayer);

const App = () => {
  const [layers, setLayers] = React.useState<SerializedLayer[]>([
    paperEditor.Layer.createSerialized(StaticTextLayer, {
      width: 100,
      height: 200,
    }),
    paperEditor.Layer.createSerialized(StaticTextLayer, {
      x: 10,
      y: 10,
      width: 300,
      height: 400,
      layerName: "Yo hey there!",
      data: "Yo hey there!",
    }),
    paperEditor.Layer.createSerialized(StaticTextLayer, {
      x: 10,
      y: 30,
      width: 300,
      height: 400,
      layerName: "Yo hey there!",
      fontSize: 5,
      data: "Yo hey there!",
    }),
    // paperEditor.Layer.createSerialized(StaticTextLayer, {
    //   layerName: "A very static name",
    //   data: "Hey there!",
    // }),
    // paperEditor.Layer.createSerialized(StaticTextLayer, {
    //   layerName: "Sooooo long to fit here lmao",
    //   data: "Hey there!",
    // }),
    // paperEditor.Layer.createSerialized(StaticTextLayer, {
    //   layerName: "Sooooo long to fit here lmao",
    //   data: "Hey there!",
    // }),
    // paperEditor.Layer.createSerialized(StaticTextLayer, {
    //   layerName: "Sooooo long to fit here lmao",
    //   data: "Hey there!",
    // }),
    // paperEditor.Layer.createSerialized(StaticTextLayer, {
    //   layerName: "Sooooo long to fit here lmao",
    //   data: "Hey there!",
    // }),
    // paperEditor.Layer.createSerialized(StaticTextLayer, {
    //   layerName: "Sooooo long to fit here lmao",
    //   data: "Hey there!",
    // }),
  ]);

  console.log({ appLayers: layers });

  return (
    <div
      style={{ margin: 25, display: "flex", flexDirection: "column", gap: 25 }}
    >
      <Editor
        layers={layers}
        onLayersChange={setLayers}
        paperUnit={getUnitByName("centimeters")}
        paperDimensions={{ width: 6.1, height: 11 }}
        viewportHeight={500}
        theme={theme}
      />

      {/* <Editor
        layers={layers}
        onLayersChange={setLayers}
        paperUnit={getUnitByName("meters")}
        paperDimensions={{ width: 0.061, height: 0.11 }}
        viewportHeight={800}
        theme={theme}
      /> */}

      <ReactJson
        style={{ padding: 15, borderRadius: 10 }}
        name={"layers"}
        theme="summerfruit"
        src={layers}
      />
    </div>
  );
};

export default App;

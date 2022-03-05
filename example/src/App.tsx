import React from "react";

import { StaticTextLayer } from "./layers/StaticTextLayer";

import * as paperEditor from "paper-editor";
import { getUnitByName } from "paper-editor";
import { Editor } from "paper-editor";
import { theme } from "./theme";
import "paper-editor/dist/index.css";

paperEditor.configure({
  millimeterToPixelRatio: 2,
});

paperEditor.registries.LayersRegistry.register(StaticTextLayer);

const App = () => {
  const [layers, setLayers] = React.useState<paperEditor.Layer[]>([
    new StaticTextLayer().deserialize({
      width: 100,
      height: 200,
    }),
    new StaticTextLayer().deserialize({
      layerName: "A very static name",
      data: "Hey there!",
    }),
    new StaticTextLayer().deserialize({
      layerName: "Sooooo long to fit here lmao",
      data: "Hey there!",
    }),
  ]);

  return (
    <div style={{ margin: 25 }}>
      <Editor
        layers={layers}
        onLayersChange={setLayers}
        paperUnit={getUnitByName("centimeters")}
        paperDimensions={{ width: 6.1, height: 11 }}
        viewportHeight={500}
        theme={theme}
      />
    </div>
  );
};

export default App;

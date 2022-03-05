import React from "react";

import { StaticTextLayer } from "./layers/StaticTextLayer";

import * as paperEditor from "paper-editor";
import { Editor } from "paper-editor";
import { theme } from "./theme";
import "paper-editor/dist/index.css";

paperEditor.configure({
  millimeterToPixelRatio: 10,
});

paperEditor.registries.LayersRegistry.register(StaticTextLayer);

const App = () => {
  return (
    <div style={{ margin: 25 }}>
      <Editor
        layers={[
          new StaticTextLayer(),
          new StaticTextLayer().deserialize({
            layerName: "A very static name",
            data: "Hey there!",
          }),
        ]}
        paperDimensions={{ width: 1980, height: 720 }}
        viewportHeight={500}
        theme={theme}
      />
    </div>
  );
};

export default App;

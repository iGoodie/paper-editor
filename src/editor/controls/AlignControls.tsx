import React from "react";
import { Layers } from "../../hooks/useLayers.hook";
import * as ButtonStripeControl from "./ButtonStripeControl";

import { ReactComponent as AlignLeft } from "../../assets/icon/align-left.svg";
import { ReactComponent as AlignCenterH } from "../../assets/icon/align-center-horizontally.svg";
import { ReactComponent as AlignRight } from "../../assets/icon/align-right.svg";
import { ReactComponent as AlignTop } from "../../assets/icon/align-top.svg";
import { ReactComponent as AlignCenterV } from "../../assets/icon/align-center-vertically.svg";
import { ReactComponent as AlignBottom } from "../../assets/icon/align-bottom.svg";

interface Props {
  layers: Layers;
}

// TODO:
export const AlignControls = (props: Props) => {
  const getMinX = () => {
    if (props.layers.selectedLayers.length == 1) return 0;
    return props.layers.selectedLayers.reduce(
      (minValue, layer) => Math.min(minValue, layer.x),
      0
    );
  };
  const getMinY = () => {
    if (props.layers.selectedLayers.length == 1) return 0;
    return props.layers.selectedLayers.reduce(
      (minValue, layer) => Math.min(minValue, layer.y),
      0
    );
  };

  return (
    <ButtonStripeControl.Stripe>
      <ButtonStripeControl.Button
        icon={<AlignLeft />}
        onClick={() => {
          const minX = getMinX();
          props.layers.selectedLayers.forEach((layer) => (layer.x = minX));
          props.layers.updateLayers();
        }}
      />

      <ButtonStripeControl.Button icon={<AlignCenterH />} />

      <ButtonStripeControl.Button icon={<AlignRight />} />

      <ButtonStripeControl.Button icon={<AlignTop />} />

      <ButtonStripeControl.Button icon={<AlignCenterV />} />

      <ButtonStripeControl.Button icon={<AlignBottom />} />
    </ButtonStripeControl.Stripe>
  );
};

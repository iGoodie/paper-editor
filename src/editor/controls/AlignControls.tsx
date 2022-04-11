import React from "react";
import { Layers } from "../../hooks/useLayers.hook";
import * as ButtonStripeControl from "./ButtonStripeControl";

import { ReactComponent as AlignLeft } from "../../assets/icon/align-left.svg";
import { ReactComponent as AlignCenterH } from "../../assets/icon/align-center-horizontally.svg";
import { ReactComponent as AlignRight } from "../../assets/icon/align-right.svg";
import { ReactComponent as AlignTop } from "../../assets/icon/align-top.svg";
import { ReactComponent as AlignCenterV } from "../../assets/icon/align-center-vertically.svg";
import { ReactComponent as AlignBottom } from "../../assets/icon/align-bottom.svg";
import { useEditorContext } from "../../context/EditorContext";

interface Props {
  layers: Layers;
}

export const AlignControls = (props: Props) => {
  const ctx = useEditorContext();

  const getMinX = () => {
    if (props.layers.selectedLayers.length == 1) {
      return 0;
    }
    return props.layers.selectedLayers.reduce(
      (minValue, layer) => Math.min(minValue, layer.x),
      Number.MAX_SAFE_INTEGER
    );
  };

  const getMaxX = () => {
    if (props.layers.selectedLayers.length == 1) {
      return ctx.paperUnit.toMillimeters(ctx.editorProps.paperDimensions.width);
    }
    return props.layers.selectedLayers.reduce((maxValue, layer) => {
      const width = ctx.layers.getWidth(layer, ctx);
      const widthMm = ctx.paperUnit.toMillimeters(width);
      return Math.max(maxValue, layer.x + widthMm);
    }, Number.MIN_SAFE_INTEGER);
  };

  const getCenterX = () => {
    if (props.layers.selectedLayers.length == 1) {
      return ctx.paperUnit.toMillimeters(
        ctx.editorProps.paperDimensions.width / 2
      );
    }
    const minX = getMinX();
    const maxX = getMaxX();
    return (maxX + minX) / 2;
  };

  const getMinY = () => {
    if (props.layers.selectedLayers.length == 1) {
      return 0;
    }
    return props.layers.selectedLayers.reduce(
      (minValue, layer) => Math.min(minValue, layer.y),
      Number.MAX_SAFE_INTEGER
    );
  };

  const getMaxY = () => {
    if (props.layers.selectedLayers.length == 1) {
      return ctx.paperUnit.toMillimeters(
        ctx.editorProps.paperDimensions.height
      );
    }
    return props.layers.selectedLayers.reduce((maxValue, layer) => {
      const height = ctx.layers.getHeight(layer, ctx);
      const heightMm = ctx.paperUnit.toMillimeters(height);
      return Math.max(maxValue, layer.y + heightMm);
    }, Number.MIN_SAFE_INTEGER);
  };

  const getCenterY = () => {
    if (props.layers.selectedLayers.length == 1) {
      return ctx.paperUnit.toMillimeters(
        ctx.editorProps.paperDimensions.height / 2
      );
    }
    const minY = getMinY();
    const maxY = getMaxY();
    return (maxY + minY) / 2;
  };

  const alignLeft = () => {
    const minX = getMinX();
    props.layers.selectedLayers.forEach((layer) => (layer.x = minX));
    props.layers.updateLayers();
  };

  const alignCenterH = () => {
    const centerX = getCenterX();
    props.layers.selectedLayers.forEach((layer) => {
      const width = ctx.layers.getWidth(layer, ctx);
      const widthMm = ctx.paperUnit.toMillimeters(width);
      layer.x = centerX - widthMm / 2;
    });
    props.layers.updateLayers();
  };

  const alignRight = () => {
    const maxX = getMaxX();
    props.layers.selectedLayers.forEach((layer) => {
      const width = ctx.layers.getWidth(layer, ctx);
      const widthMm = ctx.paperUnit.toMillimeters(width);
      layer.x = maxX - widthMm;
    });
    props.layers.updateLayers();
  };

  const alignTop = () => {
    const minY = getMinY();
    props.layers.selectedLayers.forEach((layer) => (layer.y = minY));
    props.layers.updateLayers();
  };

  const alignBottom = () => {
    const maxY = getMaxY();
    props.layers.selectedLayers.forEach((layer) => {
      const height = ctx.layers.getHeight(layer, ctx);
      const heightMm = ctx.paperUnit.toMillimeters(height);
      layer.y = maxY - heightMm;
    });
    props.layers.updateLayers();
  };

  const alignCenterV = () => {
    const centerY = getCenterY();
    props.layers.selectedLayers.forEach((layer) => {
      const height = ctx.layers.getHeight(layer, ctx);
      const heightMm = ctx.paperUnit.toMillimeters(height);
      layer.y = centerY - heightMm / 2;
    });
    props.layers.updateLayers();
  };

  return (
    <ButtonStripeControl.Stripe>
      <ButtonStripeControl.Button icon={<AlignLeft />} onClick={alignLeft} />

      <ButtonStripeControl.Button
        icon={<AlignCenterH />}
        onClick={alignCenterH}
      />

      <ButtonStripeControl.Button icon={<AlignRight />} onClick={alignRight} />

      <ButtonStripeControl.Button icon={<AlignTop />} onClick={alignTop} />

      <ButtonStripeControl.Button
        icon={<AlignCenterV />}
        onClick={alignCenterV}
      />

      <ButtonStripeControl.Button
        icon={<AlignBottom />}
        onClick={alignBottom}
      />
    </ButtonStripeControl.Stripe>
  );
};

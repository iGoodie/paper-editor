import React from "react";

export let configurations = {
  /**
   * Ratio used to convert millimeter to pixel unit.
   */
  millimeterToPixelRatio: 5,
};

/* ---------------------- */

export function configure(_configurations: typeof configurations) {
  configurations = _configurations;
}

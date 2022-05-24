import React from "react";

export type Coordinate = { x: number; y: number };

interface Options {
  onGrabBegin: (pos: Coordinate) => void;
  onGrabTick: (delta: Coordinate) => void;
}

export function useMouseGrab(opts: Options) {
  const [grabbing, setGrabbing] = React.useState<boolean>(false);
  const [grabPos, setGrabPos] = React.useState<Coordinate>({ x: 0, y: 0 });

  const beginGrab = (pos: Coordinate) => {
    setGrabbing(true);
    setGrabPos(pos);
    opts.onGrabBegin(pos);
  };

  const tickGrab = (pos: Coordinate) => {
    if (!grabbing) return;
    const dx = pos.x - grabPos.x;
    const dy = pos.y - grabPos.y;
    opts.onGrabTick({ x: dx, y: dy });
  };

  const endGrab = () => {
    setGrabbing(false);
  };

  return {
    grabbing,
    beginGrab,
    tickGrab,
    endGrab,
  };
}

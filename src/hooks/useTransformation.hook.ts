import React from "react";

type Coordinate = { x: number; y: number };

export function useTransformation(
  editorRef: React.RefObject<HTMLDivElement>,
  viewportRef: React.RefObject<HTMLDivElement>,
  paperRef: React.RefObject<HTMLDivElement>
) {
  const [scale, setScale] = React.useState<number>(1);
  const [offset, setOffset] = React.useState<Coordinate>({ x: 0, y: 0 });

  const [grabbing, setGrabbing] = React.useState<boolean>(false);
  const [grabPos, setGrabPos] = React.useState<Coordinate>({ x: 0, y: 0 });

  const centerView = () => {
    if (viewportRef.current == null) return;
    if (paperRef.current == null) return;
    const viewportWidth = viewportRef.current.offsetWidth;
    const viewportHeight = viewportRef.current.offsetHeight;
    const paperWidth = paperRef.current.offsetWidth;
    const paperHeight = paperRef.current.offsetHeight;
    const heightRatio = viewportHeight / paperHeight;
    const widthRatio = viewportWidth / paperWidth;
    console.log(paperWidth);
    setScale(Math.min(heightRatio, widthRatio) * 0.75);
    setOffset({
      x: (viewportWidth - paperWidth) / 2,
      y: (viewportHeight - paperHeight) / 2 - 10,
    });
  };

  return {
    // Vars
    offset,
    setOffset,
    scale,
    setScale,

    // Refs
    editorRef,
    viewportRef,
    paperRef,

    // Functionalities
    centerView,
  };
}

export type TransformationHook = ReturnType<typeof useTransformation>;

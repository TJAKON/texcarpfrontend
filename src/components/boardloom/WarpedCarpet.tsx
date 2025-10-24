import React from "react";
import { Shape } from "react-konva";
import { getPerspectiveTransform } from "../utils/perspective";
import type { Point } from "../types";

interface Props {
  points: Point[];
  textureImage?: HTMLImageElement;
}

export const WarpedCarpet: React.FC<Props> = ({ points, textureImage }) => {
  if (!textureImage || points.length < 4) return null;

  const srcCorners: Point[] = [
    { x: 0, y: 0 },
    { x: textureImage.width, y: 0 },
    { x: textureImage.width, y: textureImage.height },
    { x: 0, y: textureImage.height },
  ];

  const transform = getPerspectiveTransform(srcCorners, points);

  return (
    <Shape
      sceneFunc={(ctx, shape) => {
        ctx.save();
        ctx.transform(
          transform[0][0],
          transform[1][0],
          transform[0][1],
          transform[1][1],
          transform[0][2],
          transform[1][2]
        );
        ctx.drawImage(textureImage, 0, 0);
        ctx.restore();
        ctx.fillStrokeShape(shape);
      }}
    />
  );
};

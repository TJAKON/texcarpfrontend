import { useState, useEffect } from "react";
import type { Point } from "../types";

export const useTiledTexture = (
  tileImage: HTMLImageElement | undefined,
  floorPoints: Point[],
  size = { w: 100, h: 15 }
) => {
  const [texture, setTexture] = useState<HTMLImageElement>();

  useEffect(() => {
    if (!tileImage || tileImage.width === 0) return;

    const floorWidth = Math.hypot(
      floorPoints[1].x - floorPoints[0].x,
      floorPoints[1].y - floorPoints[0].y
    );
    const floorHeight = Math.hypot(
      floorPoints[3].x - floorPoints[0].x,
      floorPoints[3].y - floorPoints[0].y
    );
    const ratio = floorWidth / floorHeight;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = tileImage.width * size.w * ratio;
    canvas.height = tileImage.height * size.h;

    const pattern = ctx.createPattern(tileImage, "repeat");
    if (!pattern) return;

    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const finalImage = new window.Image();
    finalImage.onload = () => setTexture(finalImage);
    finalImage.src = canvas.toDataURL();
  }, [tileImage, floorPoints, size.w, size.h]);

  return texture;
};

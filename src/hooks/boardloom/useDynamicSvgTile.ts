import { useState, useEffect } from "react";
import type { TileColors } from "../../hooks/boardloom/types";

const SVG_PATH = "/tiletwo.svg";
console.log("SVG_PATH", SVG_PATH);

export const useDynamicSvgTile = (colors: TileColors) => {
  const [tileImage, setTileImage] = useState<HTMLImageElement>();

  useEffect(() => {
    fetch(SVG_PATH)
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

        const updateFill = (className: string, color: string) => {
          const elements = svgDoc.getElementsByClassName(className);
          for (let el of Array.from(elements)) el.setAttribute("fill", color);
        };

        updateFill("color-base", colors.base);
        updateFill("color-accent1", colors.accent1);
        updateFill("color-accent2", colors.accent2);

        const serializer = new XMLSerializer();
        const modifiedSvg = serializer.serializeToString(svgDoc.documentElement);
        const dataUrl = `data:image/svg+xml;base64,${btoa(modifiedSvg)}`;

        const img = new window.Image();
        img.onload = () => setTileImage(img);
        img.src = dataUrl;
      });
  }, [colors]);

  return tileImage;
};

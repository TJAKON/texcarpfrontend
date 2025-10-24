import React from "react";
import type { TileColors } from "../types";

interface Props {
  label: string;
  colorKey: keyof TileColors;
  value: string;
  onChange: (color: string) => void;
}

export const ColorControl: React.FC<Props> = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between p-3 border-b border-gray-200">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 p-0 border-none rounded-full cursor-pointer bg-transparent"
    />
  </div>
);

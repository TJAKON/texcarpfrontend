import type { Point } from "../hooks/boardloom/types";

export function getPerspectiveTransform(src: Point[], dst: Point[]): number[][] {
  const a: number[][] = [], b: number[] = [];
  for (let i = 0; i < 4; i++) {
    a.push([src[i].x, src[i].y, 1, 0, 0, 0, -src[i].x * dst[i].x, -src[i].y * dst[i].x]);
    b.push(dst[i].x);
    a.push([0, 0, 0, src[i].x, src[i].y, 1, -src[i].x * dst[i].y, -src[i].y * dst[i].y]);
    b.push(dst[i].y);
  }
  const h = solve(a, b);
  return [
    [h[0], h[1], h[2]],
    [h[3], h[4], h[5]],
    [h[6], h[7], 1],
  ];
}

function solve(a: number[][], b: number[]): number[] {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++)
      if (Math.abs(a[k][i]) > Math.abs(a[maxRow][i])) maxRow = k;
    [a[i], a[maxRow]] = [a[maxRow], a[i]];
    [b[i], b[maxRow]] = [b[maxRow], b[i]];
    for (let k = i + 1; k < n; k++) {
      const c = -a[k][i] / a[i][i];
      for (let j = i; j < n; j++) a[k][j] = i === j ? 0 : a[k][j] + c * a[i][j];
      b[k] += c * b[i];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = b[i] / a[i][i];
    for (let k = i - 1; k >= 0; k--) b[k] -= a[k][i] * x[i];
  }
  return x;
}

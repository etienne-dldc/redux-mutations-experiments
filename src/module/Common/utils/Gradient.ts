import { SplineInterpolation } from './SplineInterpolation';
import isNumber from 'lodash/isNumber';
import last from 'lodash/last';

export namespace Gradient {
  export type Type = (x: number) => string;

  type Point = { x: number; h: number; s: number; l: number };
  type HPoint = { x: number; h: number; s: number | null; l: number | null };
  type SPoint = { x: number; h: number | null; s: number; l: number | null };
  type LPoint = { x: number; h: number | null; s: number | null; l: number };

  const isHPoint = (maybeHPoint: any): maybeHPoint is HPoint =>
    maybeHPoint && maybeHPoint.x !== null && maybeHPoint.h !== null;
  const isSPoint = (maybeSPoint: any): maybeSPoint is SPoint =>
    maybeSPoint && maybeSPoint.x !== null && maybeSPoint.s !== null;
  const isLPoint = (maybeLPoint: any): maybeLPoint is LPoint =>
    maybeLPoint && maybeLPoint.x !== null && maybeLPoint.l !== null;

  export function create(points: { [key: number]: [number | null, number | null, number | null] }): Type {
    const validPoints = Object.keys(points)
      .map(k => parseInt(k, 10))
      .filter((key, index) => {
        if (isNaN(key)) {
          console.warn(`Ignore NaN key`);
          return false;
        }
        if (key < 0 || key > 100) {
          console.warn(`Ignore key not in [0, 100]`);
          return false;
        }
        return true;
      })
      .sort((left, right) => left - right)
      .map(k => {
        const p = points[k];
        return { x: k, h: p[0], s: p[1], l: p[2] };
      });

    const tmpHPoints = validPoints.filter(isHPoint).map(p => p.h);
    const tmpSPoints = validPoints.filter(isSPoint).map(p => p.s);
    const tmpLPoints = validPoints.filter(isLPoint).map(p => p.l);
    const startPoint: Point = {
      x: 0,
      h: isNumber(tmpHPoints[0]) ? tmpHPoints[0] : 0,
      s: isNumber(tmpSPoints[0]) ? tmpSPoints[0] : 50,
      l: isNumber(tmpLPoints[0]) ? tmpLPoints[0] : 50,
    };
    const lastH = last(tmpHPoints);
    const lastS = last(tmpSPoints);
    const lastL = last(tmpLPoints);
    const endPoint: Point = {
      x: 100,
      h: isNumber(lastH) ? lastH : 0,
      s: isNumber(lastS) ? lastS : 50,
      l: isNumber(lastL) ? lastL : 50,
    };

    if (validPoints[0] && validPoints[0].x === 0) {
      validPoints[0] = startPoint;
    } else {
      validPoints.unshift(startPoint);
    }
    const lastPoint = last(validPoints);
    if (lastPoint && lastPoint.x === 100) {
      validPoints[validPoints.length - 1] = endPoint;
    } else {
      validPoints.push(endPoint);
    }

    const hPoints = validPoints.filter(isHPoint);
    const sPoints = validPoints.filter(isSPoint);
    const lPoints = validPoints.filter(isLPoint);
    const hInterp = SplineInterpolation.create(hPoints.map(p => p.x), hPoints.map(p => p.h));
    const sInterp = SplineInterpolation.create(sPoints.map(p => p.x), sPoints.map(p => p.s));
    const lInterp = SplineInterpolation.create(lPoints.map(p => p.x), lPoints.map(p => p.l));

    const cache: { [key: number]: string } = {};

    return (x: number) => {
      const xRound = Math.round(x);
      if (xRound < 0) {
        console.warn(`Invalid shade ${xRound} (less than 0), return white`);
        return `hsl(0, 0%, 100%)`;
      }
      if (xRound > 100) {
        console.warn(`Invalid shade ${xRound} (more than 100), return black`);
        return `hsl(0, 0%, 0%)`;
      }
      if (cache[xRound]) {
        return cache[xRound];
      }
      const result = `hsl(${Math.round(hInterp(xRound))}, ${Math.round(sInterp(xRound))}%, ${Math.round(
        lInterp(xRound)
      )}%)`;
      cache[xRound] = result;
      return result;
    };
  }
}

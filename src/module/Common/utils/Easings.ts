export type Easing = (t: number) => number;

export namespace Easing {
  export const linear: Easing = (t: number) => t;

  export const easeInQuad: Easing = (t: number) => t * t;

  export const easeOutQuad: Easing = (t: number) => t * (2 - t);

  export const easeInOutQuad: Easing = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  export const easeInCubic: Easing = (t: number) => t * t * t;

  export const easeOutCubic: Easing = (t: number) => --t * t * t + 1;

  export const easeInOutCubic: Easing = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  export const easeInQuart: Easing = (t: number) => t * t * t * t;

  export const easeOutQuart: Easing = (t: number) => 1 - --t * t * t * t;

  export const easeInOutQuart: Easing = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);

  export const easeInQuint: Easing = (t: number) => t * t * t * t * t;

  export const easeOutQuint: Easing = (t: number) => 1 + --t * t * t * t * t;

  export const easeInOutQuint: Easing = (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

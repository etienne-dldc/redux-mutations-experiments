export namespace Sizes {
  const tinyMenuMaxWidth = 1000;
  // const tinyMenuSmallLimit = 600;

  export const getTinyMenuHeight = (width: number): number => {
    return 50;
    // if (width <= tinyMenuSmallLimit) {
    //   return 50;
    // }
  };

  export const getContentWidth = (windowWidth: number): number => {
    return isTinyMenu(windowWidth) ? windowWidth : windowWidth - leftMenuWidth;
  };

  export const leftMenuWidth = 300;

  export function isTinyMenu(width: number): boolean {
    return width <= tinyMenuMaxWidth;
  }
}

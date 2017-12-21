import Color from 'color';

export namespace Colors {
  export const white = '#fff';
  export const midnightBlue = '#241770';
  export const yellow = '#FFEC00';
  export const black = '#000000';
  export const grey = '#878787';
  export const sapphire = '#0D094C';
  export const dark = '#1D1D1B';
  export const darkGrey = Color('#1D1D1B');

  /**
   * Aliases
   */

  export const tinyMenu = {
    blue: sapphire,
    blueHover: Color(sapphire)
      .darken(0.2)
      .hex(),
    yellow,
  };

  export const logo = {
    blue: midnightBlue,
    yellow,
    text: dark,
  };
}

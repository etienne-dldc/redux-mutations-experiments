export namespace SplineInterpolation {
  type Matrix = Array<Array<number>>;

  const cache: { [key: string]: (x: number) => number } = {};
  const naturalKsCache: { [key: string]: Array<number> } = {};

  function solve(A: Matrix): Array<number> {
    const x: Array<number> = [];
    const m = A.length;
    for (
      let k = 0;
      k < m;
      k++ // column
    ) {
      // pivot for column
      let iMax = 0;
      let vali = Number.NEGATIVE_INFINITY;
      for (let i = k; i < m; i++) {
        if (Math.abs(A[i][k]) > vali) {
          iMax = i;
          vali = Math.abs(A[i][k]);
        }
      }
      swapRows(A, k, iMax);

      // for all rows below pivot
      for (let i = k + 1; i < m; i++) {
        const cf = A[i][k] / A[k][k];
        for (let j = k; j < m + 1; j++) {
          A[i][j] -= A[k][j] * cf;
        }
      }
    }

    for (
      let i = m - 1;
      i >= 0;
      i-- // rows = columns
    ) {
      const v = A[i][m] / A[i][i];
      x[i] = v;
      for (
        let j = i - 1;
        j >= 0;
        j-- // rows
      ) {
        A[j][m] -= A[j][i] * v;
        A[j][i] = 0;
      }
    }
    return x;
  }

  function zerosMat(r: number, c: number) {
    const A: Matrix = [];
    for (let i = 0; i < r; i++) {
      A.push([]);
      for (let j = 0; j < c; j++) {
        A[i].push(0);
      }
    }
    return A;
  }

  function swapRows(m: Matrix, k: number, l: number) {
    const p = m[k];
    m[k] = m[l];
    m[l] = p;
  }

  function getNaturalKs(xs: Array<number>, ys: Array<number>): Array<number> {
    const key = `${xs.join('-')}_${ys.join('-')}`;
    if (naturalKsCache[key]) {
      return naturalKsCache[key];
    }

    const n = xs.length - 1;
    const A = zerosMat(n + 1, n + 2);

    for (
      let i = 1;
      i < n;
      i++ // rows
    ) {
      A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);

      A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));

      A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);

      A[i][n + 1] =
        3 *
        ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) +
          (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
    }

    A[0][0] = 2 / (xs[1] - xs[0]);
    A[0][1] = 1 / (xs[1] - xs[0]);
    A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

    A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
    A[n][n] = 2 / (xs[n] - xs[n - 1]);
    A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

    const result = solve(A);
    naturalKsCache[key] = result;
    return result;
  }

  export function evalAt(x: number, xs: Array<number>, ys: Array<number>, ksIn?: Array<number>) {
    return create(xs, ys, ksIn)(x);
  }

  export function create(xs: Array<number>, ys: Array<number>, ksIn?: Array<number>): (x: number) => number {
    // validate input
    if (xs.length !== ys.length) {
      throw new Error('xs and ys should have the same size !');
    }
    [...xs, ...ys].forEach((val, index) => {
      if (Math.round(val) !== val) {
        throw new Error('Only integer are supported !');
      }
    });
    if (ksIn && ksIn.length !== xs.length) {
      throw new Error('ksIn should have the same size as xs and ys !');
    }

    const ks: Array<number> = ksIn ? ksIn : getNaturalKs(xs, ys);

    const key = `${xs.join('-')}_${ys.join('-')}_${ks.join('-')}`;
    if (cache[key]) {
      return cache[key];
    }

    const valueCache: { [key: number]: number } = {};

    const result = (x: number) => {
      if (valueCache[x]) {
        return valueCache[x];
      }
      let i = 1;
      while (xs[i] < x) {
        i++;
      }
      const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      const a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
      const b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
      const q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
      valueCache[x] = q;
      return q;
    };
    cache[key] = result;
    return result;
  }
}

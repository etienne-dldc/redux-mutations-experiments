import { runDetector } from './redux-yarl';

describe('runDetector', () => {
  it('run with no detectors', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    runDetector([], dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(getState).toHaveBeenCalledTimes(0);
  });
  it('run with one detectors not active', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    runDetector([() => null], dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(getState).toHaveBeenCalledTimes(1);
  });
  it('run with one detectors', () => {
    let called = false;
    const detector = jest.fn(() => {
      if (called) {
        return null;
      }
      called = true;
      return { type: 'Yolo' };
    });
    const dispatch = jest.fn();
    const getState = jest.fn();
    runDetector([detector], dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(getState).toHaveBeenCalledTimes(2);
    expect(detector).toHaveBeenCalledTimes(2);
  });
  it('run with two detectors', () => {
    const createDetector = () => {
      let called = false;
      return jest.fn(() => {
        if (called) {
          return null;
        }
        called = true;
        return { type: 'Yolo' };
      });
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const detect1 = createDetector();
    const detect2 = createDetector();
    runDetector([detect1, detect2], dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(getState).toHaveBeenCalledTimes(4);
    expect(detect1).toHaveBeenCalledTimes(2);
    expect(detect2).toHaveBeenCalledTimes(2);
  });
  it('run with 3 detectors', () => {
    const createDetector = () => {
      let called = false;
      return jest.fn(() => {
        if (called) {
          return null;
        }
        called = true;
        return { type: 'Yolo' };
      });
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const detect1 = createDetector();
    const detect2 = createDetector();
    const detect3 = createDetector();
    runDetector([detect1, detect2, detect3], dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(getState).toHaveBeenCalledTimes(6);
    expect(detect1).toHaveBeenCalledTimes(2);
    expect(detect2).toHaveBeenCalledTimes(2);
    expect(detect3).toHaveBeenCalledTimes(2);
  });
});

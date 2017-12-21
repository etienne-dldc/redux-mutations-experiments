import raf from 'raf';
import clamp from 'lodash/clamp';
import { Easing } from './Easings';

type Result = {
  isScrolling: () => boolean;
  stop: () => void;
};

type Options = {
  duration?: number;
  easing?: Easing;
};

export function animatedScrollTo(scrollContainer: HTMLElement, destination: number, options: Options = {}): Result {
  const { duration = 200, easing = Easing.linear } = options;
  const startScroll = scrollContainer.scrollTop;
  const startTime = Date.now();
  const endTime = startTime + duration;
  const scrollSize = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  const normalizedDestination = clamp(destination, 0, scrollSize);
  const scrollDistance = normalizedDestination - startScroll;

  let running = true;

  function stop() {
    running = false;
  }

  function scroll() {
    const now = Date.now();
    const progress = Math.min(1, (now - startTime) / duration);
    const timeFunction = easing(progress);
    const nextScrollValue = startScroll + timeFunction * scrollDistance;
    const nextScrollValueNormalized = Math.min(scrollSize, Math.max(0, nextScrollValue));
    scrollContainer.scrollTop = nextScrollValueNormalized;

    if (nextScrollValueNormalized === normalizedDestination) {
      stop();
    }

    if (running && now >= endTime) {
      stop();
      scrollContainer.scrollTop = destination;
    }

    if (running) {
      raf(scroll);
    }
  }

  scroll();

  return {
    isScrolling: () => running,
    stop: () => stop(),
  };
}

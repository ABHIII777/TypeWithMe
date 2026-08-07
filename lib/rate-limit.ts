export interface RateLimiter {
  allow: () => boolean;
  reset: () => void;
}

export const createRateLimiter = (max: number, windowMs: number): RateLimiter => {
  let hits: number[] = [];

  return {
    allow: () => {
      const now = Date.now();
      hits = hits.filter((t) => now - t < windowMs);
      if (hits.length >= max) return false;
      hits.push(now);
      return true;
    },
    reset: () => {
      hits = [];
    },
  };
};

export const throttle = <T extends (...args: never[]) => void>(
  fn: T,
  ms: number
): ((...args: Parameters<T>) => void) => {
  let last = 0;
  let lastArgs: Parameters<T> | null = null;
  let trailing = false;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    if (now - last >= ms) {
      last = now;
      trailing = false;
      fn(...args);
      return;
    }

    if (!trailing) {
      trailing = true;
      const remaining = ms - (now - last);
      setTimeout(() => {
        trailing = false;
        last = Date.now();
        if (lastArgs) fn(...lastArgs);
      }, remaining);
    }
  };
};

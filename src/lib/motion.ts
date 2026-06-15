export const ease = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.6,
  stagger: 0.08,
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: duration.slow, ease },
};



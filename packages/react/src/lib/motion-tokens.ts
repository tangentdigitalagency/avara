export const duration = {
  fast: 0.12,
  normal: 0.2,
  slow: 0.32,
} as const;

export const ease = {
  standard: [0.4, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
} as const;

export const colors = {
  primary: '#007AFF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  red: '#FF3B30',
  green: '#34C759',
} as const;

export type ColorKeys = keyof typeof colors;

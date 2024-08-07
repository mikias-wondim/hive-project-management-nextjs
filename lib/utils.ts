import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hslModifyLightness(hsl: string, newLightness: number) {
  if (newLightness < 0 || newLightness > 100) {
    throw new Error('Lightness should be a percentage between 0 and 100');
  }
  const hslPattern = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const match = hsl.match(hslPattern);

  if (!match) {
    throw new Error('Invalid HSL color string');
  }

  const h = match[1];
  const s = match[2];

  return `hsl(${h}, ${s}%, ${newLightness}%)`;
}

export const getCustomFieldTagColorsForTheme = (
  hslColor: string,
  theme: string | undefined
) => ({
  backgroundColor: hslModifyLightness(hslColor, theme === 'light' ? 90 : 15),
  color: hslModifyLightness(hslColor, theme === 'light' ? 40 : 70),
  border: `1px solid ${hslModifyLightness(
    hslColor,
    theme === 'light' ? 60 : 45
  )}`,
});

export function getAllKeysExceptLabelKey(
  data: any[],
  labelKey: string
): string[] {
  const keysSet = new Set<string>();

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== labelKey) {
        keysSet.add(key);
      }
    });
  });

  return Array.from(keysSet);
}

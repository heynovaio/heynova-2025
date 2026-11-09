/**
 * Card colour options shared by ContentColumn cards, FAQ items and fact tags.
 * "dark" is the translucent midnight card with a thin aqua border used on
 * dark sections; every other colour is a solid light fill with midnight text.
 */
export type CardTone = {
  card: string;
  title: string;
  body: string;
  link: string;
  isLight: boolean;
};

const DARK: CardTone = {
  card: "bg-midnight/55 border border-aqua/30",
  title: "text-white",
  body: "text-purple-lt",
  link: "text-aqua",
  isLight: false,
};

const light = (bg: string): CardTone => ({
  card: `${bg} surface-light`,
  title: "text-midnight",
  body: "text-midnight",
  link: "text-midnight",
  isLight: true,
});

const TONES: Record<string, CardTone> = {
  None: DARK,
  Dark: DARK,
  Blue: light("bg-aqua"),
  Aqua: light("bg-aqua"),
  Purple: light("bg-purple-lt"),
  "Light Purple": light("bg-purple-lt"),
  Lavender: light("bg-lavendar"),
  "Light Blue": light("bg-light-blue"),
  Periwinkle: light("bg-periwinkle"),
};

/** Resolve a card's tone: the item's own colour wins over the section's. */
export function getCardTone(
  sectionColor?: string | null,
  itemColor?: string | null,
): CardTone {
  if (itemColor && itemColor !== "Default" && TONES[itemColor]) {
    return TONES[itemColor];
  }
  return TONES[sectionColor ?? "None"] ?? DARK;
}

/** Light fills, rotated for lists that colour items automatically. */
export const ROTATING_LIGHT_TONES = [
  TONES.Aqua,
  TONES.Lavender,
  TONES["Light Blue"],
  TONES["Light Purple"],
];

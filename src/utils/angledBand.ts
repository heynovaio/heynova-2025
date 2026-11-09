/**
 * Where a slice sits inside a run of slices that have "Angled Background"
 * turned on. Neighbouring slices with the toggle on share one continuous
 * band: only the first gets the angled top edge and only the last gets the
 * angled bottom edge.
 */
export type BandPosition = "none" | "single" | "start" | "middle" | "end";

const hasAngledBackground = (slice: unknown): boolean => {
  const primary = (slice as { primary?: Record<string, unknown> } | undefined)
    ?.primary;
  return primary?.angled_background === true;
};

export function getBandPosition(
  slices: readonly unknown[] | undefined,
  index: number | undefined,
): BandPosition {
  if (!slices || index === undefined) return "none";
  if (!hasAngledBackground(slices[index])) return "none";

  const joinsPrevious = index > 0 && hasAngledBackground(slices[index - 1]);
  const joinsNext =
    index < slices.length - 1 && hasAngledBackground(slices[index + 1]);

  if (joinsPrevious && joinsNext) return "middle";
  if (joinsPrevious) return "end";
  if (joinsNext) return "start";
  return "single";
}

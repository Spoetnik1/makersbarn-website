/**
 * Formatting utilities for displaying user data
 */

/**
 * Formats group size information from min/max values
 */
export function formatGroupSize(
  minGroupSize: number | undefined,
  maxGroupSize: number | undefined
): string | undefined {
  if (minGroupSize && maxGroupSize) {
    return `${minGroupSize} - ${maxGroupSize} people`
  }
  if (minGroupSize) {
    return `${minGroupSize}+ people`
  }
  if (maxGroupSize) {
    return `Up to ${maxGroupSize} people`
  }
  return undefined
}

export default function stringToBoolean(
  value: string | null | undefined,
): boolean {
  return !(value == null) && (value.toLowerCase() === 'true' || value === '1');
}

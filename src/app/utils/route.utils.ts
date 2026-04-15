export function resolveBackHref(fallback: string, back?: string): string {
  if (!back) {
    return fallback;
  }

  try {
    const decodedBack = decodeURIComponent(back);
    return decodedBack.startsWith(fallback) ? decodedBack : fallback;
  } catch {
    return fallback;
  }
}

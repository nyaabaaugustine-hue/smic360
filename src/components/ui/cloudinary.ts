/**
 * Cloudinary URL optimizer — automatically appends f_auto,q_auto and
 * an optional width so browsers only download what they need.
 *
 * Usage:
 *   clImg('https://res.cloudinary.com/.../image/upload/v123/photo.jpg', 800)
 *   → 'https://res.cloudinary.com/.../image/upload/f_auto,q_auto,w_800/v123/photo.jpg'
 *
 * Safe to call with any URL — non-Cloudinary URLs pass through unchanged.
 */
export function clImg(url: string, width?: number): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  // Avoid double-transforming
  if (url.includes('/f_auto') || url.includes('f_auto,')) return url;

  const uploadMarker = '/image/upload/';
  const idx = url.indexOf(uploadMarker);
  if (idx === -1) return url;

  const base       = url.slice(0, idx + uploadMarker.length);
  const rest       = url.slice(idx + uploadMarker.length);
  const transforms = ['f_auto', 'q_auto', ...(width ? [`w_${width}`] : [])].join(',');

  return `${base}${transforms}/${rest}`;
}

/**
 * Cloudinary srcSet helper for responsive images.
 * Returns a srcSet string for 3 breakpoints.
 */
export function clSrcSet(url: string, widths = [480, 800, 1200]): string {
  return widths.map(w => `${clImg(url, w)} ${w}w`).join(', ');
}

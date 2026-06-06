/**
 * Prepare an SVG path for a stroke "draw-on" animation by initialising its
 * dash array/offset to its own length. Animate `strokeDashoffset` → 0 to draw.
 * (Avoids GSAP's premium DrawSVGPlugin — pure SMIL-free CSS path length.)
 */
export function prepareDraw(path: SVGGeometryElement): number {
  const len = path.getTotalLength()
  path.style.strokeDasharray = `${len}`
  path.style.strokeDashoffset = `${len}`
  return len
}

// Small helpers shared by page templates.

// Image objects come from two shapes:
//   - Sanity:   { asset: { url: 'https://...' } }
//   - Defaults: { url: '/local-path.jpg' }
// This helper unwraps both.
export function imgPath(img: any, fallback = ''): string {
  if (!img) return fallback
  if (typeof img === 'string') return img
  if (img.asset?.url) return img.asset.url
  if (img.url) return img.url
  return fallback
}

// Merge a Sanity document over defaults, picking only defined values.
// `null`/`undefined`/`''` on the Sanity side falls through to defaults.
export function merge<T extends Record<string, any>>(defaults: T, override: any): T {
  if (!override) return defaults
  const out: any = {...defaults}
  for (const key of Object.keys(override)) {
    const v = override[key]
    if (v === null || v === undefined) continue
    if (Array.isArray(v) && v.length === 0) continue
    out[key] = v
  }
  return out
}

export function btnClass(cta: {style?: string; size?: string} | undefined | null, defaults?: {style?: string; size?: string}): string {
  const style = cta?.style || defaults?.style || 'teal'
  const size = cta?.size || defaults?.size || 'md'
  return `btn btn-${style}${size && size !== 'md' ? ` btn-${size}` : ''}`
}

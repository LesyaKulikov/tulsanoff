import type { CSSProperties } from 'react'
import { useLocale } from '../../i18n/localeContext'
import { locales } from '../../i18n/messages'

interface ArrowProps {
  style?: CSSProperties
}

/** 14px arrow glyph. Stroke matches the FAQ +/- icon (same 14px box,
 *  strokeWidth 2) so every inline glyph carries one weight. */
export function Arrow({ style }: ArrowProps) {
  const { locale } = useLocale()
  const isRtl = locales[locale].dir === 'rtl'
  // In RTL the arrow must point the other way so it never "looks at" the text.
  // Forward arrows (no rotation) flip horizontally; the back arrow (rotate 180)
  // drops its rotation so it points right in RTL instead.
  const isBack = typeof style?.transform === 'string' && style.transform.includes('rotate(180')

  let transform = style?.transform
  if (isRtl) {
    if (isBack) {
      transform = undefined
    } else {
      transform = transform ? `${transform} scaleX(-1)` : 'scaleX(-1)'
    }
  }

  const mergedStyle: CSSProperties = { ...style, transform }

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={mergedStyle}
    >
      <path
        d="M2 7h9.5M8.5 3.5 11.5 7l-3 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
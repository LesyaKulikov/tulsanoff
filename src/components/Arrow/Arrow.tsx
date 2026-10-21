import type { CSSProperties } from 'react'

interface ArrowProps {
  style?: CSSProperties
}

/** 14px arrow glyph. Stroke matches the FAQ +/- icon (same 14px box,
 *  strokeWidth 2) so every inline glyph carries one weight. */
export function Arrow({ style }: ArrowProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={style}
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

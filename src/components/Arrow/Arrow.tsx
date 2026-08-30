import type { CSSProperties } from 'react'

interface ArrowProps {
  color?: string
  style?: CSSProperties
}

export function Arrow({ color = 'currentColor', style }: ArrowProps) {
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
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

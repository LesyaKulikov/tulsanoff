interface ChevronProps {
  direction?: 'down' | 'right'
}

export function Chevron({ direction = 'right' }: ChevronProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: direction === 'down' ? 'rotate(90deg)' : undefined }}
    >
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

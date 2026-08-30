import styles from './ServiceIcon.module.css'

export function ServiceIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 110 107"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="55" cy="53.5" r="45" fill="#D4FBC8" opacity="0.55" />
      <path
        d="M55 30c-12 7-14 18-10 27 5 11 16 16 24 15-4-13-12-17-14-24 3 6 9 9 14 9-3-12-9-18-14-27z"
        fill="#D4FBC8"
      />
    </svg>
  )
}

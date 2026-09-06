import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'inverse'
  children: ReactNode
  className?: string
  to?: string
}

export function Button({
  variant = 'primary',
  children,
  className,
  to,
  ...rest
}: ButtonProps & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

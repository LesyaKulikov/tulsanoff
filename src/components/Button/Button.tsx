import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/**
 * Props every flavour shares. `children` and `className` are re-declared here
 * and stripped from the HTML attribute bags below, so the three branches can
 * never disagree about them (extending both would be a "not identical" error).
 */
interface ButtonOwnProps {
  variant?: 'primary' | 'inverse'
  children: ReactNode
  className?: string
}

/** Internal route → router `<Link>`. */
type ButtonLinkProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    to: string
    /** Present-but-undefined here keeps the union discriminated on `to`. */
    href?: undefined
  }

/** External URL → plain `<a>`. */
type ButtonAnchorProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
    to?: undefined
  }

/**
 * No destination → `<button type="button">`. `disabled` lives only on this
 * branch: it used to type-check on the anchor branches too, where it was
 * silently dropped. `type` is omitted and hard-coded in the render so the
 * button can never default to `submit`.
 */
type ButtonElementProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'> & {
    to?: undefined
    href?: undefined
  }

type ButtonProps = ButtonLinkProps | ButtonAnchorProps | ButtonElementProps

export function Button(props: ButtonProps) {
  // `!== undefined`, not truthiness: a falsy check would keep `to: ''` in the
  // fall-through union and the anchor branch's attributes would leak into the
  // <button> below.
  if (props.to !== undefined) {
    const { to, variant = 'primary', children, className, ...rest } = props
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (props.href !== undefined) {
    const { href, variant = 'primary', children, className, ...rest } = props
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const { variant = 'primary', children, className, ...rest } = props
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

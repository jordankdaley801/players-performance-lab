import type {ButtonHTMLAttributes, ReactNode} from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost' | 'outline'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({variant = 'primary', className = '', children, ...rest}: Props) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}

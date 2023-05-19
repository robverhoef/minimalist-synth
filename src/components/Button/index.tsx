import React from 'react'
import cc from 'classcat'
import '../../index.css'
import './styles.css'

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  round?: boolean
  radius?: string
  primary?: boolean
  secondary?: boolean
  outline?: boolean
  children: JSX.Element | string
  title?: string
  disabled?: boolean
  small?: boolean
  large?: boolean
}

export default function Button(props: ButtonProps) {
  const {
    primary,
    secondary,
    outline,
    title,
    children,
    disabled,
    round,
    radius,
    small,
    large,
  } = props
  console.table(props)
  const clss = cc([
    'button',
    { round: round },
    { button_primary: primary },
    { button_secondary: secondary },
    { 'radius-small': radius === 'small' },
    { 'radius-medium': radius === 'medium' },
    { 'radius-large': radius === 'large' },
    { 'radius-round': radius === 'round' },
    { outline: outline },
    { small: small },
    { large: large },
  ])
  const attributes: { title?: string; disabled?: boolean } = {}
  if (title) {
    attributes.title = title
  }
  attributes.disabled = disabled
  return (
    <button
      className={clss}
      {...attributes}
    >
      {children}
    </button>
  )
}

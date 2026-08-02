import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { FIRM_NAME } from '@/data/brand'

/**
 * Renders “Markshell & Associates” with a styled ampersand (logo-style).
 * @param {string} [ampClassName] — ampersand color; defaults to gold accent
 */
export function BrandName({ className, ampClassName = 'text-gold', inheritColor = false }) {
  const amp = inheritColor ? '' : ampClassName
  return (
    <span className={className}>
      Markshell{' '}
      <span className={cn('font-normal', amp)}>&</span>
      {' '}
      Associates
    </span>
  )
}

export function brandAriaLabel() {
  return FIRM_NAME
}

/** Inline replacement when firm name appears inside a string (e.g. testimonials). */
export function TextWithBrandName({ text, ampClassName = 'text-gold' }) {
  if (!text.includes(FIRM_NAME)) return text
  const parts = text.split(FIRM_NAME)
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? <BrandName className="inline" ampClassName={ampClassName} /> : null}
        </Fragment>
      ))}
    </>
  )
}

import * as React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-sky-700',
        className,
      )}
      {...props}
    />
  )
}


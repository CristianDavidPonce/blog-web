import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface CalloutProps {
  icon?: string
  children?: ReactNode
  type?: 'default' | 'warning' | 'danger'
}

export function Callout({
  children,
  icon,
  type = 'default',
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn('my-6 flex items-start rounded-md border p-3 text-sm', {
        'border-slate-900 bg-slate-50': type === 'default',
        'border-red-600 bg-red-50': type === 'danger',
        'border-yellow-900 bg-yellow-50': type === 'warning',
      })}
      {...props}
    >
      {icon && <span className='mr-4 text-2xl'>{icon}</span>}
      <div>{children}</div>
    </div>
  )
}

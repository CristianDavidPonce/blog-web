import React from 'react'

interface IProps {
  items?: number
}
const Skeleton = ({ items = 10 }: IProps) => {
  return (
    <div className='r max-w-full animate-pulse space-y-4 divide-y divide-slate-200 dark:divide-slate-700 dark:border-slate-700 md:p-6'>
      {Array.from({ length: items }).map((x, i) => (
        <div className='flex items-center justify-between pt-4' key={i}>
          <div>
            <div className='mb-2.5 h-2.5 w-24 rounded-full bg-slate-300 dark:bg-slate-600'></div>
            <div className='h-2 w-32 rounded-full bg-slate-200 dark:bg-slate-700'></div>
          </div>
          <div className='h-2.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700'></div>
        </div>
      ))}

      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Skeleton

import React from 'react'
import Link from 'next/link'
import { useGet } from '@/rest/user'
import moment from 'moment'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { postUrl } from '../Admin/Posts/types'
import { IPost } from '../Posts/types'

const Home = () => {
  const data = useGet<IPost>({ url: postUrl })
  return (
    <div className='mx-auto max-w-[700px] px-4'>
      {data.isLoading && (
        <div className='r max-w-full animate-pulse space-y-4 divide-y divide-slate-200 dark:divide-slate-700 dark:border-slate-700'>
          {Array.from({ length: 10 }).map((x, i) => (
            <div className='flex flex-col pt-4' key={i}>
              <div className='mb-2 flex items-center gap-2'>
                <div className='h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-600'></div>
                <div className='h-5 w-28 rounded-md bg-slate-300 dark:bg-slate-600'></div>
              </div>

              <div className='h-28 w-full rounded-md bg-slate-200 dark:bg-slate-700'></div>
            </div>
          ))}

          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {data.data?.items.map((item) => (
        <Link
          key={item.id}
          href={`/post/${item.id}`}
          className='flex cursor-pointer flex-col border-b border-slate-200 py-4 dark:border-slate-800'
        >
          <div className='mb-2 flex items-center gap-2'>
            <Avatar>
              <AvatarFallback>{item.createdByName[0]}</AvatarFallback>
            </Avatar>
            <p className='text-sm text-slate-800 dark:text-slate-300'>
              {item.author?.firstName + ' ' + item.author.lastName[0] + '.' ||
                item.createdByName}
            </p>
            <p className='text-sm text-slate-500'>
              {moment(item.createdAt).format('L')}
            </p>
          </div>
          <h2 className='mb-2 ml-1 text-lg font-bold'>{item.title}</h2>

          <p className='mb-4 ml-1 line-clamp-3'>
            {item.content &&
              item.content.find((x) => x.type === 'paragraph')?.data.text}
          </p>

          <div className='flex flex-wrap gap-2'>
            {item.tags.map((x) => (
              <div
                key={x.id}
                className={
                  'rounded-md bg-slate-200 px-2 py-0.5 text-sm dark:bg-slate-800'
                }
              >
                {x.name}
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home

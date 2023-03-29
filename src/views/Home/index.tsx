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
              {item.autor?.firstName || item.createdByName}
            </p>
            <span>·</span>
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

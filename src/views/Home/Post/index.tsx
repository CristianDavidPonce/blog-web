import React from 'react'
import router from 'next/router'
import { useGetOne } from '@/rest/user'
import { postUrl } from '@/views/Admin/Posts/types'
import { IPost } from '@/views/Posts/types'
import moment from 'moment'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import EditorJsRenderer from '@/components/utils/EditorJsRenderer'
import Comments from './Comments'

const Post = () => {
  const datos = useGetOne<IPost>({
    url: postUrl,
    _id: (router.query.id as string) || '',
  })

  return (
    <>
      <div className='mx-auto max-w-[750px] px-8'>
        <div className='flex items-center justify-between pb-4'>
          <div className='mb-2 flex items-center gap-2'>
            <Avatar>
              <AvatarFallback>{datos.data?.createdByName[0]}</AvatarFallback>
            </Avatar>
            <p className='text-sm text-slate-800 dark:text-slate-300'>
              {datos.data?.createdByName}
            </p>
            <span>·</span>
            <p className='text-sm text-slate-500'>
              {moment(datos.data?.createdAt).format('L')}
            </p>
          </div>
          <Button variant={'outline'} onClick={router.back}>
            Regresar
          </Button>
        </div>

        <h1 className='mb-4 text-3xl font-bold'>{datos.data?.title}</h1>

        {datos.data?.content && (
          <EditorJsRenderer data={{ blocks: datos.data.content }} />
        )}
        <Comments />
      </div>
    </>
  )
}

export default Post

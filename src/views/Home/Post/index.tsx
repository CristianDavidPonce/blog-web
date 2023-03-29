import React from 'react'
import router from 'next/router'
import { useGetOne } from '@/rest/user'
import { postUrl } from '@/views/Admin/Posts/types'
import { IPost } from '@/views/Posts/types'

import EditorJsRenderer from '@/components/utils/EditorJsRenderer'
import Header from '@/components/utils/Header'

const Post = () => {
  const datos = useGetOne<IPost>({
    url: postUrl,
    _id: (router.query.id as string) || '',
  })

  return (
    <>
      <Header title={datos.data?.title || 'Cargando...'} onBack={router.back} />
      <div className='mx-auto max-w-[700px]'>
        {datos.data?.content && (
          <EditorJsRenderer data={{ blocks: datos.data.content }} />
        )}
      </div>
    </>
  )
}

export default Post

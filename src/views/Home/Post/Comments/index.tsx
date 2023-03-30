import React from 'react'
import { useRouter } from 'next/router'
import { useCreateOne, useGetTable } from '@/rest/user'
import { MessageCircle } from 'lucide-react'
import moment from 'moment'
import { FormProvider, useForm } from 'react-hook-form'

import InputArea from '@/components/form/InputArea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IComment, commentsUrl } from './types'

const Comments = () => {
  const form = useForm()
  const router = useRouter()
  const mutation = useCreateOne({
    url: commentsUrl,
    onSuccess: () => form.reset({}),
  })
  const data = useGetTable<IComment>({
    url: commentsUrl,
    enabled: !!router.query.id,
    params: {
      params: {
        limit: 1000000,
        page: 1,
        order: JSON.stringify({ createdAt: 'ASC' }),
      },
      filters: {
        post: router.query.id as string,
      },
    },
  })
  return (
    <div className='my-4 border-t border-slate-200 py-4'>
      <div className='flex items-center gap-2'>
        <MessageCircle className='h-5' />
        <h2>Comentarios</h2>
      </div>
      <div className='my-4'>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((x) =>
              mutation.mutate({ ...x, post: router.query.id })
            )}
          >
            <InputArea
              name='description'
              inputProps={{ placeholder: 'Escribe lo que piensas...' }}
              rules={{
                required: {
                  value: true,
                  message: 'No has escrito el comentario',
                },
              }}
            />
            <div className='flex justify-end'>
              <Button type='submit'>Comentar</Button>
            </div>
          </form>
        </FormProvider>
      </div>
      {data.data?.items.map((item) => (
        <div
          key={item.id}
          className='flex cursor-pointer flex-col border-b border-slate-200 py-4 dark:border-slate-800'
        >
          <div className='mb-2 flex items-center gap-2'>
            <Avatar>
              <AvatarFallback>{item.createdByName[0]}</AvatarFallback>
            </Avatar>
            <p className='text-sm text-slate-800 dark:text-slate-300'>
              {item.author?.firstName || item.createdByName}
            </p>
            <span>·</span>
            <p className='text-xs text-slate-500'>
              {moment(item.createdAt).format('LLLL')}
            </p>
          </div>

          <p className='mb-4 ml-1'>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments

import React from 'react'
import { useDeleteOne, useGet } from '@/rest/user'
import { IComment } from '@/views/Home/Post/Comments/types'
import { Delete, LucideMoreVertical } from 'lucide-react'
import moment from 'moment'

import { Table } from '@/components/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Header from '@/components/utils/Header'
import { commentsUrl } from './types'

const Comments = () => {
  const data = useGet<IComment>({ url: commentsUrl })

  const borrar = useDeleteOne({ url: commentsUrl })

  return (
    <div>
      <>
        <Header title='Comentarios' />
        <Table
          data={data.data}
          loading={data.isFetching}
          tableProps={{
            columns: [
              {
                title: 'Creacion',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 50,
                ellipsis: true,
                align: 'right',
                render: (x, r) => (
                  <>
                    {x && moment(x).startOf('hour').fromNow()}
                    <br />
                    <p className='text-xs text-slate-500'>{r.createdByName}</p>
                  </>
                ),
              },
              {
                title: 'Post',
                dataIndex: 'post',
                key: 'post',
                width: 100,
                ellipsis: true,
                align: 'left',
                render: (_, r) => r.post?.title,
              },
              {
                title: 'Comentario',
                dataIndex: 'description',
                key: 'description',
                width: 200,
                ellipsis: true,
                align: 'left',
              },
              {
                title: ' ',
                dataIndex: 'id',
                key: 'operations',
                align: 'left',
                width: 50,
                fixed: 'right',
                render: (x) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={'outline'} size='sm'>
                        <LucideMoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          borrar.mutate(x)
                        }}
                      >
                        <div className='flex items-center gap-2'>
                          <Delete className='h4 w-4' />
                          Eliminar
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ),
              },
            ],
          }}
        />
      </>
    </div>
  )
}

export default Comments

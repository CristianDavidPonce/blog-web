import React from 'react'
import { useDeleteOne, useGet } from '@/rest/user'
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
import { IPermission, postUrl } from './types'

const Posts = () => {
  const data = useGet<IPermission>({ url: postUrl })

  const borrar = useDeleteOne({ url: postUrl })

  return (
    <div>
      <>
        <Header title='Posts' />
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
                title: 'Titulo',
                dataIndex: 'title',
                key: 'title',
                width: 100,
                ellipsis: true,
                align: 'left',
              },
              {
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                width: 100,
                ellipsis: true,
                align: 'left',
                render: (_, r) => (
                  <div className='flex flex-wrap gap-2'>
                    {r.tags.map((x) => (
                      <div
                        key={x.id}
                        className={'rounded-md bg-slate-200 px-2 py-0.5'}
                      >
                        {x.name}
                      </div>
                    ))}
                  </div>
                ),
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

export default Posts

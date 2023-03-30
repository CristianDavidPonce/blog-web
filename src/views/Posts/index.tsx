import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useEdit from '@/hooks/useEdit'
import useVisible from '@/hooks/useVisible'
import { useDeleteOne, useGet } from '@/rest/user'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Delete, EditIcon, LucideMoreVertical } from 'lucide-react'
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
import Create from './Create'
import Edit from './Edit'
import { IPost, postsOwnUrl } from './types'

const Posts = () => {
  const create = useVisible()
  const data = useGet<IPost>({ url: postsOwnUrl })
  const edit = useEdit()
  const borrar = useDeleteOne({ url: postsOwnUrl })

  return (
    <>
      {create.visible && <Create onClose={create.close} />}
      {edit.visible && <Edit onClose={edit.close} id={edit.value || ''} />}
      {!create.visible && !edit.visible && (
        <>
          <Header
            title='Mis Posts'
            actions={<Button onClick={create.open}>Create</Button>}
          />
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
                      <p className='text-xs text-slate-500'>
                        {r.createdByName}
                      </p>
                    </>
                  ),
                },
                {
                  title: 'Titulo',
                  dataIndex: 'title',
                  key: 'title',
                  width: 100,
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
                            edit.open(x)
                          }}
                        >
                          <div className='flex items-center gap-2'>
                            <EditIcon className='h4 w-4' />
                            Editar
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
      )}
    </>
  )
}

export default Posts

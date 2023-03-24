import React from 'react'
import { useGet, useGetOptions } from '@/rest/user'
import { optionMatch } from '@/utils/optionMatch'
import { Delete, Edit, Eye, LucideMoreHorizontal } from 'lucide-react'
import moment from 'moment'

import { Filter, Table } from '@/components/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IOptions, IResponse } from './types'

const url = 'permissions'
const Permissions = () => {
  const data = useGet<IResponse>({ url })
  const options = useGetOptions<IOptions>({ url })

  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='mb-4 text-2xl font-semibold'>Permisos</h2>
        <Button>Crear</Button>
      </div>

      <Table
        data={data.data}
        loading={data.isFetching}
        tableProps={{
          columns: [
            {
              title: 'Creacion',
              dataIndex: 'createdAt',
              key: 'createdAt',
              width: 150,
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
              title: (
                <Filter
                  title='Modulo'
                  options={options.data?.module}
                  filter='modules'
                />
              ),
              dataIndex: 'module',
              key: 'module',
              width: 200,
              align: 'left',
              render: (x) => optionMatch(x, options.data?.module),
            },

            {
              title: (
                <Filter
                  title='Acciones'
                  options={options.data?.action}
                  filter='actions'
                />
              ),
              dataIndex: 'action',
              key: 'action',
              width: 200,
              align: 'left',
              render: (x) => optionMatch(x, options.data?.action),
            },
            {
              title: '',
              dataIndex: '',
              key: 'operations',
              align: 'left',
              fixed: 'left',
              width: 100,
              render: () => (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <LucideMoreHorizontal className='h-4 w-4' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <div className='flex items-center gap-2'>
                        <Eye className='h4 w-4' />
                        Ver
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {' '}
                      <div className='flex items-center gap-2'>
                        <Edit className='h4 w-4' />
                        Editar
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {' '}
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
    </div>
  )
}

export default Permissions

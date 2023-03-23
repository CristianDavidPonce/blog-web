import React from 'react'
import { Delete, Edit, Eye, LucideMoreHorizontal } from 'lucide-react'
import Pagination from 'rc-pagination'
import Table from 'rc-table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Permissions = () => {
  const data = [
    { name: 'Jack', age: 28, address: 'some where', key: '1' },
    {
      name: 'Rose',
      age: 36,
      address: 'some where',
      key: '2',
    },
  ]
  return (
    <div>
      <h2 className='mb-4 text-2xl font-semibold'>Permisos</h2>
      <Table
        columns={[
          {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            align: 'left',
          },
          {
            title: 'Fecha de creacion',
            dataIndex: 'age',
            key: 'age',
            width: 200,
            ellipsis: true,
            align: 'right',
          },
          {
            title: 'Modulo',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            align: 'left',
          },

          {
            title: 'Accion',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            align: 'left',
          },
          {
            title: '',
            dataIndex: '',
            key: 'operations',
            align: 'left',
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
        ]}
        data={data}
        className='my-table'
      />
      <Pagination total={100} current={1} />
    </div>
  )
}

export default Permissions
